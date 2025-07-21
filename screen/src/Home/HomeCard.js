import React from "react";
import { dateOnly } from "../Components/API";

const PEOPLE_LIMIT = 11;
const ROLES_TOOLS_LIMIT = 7;

const HomeCard = ({
  project,
  onToolButtonClick,
  getClientLogo,
  getEmployeePhoto,
  isPortait,
}) => {
  if (isPortait)
    return (
      <div className="container-fluid d-flex flex-column"> {/*container-fluid = which is width: 100% at all breakpoints, d-flex = display flex container, flex-colum = set a vertical direction */}
        <div className="row mx-auto clientlogoborder clientLogo rounded"> {/* mb-5  */}
          <img
            className=" rounded p-0"
            src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
          />
        </div>
        <div className="row row-2 pt-5 mh-50 overflow-hidden">
          <h1 className="project-name pt-5 display-1">{project.name}</h1>
          <ProjectStatus project={project}></ProjectStatus>
          <div className="col-8 right-border lh-lg project-description">
            <h1 className="display-5">Formål</h1>
            <p className="mb-3">{project.purpose}</p>
            <h1 className="display-5">Trustworks' rolle</h1>
            <p className="mb-3">{project.role}</p>
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
        <div className="row mt-auto">
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
  return (
    <div className="container-fluid "> {/*container-fluid = which is width: 100% at all breakpoints, d-flex = display flex container, flex-colum = set a vertical direction */}
      <div className="row h-100 ">
        <div className="col-4 d-flex flex-column justify-content-center right-border pe-5">
          <div className="row mx-auto clientlogoborder clientLogo rounded"> {/* mb-5  */}
            <img
              className=" rounded p-0"
              src={`data:image/jpeg;base64,${getClientLogo(project.clientuuid)}`}
            />


          </div>
          <div className="mt-5">
            <h1 className="display-5 col-12">Roller</h1>
            {project.rolesList.slice(0, ROLES_TOOLS_LIMIT).map((role, index) => (
              <button
                key={index}
                className="roller col mx-1 roller-og-tilgang-knap"
              >
                {role}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <h1 className="display-5">Tilgang</h1>
            {project.methodsList.slice(0, ROLES_TOOLS_LIMIT).map((method, index) => (
              <button
                key={index}
                className="tilgang col mx-1 roller-og-tilgang-knap rounded"
                onClick={() => onToolButtonClick(method)}
              >
                {method}
              </button>
            ))}
          </div>
        </div>
        <div className="col ps-5 d-flex flex-coloumn">
          <div className="row">
          <div className="col">
            <h1 className="project-name pt-5 display-1 d-flex">{project.name}</h1>
            <ProjectStatus project={project}></ProjectStatus>
            <div className="col-10 lh-lg project-description">
              <h1 className="display-5">Formål</h1>
              <p className="mb-5">{project.purpose}</p>
              <h1 className="display-5">Trustworks' rolle</h1>
              <p className="mb-5">{project.role}</p>
              <Learnings learnings={project.learnings}></Learnings>
            </div>
          </div>
          <div className="row mt-auto justify-content-start">
            {project.projectDescriptionUserList.slice(0, PEOPLE_LIMIT).map((user) => (
              <div className="col-auto " key={user.useruuid}>
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
        </div>
      </div>
    </div>
  )
}

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
      <><h1 className="display-5">Vores læringer</h1><p>{learnings}</p></>
    );
  }
};


export default HomeCard;











