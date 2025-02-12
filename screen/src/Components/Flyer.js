import React from "react";
import styled from "styled-components";

import Andet from "../Icons/Andet"
import Pharma from "../Icons/Pharma"
import Finance from "../Icons/Finance"
import Energy from "../Icons/Energy"
import Public from "../Icons/Public"
import Champagne from "../Icons/Champagne"
import Coffee from "../Icons/Coffee";

const SECTOR_ICON_SIZE = "0em"
const COFFEE_ICON_SIZE = "0em"
const BLUE = "#5c6a83"

const icons = {
  "finans": <Finance height={SECTOR_ICON_SIZE} width={SECTOR_ICON_SIZE} fill={BLUE} />,
  "offentlig": <Public height={SECTOR_ICON_SIZE} width={SECTOR_ICON_SIZE} fill={BLUE} />,
  "pharma": <Pharma height={SECTOR_ICON_SIZE} width={SECTOR_ICON_SIZE} fill={BLUE} />,
  "energi": <Energy height={SECTOR_ICON_SIZE} width={SECTOR_ICON_SIZE} fill={BLUE} />,
  "andet": <Andet height={SECTOR_ICON_SIZE} width={SECTOR_ICON_SIZE} fill={BLUE} />,
}

const names = {
  "finans": "Finans",
  "offentlig": "Det Offentlige",
  "pharma": "Pharma",
  "energi": "Grøn Omstilling",
  "andet": "Andet",
}

const Flyer = ({ content, getEmployeePhoto, employees }) => {
  if (content.length > 0) {
    return (
      <Styling className="body::before">
        <div className="container-fluid overflow-auto">
          <Title content="PROP PR. KOP" />
          <Infobox />
          <Sectors sectors={content} getEmployeePhoto={getEmployeePhoto} />
        </div>
      </Styling>
    )
  }
}

const Title = ({ content }) => (
  <div className="row center">
    <div className="col-10">
      <h1 className="display-1" style={{ color: "black" }}>{content}</h1>
    </div>
    <div className="col-2 text-center " >
      <Champagne height={"10px"} width={"15px"} fill={BLUE} />
    </div>
  </div>
)

const Infobox = () => (
  <div className="row bg-blue mb-5 text-light p-5">
    <p className="display-3"> Industry Insight</p>
    <p className="text-description text-ellipsis-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatibus beatae officiis molestiae dolorum obcaecati repudiandae odio iure laborum voluptatem doloremque neque facere unde, rem sequi est! Consequuntur, corporis cupiditate voluptates quisquam libero repudiandae tempora laboriosam accusantium esse maxime amet hic architecto voluptas sunt quam minus eius! Ea, commodi maiores temporibus natus laboriosam, et aspernatur harum deleniti quibusdam inventore consequuntur iusto voluptate ipsam aliquam dolorum ipsum rem, architecto id quidem in iure. Temporibus, veritatis ipsum officia nisi suscipit deserunt mollitia doloribus excepturi itaque animi voluptas qui consequatur fugiat assumenda optio reiciendis molestiae maiores architecto, sapiente natus voluptatum dignissimos. Maxime, mollitia?</p>
  </div>
)

const Sectors = ({ sectors, getEmployeePhoto }) => {
  return (
    <div className="justify-content-between">
      {sectors.map((sector, index) => (
        <Sector key={index} index={index} sector={sector} getEmployeePhoto={getEmployeePhoto} />
      ))}
    </div>
  )
}

const Sector = ({ sector, getEmployeePhoto }) => {
  return (
    <div className="row center mb-5 py-3 sector">
      <div className="col-2 d-flex align-items-center flex-column">
        <div className="">{icons[sector.sectorName]}</div>
        <h1 className="">{names[sector.sectorName]}</h1>
      </div>
      <div className="col-10 ">
        <Employees employees={sector.consultants} getEmployeePhoto={getEmployeePhoto} />
      </div>
    </div>
  )
}

const Employees = ({ employees, getEmployeePhoto }) => (
  <div className="row">
    {employees.map((employee, index) => (
      <Employee key={index} employee={employee} getEmployeePhoto={getEmployeePhoto} />
    ))}
  </div>
)

const Employee = ({ employee, getEmployeePhoto }) => (
  <div className="col align-items-center d-flex">
    <img
      className="employeephoto "
      src={`data:image/jpeg;base64,${getEmployeePhoto(employee.useruuid)}`}
    />
    <div className="position-relative">
      <Coffee height={COFFEE_ICON_SIZE} width={COFFEE_ICON_SIZE} fill={BLUE} strokeWidth={"1px"} />
      <span className="number">{employee.count}</span>
    </div>
  </div>
)


const Styling = styled.div`
  .number {
    position: absolute;
    top: 43%;
    left: 33%;
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
  .bg-blue {
    background-color: #5c6983;
  }
  .bg-grey {
    background-color: #e4e6e9;
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