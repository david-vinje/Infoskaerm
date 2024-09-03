import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import ClockIcon from '../Icons/ClockIcon';
import UpArrowIcon from '../Icons/UpArrowIcon';
import UserIcon from '../Icons/UserIcon';
import SlideshowIcon from '../Icons/SlideshowIcon';
import ConfettiIcon from '../Icons/ConfettiIcon';
import BrainIcon from '../Icons/BrainIcon';
import CalendarIcon from '../Icons/CalendarIcon';
import TWIcon from '../Icons/TWIcon';
import giphy from '../img/confetti.gif'

const ICON_SIZE = "60px"

const getIcon = {
  "CLIENT_EVENT": <CalendarIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#455977"} />,
  "EXTERNAL_EVENT": <CalendarIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#455977"} />,
  "CONFERENCE": <TWIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#455977"} />,
  "NEW_EMPLOYEE": <UserIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#455977"} />,
  "INTERNAL_COURSE": <BrainIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#455977"} />,
  "HQ_BOOKING": <ClockIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#455977"} />,
  "INTERNAL_EVENT": <ConfettiIcon height={ICON_SIZE} width={ICON_SIZE} stroke={"#455977"} />,
}

const Calendar = ({ events, headcount }) => {
  const infobox = firstRelevantInfoBox(events)
  return (
    <Styling className="body::before px-5">
      <div className="container-fluid px-5 py-5 d-flex flex-column">
        <Heading text="TRUSTWORKS NEWS" />
        <Infobox infobox={infobox} />
        <Infocards events={events} headcount={headcount} />
        <Subheading text="KALENDER" />
        <Events events={events} />
      </div>
    </Styling>
  )
}

const firstRelevantInfoBox = events => {
  return events.find((event) => {
    const today = new Date();
    const eventDate = new Date(event.eventDate);
    const isRelevant = eventDate >= today;
    return event.newsType === "INFO" && isRelevant;
  });
}

const Heading = ({ text }) => (
  <h1 className="display-1 pt-5" style={{ color: "black" }}>
    {text}
  </h1>
)

const Infobox = ({ infobox }) => {
  if (!infobox) return
  return (
    <div className="row pt-5 mx-auto">
      <div className="bg-blue rounded w-100 mh-25 text-light m-auto p-4">
        <p className="display-5">{infobox.description}</p>
        <p className="text-description text-ellipsis-6">{infobox.text}</p>
      </div>
    </div>
  )
}

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

const Countdown = ({ events }) => {
  if (!events.length) return
  const relevantEvents = events.filter(event => {
    return event.newsType === "CONFERENCE" || event.newsType === "INTERNAL_EVENT"
  })
  const event = relevantEvents[0]
  const countdown = getCountdown(event)
  return (
    <Card className="h-100">
      <Card.Body className="row p-3">
        <div className="col-5 d-flex flex-column">
          <p className="display-5">Nedtælling</p>
          {countdown === 0
            ? <img src={giphy} alt="" width={"175px"} height={"150px"} />
            : <></>
          }
        </div>
        <div className="col-7 text-end align-self-center pe-3">
          <p className="display-1">{countdown} </p>
          <p className="text-description">Dage til: {event.text}</p>
        </div>
      </Card.Body>
    </Card>
  )
}

const getCountdown = event => {
  const today = new Date()
  const eventDate = new Date(event.eventDate)
  return Math.round((eventDate - today) / (24 * 60 * 60 * 1000))
}

const GoodPeople = ({ headcount }) => (
  <Card className="h-100">
    <Card.Body className="row p-3">
      <div className="col d-flex flex-column ">
        <p className="display-5 pb-2">Trustworkers</p>
        <div className="border center w-50 py-3 bg-green rounded">
          <UpArrowIcon height="32px" width="32px" />
          <p className="display-6 ms-1">+{headcount[1]} %</p>
        </div>
        <p className="text-description">Siden d.d. sidste år</p>
      </div>
      <div className="col text-end">
        <p className="display-1">{headcount[0]}</p>
        <p className="text-description">Good People</p>
      </div>
    </Card.Body>
  </Card>
)

const Subheading = ({ text }) => (
  <div className="pt-5">
    <h2 className="display-4" style={{ color: "grey" }}>
      {text}
    </h2>
  </div>
)

const Events = ({ events }) => (
  <div className="row list-group mx-auto overflow-hidden pt-3">
    {events.map((event, index) => (
      <Event key={index} event={event} />
    ))}
  </div>
)

const Event = ({ event }) => {
  const [day, month] = formatDate(event.eventDate)
  if (event.newsType !== "INFO") {
    return (
      <div className={"list-group-item py-3 ps-0 pe-3 my-2 d-flex align-items-center " + borderColor[event.newsType]}>
        <div className="col-1">
          <p className="display-5 text-center">{day}</p>
          <p className="h4 text-center">{month}</p>
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

const borderColor = {
  "CLIENT_EVENT": "border-green",
  "EXTERNAL_EVENT": "border-green",
  "NEW_EMPLOYEE": "border-green",
  "HQ_BOOKING": "border-blue",
  "INTERNAL_COURSE": "border-blue",
  "CONFERENCE": "border-blue",
  "INTERNAL_EVENT": "border-orange"
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString).toLocaleDateString('da-DK', options)
  let [day, month] = date.split('. ')
  if (day.length < 2) day = '0' + day
  month = month.toUpperCase()
  return [day, month]
}

const Styling = styled.div`
  div, h1 {
    color: gray;
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
    color: #374b05;
    background-color: rgba(69, 89, 119, 0.7);
  }
  .card-footer {
    background-color: #374b05;
    color: #eee; 
  }
  .text-description {
    font-size: 2em;
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
    ${'' /* font-weight: 600; */}
    ${'' /* font-size: 2em; */}
  }
  span {
    margin-left: auto; 
  }
`

export default Calendar