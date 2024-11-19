import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import ClockIcon from '../Icons/ClockIcon';
import UpArrowIcon from '../Icons/UpArrowIcon';
import UserIcon from '../Icons/UserIcon';
import InfoIcon from '../Icons/InfoIcon';
import ConfettiIcon from '../Icons/ConfettiIcon';
import BrainIcon from '../Icons/BrainIcon';
import CalendarIcon from '../Icons/CalendarIcon';
import TWIcon from '../Icons/TWIcon';
import LunchIcon from '../Icons/LunchIcon';
import Rocket from "../Icons/Rocket";
import Beach from "../Icons/Vacation";
import Construction from "../Icons/Construction";
import giphy from '../img/michael.webp'
import { dateOnly } from "../Components/API";

const SMALL_ICON = "60px"
const BIG_ICON = "100px"
const BLUE = "#5c6a83"

const getIcon = {
  "CLIENT_EVENT": <CalendarIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />,
  "EXTERNAL_EVENT": <CalendarIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />,
  "NEW_EMPLOYEE": <UserIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />,
  "CONFERENCE": <TWIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />,
  "INTERNAL_COURSE": <BrainIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />,
  "HQ_BOOKING": <ClockIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />,
  "INTERNAL_EVENT": <ConfettiIcon height={SMALL_ICON} width={SMALL_ICON} stroke={BLUE} />,
  "INFO": <InfoIcon height={BIG_ICON} width={BIG_ICON} stroke={BLUE} />,
  "LUNCH": <LunchIcon height={BIG_ICON} width={BIG_ICON} stroke={BLUE} />,
  "CRAFTSMAN": <Construction height={BIG_ICON} width={BIG_ICON} stroke={BLUE} />,
  "VACATION": <Beach height={BIG_ICON} width={BIG_ICON} stroke={BLUE} />,
  "OTHER": <Rocket height={BIG_ICON} width={BIG_ICON} stroke={BLUE} />
}

const Calendar = ({ events, headcount }) => {
  const infoboxes = getInfoboxes(events)
  return (
    <Styling className="body::before">
      <div className="container-fluid d-flex flex-column">
        <Heading text="TRUSTWORKS NEWS" />
        <Infoboxes infoboxes={infoboxes} />
        <Infocards events={events} headcount={headcount} />
        <Subheading text="KALENDER" />
        <Events events={events} />
      </div>
    </Styling>
  )
}

/* 
  The "heading is the title of the page with a TW logo next to it
*/
const Heading = ({ text }) => (
  <div className="row">
    <div className="col-10">
      <h1 className="display-1 pt-5" style={{ color: "black" }}>{text}</h1>
    </div>
    <div className="col-2 text-center " >
      <TWIcon height={"150px"} width={"150px"} fill={BLUE} />
    </div>
  </div>

)

/* 
  The event of type "info" are shown separately in a box on top
  The event date has to be upcoming, but no later than 30 days into the future
  At most two infoboxes are shown at any given time
*/
const getInfoboxes = events => {
  const maximumNumberOfBoxesShown = 2
  const infoboxes = events.filter(event => {
    const today = dateOnly(new Date());
    const isRelevant = event.eventDate >= today && getCountdown(event) <= 30
    return event.newsType === "INFO" && isRelevant;
  });
  return infoboxes.slice(0, maximumNumberOfBoxesShown)
}

const Infoboxes = ({ infoboxes }) => (
  infoboxes.map((infobox, index) => {
    return <Infobox key={index} infobox={infobox} />
  })
)

/* 
  An infobox is not allowed have more than six lines of text
*/
const Infobox = ({ infobox }) => (
  <div className="row infobox bg-blue border border-secondary mt-5 w-100 mh-25 mx-auto p-4">
    <div className="col-1 align-self-center text-center ps-0">
      <div className="text-light">
        {getIcon[infobox.newsType]}
      </div>
    </div>
    <div className="col-11 text-light px-3">
      <p className="display-5"> {infobox.description}</p>
      <p className="text-description text-ellipsis-6">{infobox.text}</p>
    </div>
  </div>
)

/* 
  "Infocards" are different from "infoboxes"
  being the countdown to the next conference or internal event
  and the increased number of "good people" over the last year
*/
const Infocards = ({ events, headcount }) => (
  <div className="row pt-5">
    <div className="col">
      <Countdown events={events} />
    </div>
    <div className="col">
      <GoodPeople headcount={headcount} />
    </div>
  </div>
)

/* 
  The "countdown" is only for the next conference of internal event
*/
const Countdown = ({ events }) => {
  if (!events.length) return
  const relevantEvents = events.filter(event => {
    return event.newsType === "CONFERENCE" || event.newsType === "INTERNAL_EVENT"
  })
  const event = relevantEvents[0]
  const countdown = getCountdown(event)
  return (
    <Card className="h-100 border-secondary">
      <Card.Body className="row p-3">
      <p className="display-5">Nedtælling</p>
        <div className="col-3 pe-0 d-flex flex-column">
          {countdown === 1
            ? <img src={giphy} alt="" width={""} height={""} />
            : <></>
          }
        </div>
        <div className="col-9 ps-0 text-end">
          {
            event?.text
              ? <div>
                  <p className="display-1">{`${countdown} ${countdown === 1 ? "dag" : "dage"} til`}</p>
                  <p className="text-description">{event.text}</p>
                </div>
              : <p className="display-5">{countdown}</p>
          }
        </div>
      </Card.Body>
    </Card>
  )
}

const getCountdown = event => {
  if (!event) return "Ingen begivenhed"
  const today = new Date(new Date().toDateString())
  const eventDate = new Date(event.eventDate)
  return Math.round((eventDate - today) / (24 * 60 * 60 * 1000))
}

const GoodPeople = ({ headcount }) => (
  <Card className="h-100 border border-secondary">
    <Card.Body className="row p-3">
      <div className="col d-flex flex-column ">
        <p className="display-5">Trustworkers</p>
        <p className="text-description">siden d.d. sidste år</p>
        <div className="border center w-50 py-3 bg-green rounded">
          <UpArrowIcon height="32px" width="32px" />
          <p className="display-6 ms-1">+{headcount[1]} %</p>
        </div>
      </div>
      <div className="col align-self-end text-end">
        <p className="display-1">{headcount[0]}</p>
        <p className="text-description">Good People</p>
      </div>
    </Card.Body>
  </Card>
)

const Subheading = ({ text }) => (
  <div className="pt-5">
    <h2 className="display-4">
      {text}
    </h2>
  </div>
)

const Events = ({ events }) => (
  <div className="row list-group overflow-hidden pt-3">
    {events.map((event, index) => (
      <Event key={index} event={event} />
    ))}
  </div>
)

const Event = ({ event }) => {
  const [day, month] = formatDate(event.eventDate)
  const isToday = getCountdown(event) === 0
  if (event.newsType !== "INFO") {
    return (
      <div className="list-group-item py-3 ps-0 pe-3 my-2 d-flex align-items-center border border-secondary">
        <div className="col-1">
          {
            isToday ?
              <p className="h3 text-center fw-bold today">TODAY</p>
              :
              <div>
                <p className="display-5 text-center">{day}</p>
                <p className="h4 text-center">{month}</p>
              </div>
          }
        </div>
        <div className="col-10">
          <div>
            <p className="event-text display-6">{event.text}</p>
          </div>
        </div>
        <div className="col-1 text-end">
          {getIcon[event.newsType]}
        </div>
      </div>
    )
  }
};

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const date = new Date(dateString).toLocaleDateString('da-DK', options)
  let [day, month] = date.split('. ')
  month = month.toUpperCase()
  return [day, month]
}

const Styling = styled.div`

  .today {
    color: #f09449;
  }
  h1, p {
    margin: 0;
  }
  .border-green {
    border: 2px solid #778256;
  }
  .border-blue {
    border: 2px solid #5c6983;
  }
  .border-orange {
    border: 2px solid #f09449;
  }
  .bg-green {
    color: #374b05;
    background-color: rgba(55, 75, 5, 0.3);
  }
  .bg-blue{
    background-color: #5c6a83;
  }
  .card-footer {
    background-color: #374b05;
    color: #eee; 
  }
  .text-description {
    font-size: 2.5em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* Adjust the number of lines to show */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info-section {
    border: 1px solid transparent;
    background-color: transparent;
  }
  .text-ellipsis-6 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6; /* Adjust the number of lines to show */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .event-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* Adjust the number of lines to show */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    margin-left: auto; 
  }
`

export default Calendar