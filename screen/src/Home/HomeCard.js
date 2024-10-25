import React from "react";
import { dateOnly } from "../Components/API";

const PEOPLE_LIMIT = 11;
const ROLES_TOOLS_LIMIT = 7;

const HomeCard = ({
  project,
  onToolButtonClick,
  getClientLogo,
  getEmployeePhoto,
}) => (
  <div className="container-fluid d-flex flex-column"> {/*container-fluid = which is width: 100% at all breakpoints, d-flex = display flex container, flex-colum = set a vertical direction */}
    <div className="row row-1 mx-auto w-75 clientlogoborder clientLogo rounded"> {/* mb-5  */}
      <img
        className=" rounded p-0"
        src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
      />
    </div>
    <div className="row row-2 pt-5 mh-50 overflow-hidden">
      <h1 className="project-name pt-5 display-1">{project.name}</h1>
      <ProjectStatus project={project}></ProjectStatus>
      <div className="col-8 right-border lh-lg project-description">
        <h1 className="display-5">1. Formål</h1>
        <p className="mb-1">{project.purpose}</p>
        <h1 className="display-5">2. Trustworks' rolle</h1>
        <p className="mb-2">{project.role}</p>
        <Learnings learnings={project.learnings}></Learnings>
      </div>
      <div className="col-4 ps-4">
        <h1 className="display-5">Roller</h1>
        {project.rolesList.slice(0, ROLES_TOOLS_LIMIT).map((role, index) => (
          
          <button
            key={index}
            className="roller px-3 mx-1 roller-og-tilgang-knap"
          >
            {role}
          </button>
        ))}
        <div className="pt-5">
          <h1 className="display-5">Tilgang</h1>
          {project.methodsList.slice(0, ROLES_TOOLS_LIMIT).map((method, index) => (
            <button
              key={index}
              className="tilgang px-3 mx-1 roller-og-tilgang-knap rounded"
              onClick={() => onToolButtonClick(method)}
            >
              {method}
            </button>
          ))} 
        </div>
      </div>
    </div>
    <div className="row row-3 mt-auto">
      {project.projectDescriptionUserList.slice(0, PEOPLE_LIMIT).map((user) => (
        <div className="col-2" key={user.useruuid}>
          <img
            alt=""
            className="employeephoto my-2 border"
            src={`data:image/jpeg;base64,${getEmployeePhoto(user.useruuid)}`}
          />
        </div>
      ))}
      <Counter project={project} />
    </div>
  </div>
);

const ProjectStatus = ({ project }) => {
  const today = dateOnly(new Date());
  if (project.toDate > today || project.toDate == null) {
    return <h2 className="lh-lg mb-5 display-4">Aktivt</h2>;
  }
  return <h2 className="lh-lg mb-5 display-4">Afsluttet</h2>;
};

const Counter = ({ project }) => {
  if (project.projectDescriptionUserList.length > PEOPLE_LIMIT) {
    return (
      <div className="col-2 my-2">
        <div className="counter employeephoto border rounded-circle bg-light">
          <h1>+{project.projectDescriptionUserList.length - PEOPLE_LIMIT}</h1>
        </div>
      </div>
    );
  }
};

const Learnings = ({ learnings }) => {
  if (learnings != null) {
    return (
      <><h1 className="display-5">3. Vores læringer</h1><p>{learnings}</p></>
    );
  }
};


export default HomeCard;
