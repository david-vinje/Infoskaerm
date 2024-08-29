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
import giphy from '../img/giphy.webp'

const ICON_SIZE = '56px'
const INFO = 'INFO'
const NEW_EMPLOYEE = 'NEW_EMPLOYEE'
const INTERNAL_EVENT = 'INTERNAL_EVENT'
const INTERNAL_COURSE = 'INTERNAL_COURSE'
const EXTERNAL_EVENT = 'EXTERNAL_EVENT'
const CONFERENCE = 'CONFERENCE'
const HQ_BOOKING = 'HQ_BOOKING'
const CLIENT_EVENT = 'CLIENT_EVENT'

const getIcon = {
  CLIENT_EVENT: <CalendarIcon height={ICON_SIZE} width={ICON_SIZE} />,
  CONFERENCE: <TWIcon height={ICON_SIZE} width={ICON_SIZE} />,
  EXTERNAL_EVENT: <CalendarIcon height={ICON_SIZE} width={ICON_SIZE} />,
  NEW_EMPLOYEE: <UserIcon height={ICON_SIZE} width={ICON_SIZE} />,
  INTERNAL_COURSE: <BrainIcon height={ICON_SIZE} width={ICON_SIZE} />,
  INTERNAL_EVENT: <ConfettiIcon height={ICON_SIZE} width={ICON_SIZE} />,
  HQ_BOOKING: <ClockIcon height={ICON_SIZE} width={ICON_SIZE} />,
}

// INTERVAL_EVENT OR CONFERENCE
const Countdown = ({ events }) => {
  if (!events.length) return
  const relevantEvents = events.filter(event => {
    return event.newsType === CONFERENCE || event.newsType === INTERNAL_EVENT
  })
  const event = relevantEvents[0]
  const today = new Date()
  const eventDate = new Date(event.eventDate)
  const daysUntil = Math.round((eventDate - today) / (24 * 60 * 60 * 1000))
  return (
    <Card>
      <Card.Body className="row p-3">
        <div className="col-4 d-flex flex-column">
          <p className="info-text">Nedtælling</p>
          {daysUntil === 0
            ? <img src={giphy} alt="" width={'175px'} height={'150px'} />
            : <></>
          }
        </div>
        <div className="col-8 text-end align-self-center pe-3">
            <p className="display-1">{daysUntil} </p>
          <p className="footer-text">Dage til: {event.text}</p>
        </div>
      </Card.Body>
      {/* <Card.Footer className="d-flex p-2 justify-content-between">
        <p className="ms-3">{event.text}</p>
        <ClockIcon className="me-3" width='24px' height='24px' />
      </Card.Footer> */}
    </Card>
  )
}

const InfoBox = ({ event }) => {
  return (
    <div className="bg-blue rounded w-100 mh-25 text-light m-auto p-4">
      <p className="display-5">{event.description}</p>
      <p className="info-text text-ellipsis-6">{event.text}</p>
    </div>
  )
}

const firstRelevantInfoBox = events => {
  return events.find((event) => {
    const today = new Date();
    const eventDate = new Date(event.eventDate);
    const isRelevant = eventDate >= today;
    return event.newsType === INFO && isRelevant;
  });
}

const Calendar = ({ events, headcount }) => {
  // Find the first event that meets the criteria for InfoBox
  const infobox = firstRelevantInfoBox(events)
  return (
    <Styling className="body::before">
      <div className="container py-5 d-flex flex-column">
        <h1 className="display-2" style={{ color: "black" }}>
          Trustworks Kalender
        </h1>
        <div className="row mx-auto list-group overflow-hidden pt-5">
          {events.map((event, index) => (
            <Event key={index} event={event} />
          ))}
        </div>
        <div className="row mt-auto mb-5 mx-auto">
          {infobox && <InfoBox event={infobox} />}
        </div>
        <div className="row mb-">
          <div className="col">
            <Countdown events={events} />
          </div>
          <div className="col ">
            <InfoCard
              title="Trustworkers"
              heading={headcount[0]}
              subheading="Good People"
              percentage={headcount[1]}
              bannerText="69 % flere end sidste år"
            />
          </div>
        </div>
      </div>
    </Styling>
  )
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString).toLocaleDateString('da-DK', options)
  let [day, monthYear] = date.split('. ')
  if (day.length < 2) day = '0' + day
  monthYear = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
  return [day, monthYear]
}

const Event = ({ event }) => {
  const [day, monthYear] = formatDate(event.eventDate)
  if (event.newsType !== "INFO") {
    return (
      <div className="list-group-item py-3 ps-0 pe-3 my-2 d-flex align-items-center">
        <div className="col-1">
          <p className="display-5 text-center">{day}</p>
          <p className="h4 text-center">{monthYear}</p>
        </div>
        <div className="col-10">
          <div>
            <p className="event-text">{event.text}</p>
          </div>
        </div>
        <div className="col-1 text-end">
          {getIcon[event.newsType]}
        </div>
      </div>
    )
  }
};

const Percentage = ({ percentage }) => {
  if (!percentage) return
  return (
    <div className="border center py-2 bg-green rounded">
      <UpArrowIcon height="32px" width="32px" />
      <p className="display-6 ms-1">+{percentage} %</p>
    </div>
  )
}

const InfoCard = ({ title, heading, subheading, percentage, bannerText }) => (
  <Card className="h-100">
    <Card.Body className="row center p-3">
      <div className="col-4 d-flex flex-column ">
        <p className="info-text pb-2">{title}</p>
        <Percentage percentage={percentage} />
      </div>
      <div className="col-8 text-end">
        <p className="display-1">{heading}</p>
        <p className="footer-text">{subheading}</p>
      </div>
    </Card.Body>
    {/* <Card.Footer className="d-flex p-2 justify-content-between">
      <p className="ms-3">{bannerText}</p>
      <ClockIcon className="me-3" width='24px' height='24px' />
    </Card.Footer> */}
  </Card>
)

const Styling = styled.div`
  div, h1 {
    color: gray;
  }
  h1, p {
    margin: 0;
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
  .info-section {
    border: 1px solid transparent;
    background-color: transparent;
  }
  .info-text {
    font-size: 1.5em;
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
    font-weight: 600;
    font-size: 1.5em;
  }
  .footer-text {
    font-size: 1.25em;
  }
  span {
    margin-left: auto; 
  }
`

export default Calendar