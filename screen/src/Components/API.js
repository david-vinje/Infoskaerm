const token = "eyJraWQiOiIvcHJpdmF0ZUtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RydXN0d29ya3MuZGsiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzeXN0ZW0uaW50cmEiLCJpYXQiOjE3MjQzMjk2OTcsImV4cCI6MzMyNjAzMjk2OTcsImdyb3VwcyI6WyJBUFBMSUNBVElPTiJdLCJqdGkiOiJlMDBhNGIxZi01NDQ2LTRjZWYtYmFlYy1hMzcwYzJjMmQ1NzUifQ.lJaOt0jCnmuGdzf4So8oI0NWnZfETmOLGp58KLKpMCxEH2FjOPH9IOPaKFtcyeHSKesyMANK_CJKQ1vGwsyDCudrisOSOyaBeQHPNA6c-VIRopjr7p7Q_jzJp8l7SF19lJ2f9ZrlNp6nE3NO7SdLhyHFsYFyZesT_yDrI9Z3czEbvMfocHxPe6WEUTMpZRSHI_pKUpLBNyb46vk5LIV6WlDoT1YGx_lR2g-DP_3cgNccyTn9LoH870ncqbA5w57AF7L0aVVNs_wtBIV0ibvmnZBfjD9XaJ1Tc57dizKCfSTLHgVOIYkJOQFo_koD3RunyM5USfMakXVzRaw-DKqxdjRJnp9miWL7HteTy18bYDEkORN7Nz-W_TahPfDcmLepCpidQbl5NWK38yRXG5sQwt8WLbfYKgv2PBc1r3iW2mLwe0Cjd3pt8EcFXZPNbhvODQT7QSl4mrpbGf986giDTE3cYFCz38iYDxloZVIAZGGqykZXy7B-00i51M3Td-HOcocoJzMBjpP5QR4gAw7P5ezm4dGZ_UJdHEVjr6o_oJlfY16Dq0pySmVlOyj2eJOfkS1lu_ZgvAB59ZLdZhDDf4CgoQcMYXKrKcKzlPAcfNT-O58Ait8pjfhvzBAHySg2ph7y9WvJ0gV7LCf_01WJ1jwOA84U3vyH1y7P2u0YbLI"

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
  console.log(events)
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
    // const response = await fetch('https://api.trustworks.dk/public/news/office_display', config);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // const events = await response.json()

    const events = require('./events.json');

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


