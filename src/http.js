const baseUrl = "http://192.168.1.5:8000";
const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
//projrcts
export async function projectsIndex() {
  const response = await fetch(`${baseUrl}/company/projects`, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }

  const responseData = await response.json();
  return responseData.projects; // Return parsed JSON data
}

export async function storeProject(formData) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${baseUrl}/company/projects`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }
  const responseData = await response.json();
  return responseData;
}
export async function projectDetailsLoader({ params }) {
  const projectId = params.projectId;
  const response = await fetch(`${baseUrl}/company/projects/${projectId}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch project details.");
  }

  const responseData = await response.json();
  return responseData.projects; // Return parsed JSON data
}

export async function deleteProject(id) {
  const response = await fetch(`${baseUrl}/company/projects/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not delete project.");
  }

  const responseData = await response.json();
  return responseData;
}
export async function updateProject(formData, id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/company/projects/${id}`, {
    method: "POST", // Changed method to POST
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("Server error response:", errorData);
    throw new Error(`Could not update project: ${errorData.message}`);
  }

  const responseData = await response.json();
  return responseData;
}
//clients
export async function clientsIndex() {
  const response = await fetch(`${baseUrl}/company/clients`, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }

  const responseData = await response.json();
  return responseData.clients; 
}
export async function storeClient(formData) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${baseUrl}/company/clients`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }
  const responseData = await response.json();
  return responseData;
}
export async function deleteClient(id) {
  const response = await fetch(`${baseUrl}/company/clients/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not delete project.");
  }

  const responseData = await response.json();
  return responseData;
}
export async function updateClient(formData, id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${baseUrl}/company/clients/${id}`, {
    method: "POST", // Changed method to POST
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if(response.status ===422){
    return response;
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.log("Server error response:", errorData);
    throw new Error(`Could not update project: ${errorData.message}`);
  }
  const responseData = await response.json();
  return responseData;
}
//employees
export async function employeesIndex() {
  const response = await fetch(`${baseUrl}/company/employees`, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }

  const responseData = await response.json();
  return responseData.employees;
}
export async function employeeDetailsLoader({ params }) {
  const employeeId = params.employeeId;
  const response = await fetch(`${baseUrl}/company/employees/${employeeId}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch project details.");
  }

  const responseData = await response.json();
  return responseData.employees ; 
}
export async function storeEmpolyee(formData) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${baseUrl}/company/employees`, {
    method: "POST",
    headers: headers,
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }
  const responseData = await response.json();
  return responseData;
}
export async function updateEmployee(formData, id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/company/employees/${id}`, {
    method: "POST", // Changed method to POST
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("Server error response:", errorData);
    throw new Error(`Could not update project: ${errorData.message}`);
  }

  const responseData = await response.json();
  return responseData;
}
export async function deleteEmployee(id) {
  const response = await fetch(`${baseUrl}/company/employees/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not delete project.");
  }

  const responseData = await response.json();
  return responseData;
}

export async function employeeLoade ()  {
  
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${baseUrl}/company/employees`, { headers });

    if (!response.ok) {
      throw new Error("Could not fetch clients.");
    }

    const responseData = await response.json();
    return responseData.employees;
  };


//Tasks
export async function storeTask(formData) {
  const token = localStorage.getItem("token");
  const headers = {
      Authorization: `Bearer ${token}`,
      // Content-Type should be omitted for FormData
  };

  const response = await fetch(`${baseUrl}/company/tasks`, {
      method: "POST",
      headers: headers,
      body: formData,
  });

  if (!response.ok) {
      throw new Error("Could not fetch projects.");
  }
  
  const responseData = await response.json();
  return responseData;
}
export async function TasksLoade ({ params })  {
  const projectId = params.projectId;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${baseUrl}/company/tasks/?project_id=${projectId}`, { headers });

  if (!response.ok) {
    throw new Error("Could not fetch clients.");
  }

  const responseData = await response.json();
  return responseData.tasks;
};
