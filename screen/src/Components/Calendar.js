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
import giphy from '../img/confetti.gif'

const ICON_SIZE = "60px"

const getIcon = {
  "CLIENT_EVENT": <CalendarIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#89936d"} />,
  "EXTERNAL_EVENT": <CalendarIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#89936d"} />,
  "NEW_EMPLOYEE": <UserIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#89936d"} />,
  "CONFERENCE": <TWIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#5c6983"} />,
  "INTERNAL_COURSE": <BrainIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#5c6983"} />,
  "HQ_BOOKING": <ClockIcon height={ICON_SIZE} width={ICON_SIZE} fill={"#5c6983"} />,
  "INTERNAL_EVENT": <ConfettiIcon height={ICON_SIZE} width={ICON_SIZE} stroke={"#f1a25e"} />,
  "INFO": <InfoIcon height={"44px"} width={"44px"} stroke={"#eee"} />,
  "INFOSTORT": <InfoIcon height={"100px"} width={"100px"} stroke={"#f1a25e"} />,
  "TRUSTWORKSLOGO": <TWIcon height={"150px"} width={"150px"} fill={"#000000"} />,
}

const Calendar = ({ events, headcount }) => {
  console.log('events', events)
  const infoboxes = getInfoboxes(events)
  return (
    <Styling className="body::before px-5">
      <div className="container-fluid px-5 py-5 d-flex flex-column">
        <Heading text="TRUSTWORKS NEWS" />
        <Infoboxes infoboxes={infoboxes} />
        <Infocards events={events} headcount={headcount} />
        <Subheading text="KALENDER" />
        <Events events={events} />
      </div>
    </Styling>
  )
}

const getInfoboxes = events => {
  console.log('events', events)
  const infoboxes = events.filter(event => {
    const today = formatDate(new Date());
    const isRelevant = event.eventDate >= today && getCountdown(event) <= 30
    return event.newsType === "INFO" && isRelevant;
  });
  return infoboxes.slice(0, 2)
}

const Heading = ({ text }) => (
  <div className="row">
    <div className="col-10">
      <h1 className="display-1 pt-5" style={{ color: "black" }}>{text}</h1>
    </div>
    <div className="col-2 align-item-start text-center" >
      <div className="">
        {getIcon['TRUSTWORKSLOGO']}
      </div>
    </div>
  </div>
  
)

const Infoboxes = ({ infoboxes }) => {
  if (infoboxes.length > 0) return (
    infoboxes.map((infobox, index) => {
      return <Infobox key={index} infobox={infobox} />
    })
  )
}

const Infobox = ({ infobox }) => (
  <div className="row infobox bg-blue border border-secondary mt-5 w-100 mh-25 mx-auto p-4">
    <div className="col-1 align-self-center text-center " >
      <div className="text-light">
        {getIcon['INFOSTORT']}
      </div>
    </div>
    <div className="col-11 text-light px-3">
      <p className="display-5">{getIcon[infobox.newsType]} {infobox.description}</p>
      <p className="text-description text-ellipsis-6">{infobox.text}</p>
    </div>
    
  </div>
)

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
    <Card className="h-100 border-secondary">
      <Card.Body className="row p-3">
        <div className="col-5 d-flex flex-column">
          <p className="display-5">Nedtælling</p>
          {countdown === 0
            ? <img src={giphy} alt="" width={"175px"} height={"150px"} />
            : <></>
          }
        </div>
        <div className="col-7 text-end align-self-end pe-3">
          <p className="display-1">{countdown} </p>
          <p className="text-description">Dage til: {event.text}</p>
        </div>
      </Card.Body>
    </Card>
  )
}

const getCountdown = event => {
  const today = new Date(new Date().toDateString())
  const eventDate = new Date(event.eventDate)
  console.log('eventDate', eventDate)
  console.log('today', today)
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
  const isToday = getCountdown(event) === 0
  console.log('countdown', getCountdown(event))
  if (event.newsType !== "INFO") {
    return (
      // <div className={"list-group-item py-3 ps-0 pe-3 my-2 d-flex align-items-center " + borderColor[event.newsType]}>
      <div className="list-group-item py-3 ps-0 pe-3 my-2 d-flex align-items-center border border-secondary">
        <div className="col-1">
          {
            isToday ? 
            <div className="">
              <p className="h3 text-center fw-bold today">TODAY</p>
            </div> 
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
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const date = new Date(dateString).toLocaleDateString('da-DK', options)
  let [day, month] = date.split('. ')
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

  .today{
    color: #f09449;
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
    font-size: 2em;
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
    ${'' /* font-weight: 600; */}
    ${'' /* font-size: 2em; */}
  }
  span {
    margin-left: auto; 
  }
`

export default Calendar