import React from "react";
import { dateOnly } from "../Components/API";

const PEOPLE_LIMIT = 11;
const ROLES_TOOLS_LIMIT = 8;

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
        <p className="display-5">{project.purpose}</p>
        <br></br>
        <h1 className="display-5">2. Trustworks' rolle</h1>
        <p>{project.purpose}</p>
        <br></br>
        <h1 className="display-5">3. Vores læringer</h1>
        {project.purpose}
        {/* {project.description} */}
      </div>
      <div className="col-4 ps-4">
        <h1 className="display-5">Roller</h1>
        {project.offeringList.slice(0, ROLES_TOOLS_LIMIT).map((rolle, index) => (
          
          <button
            key={index}
            className="roller px-3 mx-1 roller-og-tilgang-knap"
          >
            {rolle}
          </button>
        ))}
        <div className="pt-5">
          <h1 className="display-5">Tilgang</h1>
          {project.toolsList.slice(0, ROLES_TOOLS_LIMIT).map((tilgang, index) => (
            <button
              key={index}
              className="tilgang px-3 mx-1 roller-og-tilgang-knap rounded"
              onClick={() => onToolButtonClick(tilgang)}
            >
              {tilgang}
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className="row row-3 pb-5 mt-auto">
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
  if (project.to < today) {
    return <h2 className="lh-lg mb-5 display-4">Afsluttet</h2>;
  }
  return <h2 className="lh-lg mb-5 display-4">Aktiv</h2>;
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

export default HomeCard;
