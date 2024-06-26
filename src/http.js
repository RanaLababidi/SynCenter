const baseUrl = "http://192.168.1.5:8000";
const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function projectsIndex() {
  const response = await fetch(`${baseUrl}/company/projects?sort[id]=desc`, {
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
