import { useEffect, useState } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getClientLogoUudid,
  getCoffeeMeetings,
  getConsultants,
  getEmployeePhotoUuid,
  getEvents,
  getHeadcount,
  getProjects
} from "../Components/API";
import Calendar from "../Components/Calendar";
import { useToolContext } from "../Contexts/ToolContext";
import GÅ_HJEM from "../img/GÅ-HJEM.png";
import { Wrapper } from "./Home.styles";
import HomeCard from "./HomeCard";
import Flyer from "../Components/Flyer"

const INTERVAL = 1000 * 30; // 30 seconds
const CALENDAR_INTERVAL = 4; // every x slides

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
    getConsultants(setConsultants);
    getProjects(setProjects);
    getEvents(setEvents);
    getHeadcount(setHeadcount);
  }, []);

  useEffect(() => {
    if (projects.length > 0 && employees.length > 0 && events.length > 0) {
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
  }, [projects, employees, events]);

  useEffect(() => {
    getCoffeeMeetings(setCoffeeMeetings)
  }, [employees])

  // Update employee list based on active consultants
  useEffect(() => {
    const fetchPhotosForActiveConsultants = async () => {
      const photoPromises = consultants.flatMap(async consultant => {
        try {
          const photo = await getEmployeePhotoUuid(consultant.uuid);
          return { id: consultant.uuid, file: photo };
        } catch (error) {
          console.error(
            `Error fetching photo for user ${consultant.useruuid}:`,
            error
          );
          return null;
        }
      });
      const newEmployeeList = await Promise.all(photoPromises);
      console.log('newEmployeeList', newEmployeeList)
      setEmployeeList(newEmployeeList);
    }
    fetchPhotosForActiveConsultants()
  }, [consultants]);

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

  //Function to get the employee photo
  function getEmployeePhoto(id) {
    const employee = employees.find(employee => employee?.id === id);
    const photo = employee ? employee?.file : null;
    return photo;
  }

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
    if (evt.key === 'PageDown') {
      const elem = document.getElementsByClassName('carousel-control-next')[0]
      elem.click()
    } else if (evt.key === 'PageUp') {
      const elem = document.getElementsByClassName('carousel-control-prev')[0]
      elem.click()
    }
  }

  let count = 0

  return (
    <Wrapper className="body::before ">
      <Carousel onKeyDown={keyDown} id="carousel" data-wrap pause={false}>
        {activeProjects && activeProjects.map((project, index) => {
          // Hvert CALENDAR_INTERVAL slide er en kalender eller flyer
          if (index % CALENDAR_INTERVAL === 0) {
            if (count++ % 2 === 1) {
              return (
                <Carousel.Item key={index} interval={INTERVAL * 2}>
                  {events && headcount && <Calendar events={events} headcount={headcount} />}
                </Carousel.Item>
              );
            }
            return (
              <Carousel.Item key={index} interval={INTERVAL * 2}>
                 <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "98vh"
                }}>
                  <iframe style={{ height: "90vh", width: "75vw", overflow: "hidden", borderRadius: "15px" }} scrolling="no" src="http://192.168.1.123" frameborder="0"></iframe>
                </div> 
              </Carousel.Item>
            );
          }
          return (
            <Carousel.Item key={index} autoFocus interval={INTERVAL}>
              {project && <HomeCard
                isPortait={isPortrait}
                project={project}
                onToolButtonClick={handleToolButtonClick}
                getClientLogo={getClientLogo}
                getEmployeePhoto={getEmployeePhoto}
              />}
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Wrapper >
  );
};

export default Home;