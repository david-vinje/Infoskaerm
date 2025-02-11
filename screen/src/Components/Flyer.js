import React from "react";
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
import CoffeeIcon from "../Icons/CoffeeIcon";

const SMALL_ICON = "100px"
const BIG_ICON = "100px"
const BLUE = "#5c6a83"

const icons = [
  <TWIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />,
  <CalendarIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />,
  <Rocket height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />,
  <LunchIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />,
  <LunchIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />
]

const Flyer = ({ content, getEmployeePhoto, employees }) => {
  if (content.length > 0) {
    return (
      <Styling className="body::before">
        <div className="container-fluid">
          <Title />
          <Infobox />
          <Sectors sectors={content} getEmployeePhoto={getEmployeePhoto} />
        </div>
      </Styling>
    )
  }
}

const Title = () => (
  <h1 className="mt-5 display-1">Prop pr kop</h1>
)

const Infobox = () => (
  <div className="bg-grey my-5 p-5">
    <div className="px-3 ps-5 pe-0 ">
      <p className="display-3 mb-4"> Industry Insight</p>
      <p className="text-description text-ellipsis-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatibus beatae officiis molestiae dolorum obcaecati repudiandae odio iure laborum voluptatem doloremque neque facere unde, rem sequi est! Consequuntur, corporis cupiditate voluptates quisquam libero repudiandae tempora laboriosam accusantium esse maxime amet hic architecto voluptas sunt quam minus eius! Ea, commodi maiores temporibus natus laboriosam, et aspernatur harum deleniti quibusdam inventore consequuntur iusto voluptate ipsam aliquam dolorum ipsum rem, architecto id quidem in iure. Temporibus, veritatis ipsum officia nisi suscipit deserunt mollitia doloribus excepturi itaque animi voluptas qui consequatur fugiat assumenda optio reiciendis molestiae maiores architecto, sapiente natus voluptatum dignissimos. Maxime, mollitia?</p>
    </div>
  </div>
)

const Sectors = ({ sectors, getEmployeePhoto }) => {
  return (
    <div className="row justify-content-between">
      {sectors.map((sector, index) => (
        <Sector key={index} index={index} sector={sector} getEmployeePhoto={getEmployeePhoto} />
      ))}
    </div>
  )
}

const Sector = ({ sector, getEmployeePhoto, index }) => {
  return (
    <div className="col-2 sector">
      <div className="center mb-4">
        { icons[index] }
        <h1 className="mx-auto">{sector.sectorName}</h1>
      </div>
      <Employees employees={sector.consultants} getEmployeePhoto={getEmployeePhoto} />
    </div>
  )
}

const Employees = ({ employees, getEmployeePhoto }) => (
  <div className="">
    {employees.map((employee, index) => (
      <Employee key={index} employee={employee} getEmployeePhoto={getEmployeePhoto} />
    ))}
  </div>
)

const Employee = ({ employee, getEmployeePhoto }) => (
  <div className="justify-content-center align-items-center d-flex">
    <img
      className="employee-photo my-2 "
      src={`data:image/jpeg;base64,${getEmployeePhoto(employee.useruuid)}`}
    />
    <div className="position-relative">
      <CoffeeIcon height={"65px"} width={"65px"} className="ms-3" fill={BLUE} strokeWidth={"10px"}  />
      <span className="number">{employee.count}</span>
    </div>
  </div>
)


const Styling = styled.div`
  .employee-photo {
      object-fit: cover;
      height: 6em;
      width: 6em;
      border-radius: 50%;
  }
  .number {
    position: absolute;
    top: 35%;
    left: 43%;
    font-weight: bold;
    font-size: 1.75em;
  }
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
  .bg-grey {
    background-color: #e4e6e9
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
    text-align: justify;
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
  .sector {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 30px 15px rgba(0,0,0,0.1);
    
  }
`

export default Flyer