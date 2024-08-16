import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
  Link,
} from "react-router-dom";
const baseUrl = "http://192.168.1.3:8000";
const token = localStorage.getItem("token");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
import { getMessaging, getToken } from "firebase/messaging";
import { messaging } from "./firebase-config";

//Auth
async function requestPermission() {
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    console.log("Notification permission granted.");
  } else {
    console.log("Notification permission denied.");
  }
}

async function retrieveFCMToken() {
  try {
    await requestPermission();
    const fcmToken = await getToken(messaging, {
      vapidKey:
        "BF_CG_rX9kA_yhoDK_ON9uzbBmgA7Q3hnx9XEE8165eWAAHjYdy3opviPJsJ-88xbu22HE8LcYUxweZsUaNCkPU",
    });
    console.log("FCM Token:", fcmToken);
    return fcmToken;
  } catch (error) {
    console.error("Error retrieving FCM token:", error);
  }
}

export async function loginAction({ request, params }) {
  const data = await request.formData();
  const eventData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`${baseUrl}/company/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  // Handle error responses (status codes 422, 401, 400)
  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    return response;
  }

  // Handle non-OK responses
  if (!response.ok) {
    return json(
      { message: "Could not login to your account." },
      { status: 500 }
    );
  }

  const responseData = await response.json();
  const token = responseData.access_token;
  localStorage.setItem("token", token);

  try {
    const fcmToken = await retrieveFCMToken();
    if (fcmToken) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = JSON.stringify({ device_token: fcmToken });
      console.log("Headers:", headers);
      console.log("Body:", body);

      await fetch(`${baseUrl}/company/device-token`, {
        method: "POST",
        headers: headers,
        body: body,
      });
    }
  } catch (error) {
    console.error("Error sending FCM token:", error);
  }

  return redirect("/home/statistics");
}
export async function RegisterAction({ request, params }) {
  const planId = params.planId;
  const data = await request.formData();
  const eventData = {
    email: data.get("email"),
    password: data.get("password"),
    phone: data.get("phone"),
    name: data.get("name"),
    password_confirmation: data.get("password_confirmation"),
  };

  const response = await fetch(`${baseUrl}/company/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    const errorData = await response.json();
    return json({ message: errorData.errors || "Registration failed." }, { status: response.status });
  }

  if (!response.ok) {
    return json(
      { message: "Could not register your account." },
      { status: 500 }
    );
  }

  const responseData = await response.json();
  const token = responseData.access_token;
  localStorage.setItem("token", token);

  // Subscribe the user to the selected plan
  const subscriptionData = {
    plan_id: planId,
  };

  const subscribeResponse = await fetch(`${baseUrl}/company/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Include the token for authorization
    },
    body: JSON.stringify(subscriptionData),
  });

  if (!subscribeResponse.ok) {
    return json(
      { message: "Could not subscribe to the plan." },
      { status: 500 }
    );
  }

  const subscribeResponseData = await subscribeResponse.json();

  // Check if the response indicates success and contains a URL
  if (subscribeResponseData.success && subscribeResponseData.url) {
    return redirect(subscribeResponseData.url);
  }

  return json(
    { message: "Subscription was successful, but no URL was provided." },
    { status: 500 }
  );
}


export async function subscribe(planId) {
  const eventData = {
    plan_id: planId
  };
  const response = await fetch(`${baseUrl}/company/subscribe`, {
    method: "GET",
    headers: headers,
    body: JSON.stringify(eventData),

  });

  if (!response.ok) {
    throw new Error("Could not fetch project details.");
  }

  const responseData = await response.json();
  return responseData.projects; // Return parsed JSON data
}

export async function forgotPasswordAction({ request, params }) {
  const data = await request.formData();
  const eventData = { email: data.get("email") };
  const response = await fetch(`${baseUrl}/company/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    const errorData = await response.json();
    return json(errorData, { status: response.status });
  }
  if (!response.ok) {
    return json({ message: "Could not send email." }, { status: 500 });
  }
  localStorage.setItem("email", data.get("email"));

  return redirect("checkCode");
}
export async function checkCodeAction({ request, params }) {
  const email = localStorage.getItem("email");

  const data = await request.formData();
  const eventData = {
    email: email,
    code: data.get("otp"), // Retrieve the full OTP code
  };

  const response = await fetch(`${baseUrl}/company/check-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    const errorData = await response.json();
    return json(errorData, { status: response.status });
  }

  if (!response.ok) {
    return json({ message: "Could not send." }, { status: 500 });
  }
  localStorage.setItem("code", data.get("otp"));

  return redirect("/auth/forgetPassword/resetPassword");
}
export async function resetPasswordAction({ request, params }) {
  const email = localStorage.getItem("email");
  const code = localStorage.getItem("code");

  const data = await request.formData();
  const eventData = {
    email: email,
    code: code,
    new_password: data.get("new_password"),
    new_password_confirmation: data.get("confirmed"),
  };

  const response = await fetch(`${baseUrl}/company/edit-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    const errorData = await response.json();
    return json(errorData, { status: response.status });
  }

  if (!response.ok) {
    return json({ message: "Could not send." }, { status: 500 });
  }
  localStorage.removeItem("email");
  localStorage.removeItem("code");

  return redirect("/auth/forgetPassword/successRestPasword");
}

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
  if (response.status === 422) {
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
  return responseData.employees;
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

export async function employeeLoade() {
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
}
//Tasks
export async function storeTask(formData) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
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
export async function TasksLoade({ params }) {
  const projectId = params.projectId;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `${baseUrl}/company/tasks/?project_id=${projectId}`,
    { headers }
  );

  if (!response.ok) {
    throw new Error("Could not fetch clients.");
  }

  const responseData = await response.json();
  return responseData.tasks;
}
export async function tasksDetailsLoader({ params }) {
  const taskId = params.taskId;
  const response = await fetch(`${baseUrl}/company/tasks/${taskId}`, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch tasks details.");
  }

  const responseData = await response.json();
  return responseData.task; // Return parsed JSON data
}

export async function changeStatus(formData, id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${baseUrl}/company/tasks/change-status/${id}`, {
    method: "POST", // Changed method to POST
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (response.status === 422) {
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
//files
export async function storeFile(formData, id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${baseUrl}/company/files/project/${id}`, {
    method: "POST", // Changed method to POST
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (response.status === 422) {
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
export async function fileLoade({ params }) {
  const projectId = params.projectId;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `${baseUrl}/company/files/project/${projectId}`,
    { headers }
  );

  if (!response.ok) {
    throw new Error("Could not fetch clients.");
  }

  const responseData = await response.json();
  return responseData.files;
}
export async function deleteFiles(id) {
  const response = await fetch(`${baseUrl}/company/files/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not delete project.");
  }

  const responseData = await response.json();
  return responseData;
}
//profile
export async function profileLoader() {
  const response = await fetch(`${baseUrl}/company/profile`, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }

  const responseData = await response.json();
  return responseData.profile; // Return parsed JSON data
}
export async function updateCompany(formData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/company/profile`, {
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
//Meeting
export async function AddMeeting(formData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${baseUrl}/company/meetings`, {
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
export async function MeetingLoader() {
  const response = await fetch(`${baseUrl}/company/meetings`, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }

  const responseData = await response.json();
  return responseData.data; // Return parsed JSON data
}
export async function deleteMeeting(id) {
  const response = await fetch(`${baseUrl}/company/meetings/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not delete project.");
  }

  const responseData = await response.json();
  return responseData;
}
export async function acceptMeeting(id, state) {
  const response = await fetch(
    `${baseUrl}/company/meetings/${id}/accept-toggle/${state}`,
    {
      method: "GET",
      headers: headers,
    }
  );

  if (!response.ok) {
    throw new Error("Could not delete project.");
  }

  const responseData = await response.json();
  return responseData;
}
//statistics
export async function statisticsLoader() {
  const response = await fetch(`${baseUrl}/company/statistics`, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }

  const responseData = await response.json();
  return responseData.data; // Return parsed JSON data
}
//notification
export async function notificationLoader() {
  const response = await fetch(`${baseUrl}/company/notification`, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }

  const responseData = await response.json();
  return responseData.data; // Return parsed JSON data
}
export async function unread() {
  const response = await fetch(`${baseUrl}/company/notification/unread-count`, {
    headers: headers,
  });

  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }

  const responseData = await response.json();
  return responseData.data; 
}
export async function planLoader() {
  const response = await fetch(`${baseUrl}/company/plans`, {});

  if (!response.ok) {
    throw new Error("Could not fetch projects.");
  }

  const responseData = await response.json();
  return responseData.plans; // Return parsed JSON data
}
