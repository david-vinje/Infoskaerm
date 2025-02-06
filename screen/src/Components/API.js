const token = process.env.REACT_APP_TOKEN

export const config = { headers: { Authorization: `Bearer ${token}` } };

async function fetchHeadcount(date) {
  try {
    const response = await fetch('https://api.trustworks.dk/public/stats/employees/headcount/' + date, config);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const headcount = await response.json()
    return headcount.value
  } catch (error) {
    console.error('Error fetching headcount:', error.message);
    throw error;
  }
}

export const dateOnly = date => {
  return date.toISOString().split('T')[0]
}

const yearsAgo = years => {
  const [_, month, day] = dateOnly(new Date()).split('-')
  const newYear = new Date().getFullYear() - years;
  return dateOnly(new Date(newYear + '-' + month + '-' + day))
}

export const getHeadcount = async setEvents => {
  const A = await fetchHeadcount(yearsAgo(0))
  const B = await fetchHeadcount(yearsAgo(1))
  const percentage = Math.round(B / A * 100)
  setEvents([A, percentage])
}

export const sortedEvents = events => {
  const today = dateOnly(new Date());
  return events
    .map(event => {
      const eventDate = event.eventDate.split("T")[0]
      return { ...event, eventDate }
    })
    .sort((a, b) => {
      const dateA = new Date(a.eventDate);
      const dateB = new Date(b.eventDate);
      return dateA - dateB;
    })
    .filter(event => event.eventDate >= today)
}

export async function getEvents(setEvents) {
  try {
    const response = await fetch('https://api.trustworks.dk/public/news/office_display', config);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const events = await response.json()

    // const events = require('./events.json');

    setEvents(sortedEvents(events))

  } catch (error) {
    console.error('Error fetching events:', error.message);
    throw error;
  }
}

export async function getProjects(setProjects) {
  try {
    const response = await fetch('https://api.trustworks.dk/public/knowledge/projects', config);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json()

    // const data = require('./projects.json');

    const sortedProjects = data.sort((a, b) => {
      // Convert the "from" values to Date objects for comparison
      const dateA = new Date(a.to);
      const dateB = new Date(b.to);

      // Compare the dates in reverse order (newest first)
      return dateB - dateA;
    });

    // Set the sorted projects in the state
    setProjects(sortedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    throw error;
  }
}

export async function getEmployeePhotoUuid(useruuid) {
  try {
    const response = await fetch(`https://api.trustworks.dk/public/users/${useruuid}/photo`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.file;
  }
  catch (error) {
    console.error(`Error fetching employee photo for user ${useruuid}:`, error.message);
    throw error;
  }
}

export async function getConsultants(setConsultants) {
  try {
    const response = await fetch('https://api.trustworks.dk/public/users', config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Filter the consultants to include only active consultants
    const activeConsultants = data.filter(consultant =>
      consultant.active && (consultant.type === "CONSULTANT" || consultant.type === "STUDENT")
    );

    // Update the state with the filtered list of active consultants
    setConsultants(activeConsultants);

  } catch (error) {
    console.error(`Error fetching client:`, error.message);
    return null;
  }
}


export function getActiveConsultants(consultants) {
  try {
    const activeConsultants = consultants.filter(consultant =>
      consultant.active && (consultant.type === "CONSULTANT" || consultant.type === "STUDENT")
    );

    return activeConsultants;

  }
  catch (error) {
    console.error(`Error fetching client:`, error.message);
    return null;
  }
}

export async function getClients(setClients) {
  try {
    const response = await fetch('https://api.trustworks.dk/public/clients', config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    setClients(data);
  }
  catch (error) {
    console.error(`Error fetching client:`, error.message);
    return null;
  }
}


export async function getClientLogoUudid(clientuuid) {
  try {
    const response = await fetch(`https://api.trustworks.dk/public/files/photos/${clientuuid}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.file;
  }
  catch (error) {
    console.error(`Error fetching client photo for client id ${clientuuid}:`, error.message);
    return null;
  }
}

//Update list of cliets with IDs and logos
export async function updateClientListWithIdPhoto(projects, setClients) {
  try {
    // Using Promise.all to wait for all requests to complete
    await Promise.all(
      projects?.map(async (project) => {
        const response = await fetch(
          `https://api.trustworks.dk/public/files/photos/${project.clientuuid}`,
          config
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setClients((clients) => [
          ...clients,
          { id: project.clientuuid, file: data.file },
        ]);
      })
    );
  } catch (error) {
    console.error(`Error fetching client photos:`, error.message);
    return null;
  }
}


export const getCoffeeMeetings = async (setCoffeeMeetings) => {
  // try {
  //   const response = await fetch('https://api.trustworks.dk/public/foo/bar/coffeemeetings/' + date, config);
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   const meetings = await response.json()
  //   setCoffeeMeetings(meetings)
  // } catch (error) {
  //   console.error('Error fetching headcount:', error.message);
  //   throw error;
  // }
  const data = require('./meetings.json');
  setCoffeeMeetings(data)
}

