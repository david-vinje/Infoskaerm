import React, { useEffect, useState } from "react";
import { Wrapper } from "./Home.styles";
import { useNavigate } from "react-router-dom";
import { useToolContext } from "../Contexts/ToolContext";
import { Carousel } from "react-bootstrap";
import {
  getProjects,
  getClientLogoUudid,
  getEmployeePhotoUuid,
  getConsultants,
  getEvents,
  getHeadcount,
  getCoffeeMeetings
} from "../Components/API";
import HomeCard from "./HomeCard";
import Calendar from "../Components/Calendar";
import Flyer from "../Components/Flyer";
import IndustryInsight from '../FlyerImg/IndInsTest.png';
// import ChristmasSweater from '../img/CS.png';

let counter = 0
const flyers = [
  IndustryInsight,
  // ChristmasSweater
]

const INTERVAL = 1000 * 30; // 30 seconds
const CALENDAR_INTERVAL = 5; // every 5 slides

const Home = () => {
  const navigate = useNavigate();
  const { setSelectedTool } = useToolContext();
  const [projects, setProjects] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [employees, setEmployeeList] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [events, setEvents] = useState([]);
  const [coffeeMeetings, setCoffeeMeetings] = useState([]);
  const [headcount, setHeadcount] = useState([]);
  const [isPortrait, setOrientation] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  window.addEventListener("resize", () =>
    setOrientation(window.matchMedia("(orientation: portrait)").matches)
  );

  useEffect(() => {
    getProjects(setProjects);
    getConsultants(setConsultants);
    getEvents(setEvents);
    getHeadcount(setHeadcount);
    getCoffeeMeetings(setCoffeeMeetings)
  }, []);

  useEffect(() => {
    if (projects.length > 0 && consultants.length > 0 && events.length > 0) {
      // Create a Set of active consultant IDs
      const activeConsultantIds = new Set(
        consultants.map(consultant => consultant.uuid)
      );
      events.forEach(event => {
        activeConsultantIds.add(event.createdBy);
      });


      // Filter projects to only include active consultants in projectDescriptionUserList
      const filteredProjects = projects.map((project) => ({
        ...project,
        projectDescriptionUserList: (
          project.projectDescriptionUserList || []
        ).filter((user) => activeConsultantIds.has(user.useruuid)),
      }));

      const today = new Date();
      const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 1));

      const projectsActiveLastYear = filteredProjects.filter((project) => {
        if (project.toDate == null) {
          return true;
        }
        const inputDate = new Date(project.toDate);
        return inputDate > oneYearAgo;
      });

      setActiveProjects(projectsActiveLastYear);
    }
  }, [projects, consultants, events]);

  // Update employee list based on active consultants
  useEffect(() => {
    if (activeProjects.length > 0) {
      const fetchPhotosForActiveConsultants = async () => {
        const photoPromises = activeProjects.flatMap((project) =>
          project.projectDescriptionUserList.map(async (user) => {
            try {
              const photo = await getEmployeePhotoUuid(user.useruuid);
              return { id: user.useruuid, file: photo };
            } catch (error) {
              console.error(
                `Error fetching photo for user ${user.useruuid}:`,
                error
              );
              return null;
            }
          })
        );

        const newEmployeeList = (await Promise.all(photoPromises)).filter(
          Boolean
        );
        setEmployeeList(newEmployeeList);
      };

      fetchPhotosForActiveConsultants();
    }
  }, [activeProjects]);

  //Function to get the employee photo
  function getEmployeePhoto(props) {
    const foundItem = employees.find((item) => item.id === props);
    const photo = foundItem ? foundItem.file : null;
    return photo;
  }

  // Making list of clients consisting of id and photo file
  useEffect(() => {
    if (activeProjects.length > 0) {
      const fetchClientPhotos = async () => {
        const clientPhotoPromises = activeProjects.map(async (project) => {
          try {
            const photo = await getClientLogoUudid(project.clientuuid);
            return { id: project.clientuuid, file: photo };
          } catch (error) {
            console.error(error);
            return null;
          }
        });

        // const newClientList = (await Promise.all(clientPhotoPromises)).filter(Boolean);
        const newClientList = (await Promise.all(clientPhotoPromises)).filter(
          Boolean
        );
        setClientList(newClientList);
      };
      fetchClientPhotos();
    }
  }, [activeProjects]);

  // Function to get the client logo
  function getClientLogo(props) {
    const foundItem = clientList.find((item) => item.id === props);
    return foundItem ? foundItem.file : null;
  }

  const handleToolButtonClick = (tool) => {
    navigate("/findproject");
    setSelectedTool(tool);
  };

  const keyDown = evt => {
    console.log(evt.key)
    if (evt.key === 'PageDown') {
      const elem = document.getElementsByClassName('carousel-control-next')[0]
      elem.click()
    } else if (evt.key === 'PageUp') {
      const elem = document.getElementsByClassName('carousel-control-prev')[0]
      elem.click()
    }
  }
  
  return (
    <Wrapper className="body::before">
      <Carousel onKeyDown={keyDown} id="carousel" data-wrap pause={false}>
        {activeProjects.map((project, index) => {
          if (index % CALENDAR_INTERVAL === 0 && index % 2 === 1) {
            return (
              <Carousel.Item key={index} interval={INTERVAL * 2}>
                <Calendar events={events} headcount={headcount} />
              </Carousel.Item>
            );
          }
          if (index % CALENDAR_INTERVAL === 0 && index % 2 === 0) {
            return (
              <Carousel.Item key={index} interval={INTERVAL * 2}>
                <Flyer content={coffeeMeetings} />
              </Carousel.Item>
            );
          }
          return (
            <Carousel.Item key={index} autoFocus interval={INTERVAL}>
              <HomeCard
                project={project}
                onToolButtonClick={handleToolButtonClick}
                getClientLogo={getClientLogo}
                getEmployeePhoto={getEmployeePhoto}
                isPortrait={isPortrait}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Wrapper>
  );
};

export default Home;
