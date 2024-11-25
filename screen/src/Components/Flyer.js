import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import HackerEventFlyer from '../img/HackerEventFlyer.png';

const HEIGHT_ICON = "300px"
const WIDTH_ICON = "100px"

const getFlyer = {
  "HackerEventFlyer": <HackerEventFlyer height={HEIGHT_ICON} width={WIDTH_ICON}/>
}

const Flyer = ({ }) => {
  return (
    <Styling className="body::before">
      <div className="container-fluid d-flex flex-column">
        <img
        className=" rounded p-0"
        src={HackerEventFlyer}
        />
      </div>
    </Styling>
  )
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

export default Flyer