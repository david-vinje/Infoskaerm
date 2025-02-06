import React from "react";
import styled from "styled-components";
import UserIcon from '../Icons/UserIcon';
import TWIcon from '../Icons/TWIcon';

const SMALL_ICON = "60px"
const BIG_ICON = "100px"
const BLUE = "#5c6a83"

const Flyer = ({ content, getEmployeePhoto, employees }) => {
  if (content.length > 0){
    return (
      <Styling className="body::before">
        <div className="container-fluid border">
          <div className="row border">
            <h1>Prop pr kop</h1>
          </div>
          <div className="row border bg-primary">
            <h1>Industry Insight</h1>
            <p>Prop per kop er en del af strategi ... Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate unde doloribus a provident. Laudantium adipisci pariatur minus minima dolorum quas voluptatem veniam rem ullam. Molestiae accusamus atque harum suscipit commodi!</p>
          </div>
          <Sectors sectors={content} getEmployeePhoto={getEmployeePhoto} />
        </div>
      </Styling>
    )
  }
}

const Sectors = ({ sectors, getEmployeePhoto }) => {
  return (
    <div className="row border bg-success">
      {sectors.map((sector, index) => (
        <Sector key={index} sector={sector} getEmployeePhoto={getEmployeePhoto} />
      ))}
    </div>
  )
  }

const Sector = ({ sector, getEmployeePhoto}) => {
  return (
    <div className="row ">
      <div className="col-2">
        <TWIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />
        <h1>{sector.sectorName}</h1>
      </div>
      <Employees employees={sector.consultants} getEmployeePhoto={getEmployeePhoto}/>
    </div>
  )
}

const Employees = ({ employees, getEmployeePhoto }) => ( 
  <div className="col-10 d-flex">
    {employees.map((employee, index) => (
      <Employee key={index} employee={employee} getEmployeePhoto={getEmployeePhoto}/>
    ))}
  </div>
)

const Employee = ({ employee, getEmployeePhoto }) => (
  <div className="col-2">
    <img
      alt=""
      height="12px" width="12px"
      className="employeephoto my-2 border"
      src={`data:image/jpeg;base64,${getEmployeePhoto(employee.useruuid)}`}
    />
    <UserIcon height={SMALL_ICON} width={SMALL_ICON} fill={BLUE} />
  </div>
)

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