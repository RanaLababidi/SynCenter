import React from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
  Link,
} from "react-router-dom";
import { RegisterAction } from "../http";

import user from "../assets/user.gif";
import FormComponent from "./FormComponent";
import ButtonComponent from "./ButtonComponent";

export default function AuthFormRegester() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting";

  return (
    <div className="flex bg-fixed min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-[url('./assets/aa.jpg')] bg-no-repeat bg-cover">
      <div className="sm:mx-auto overflow-auto justify-center rounded-3xl shadow-2xl backdrop-blur-lg border-double border-4 p-10">
        <div className="sm:w-full text-center">
          <img src={user} className="w-1/2 mx-auto" alt="Forgot Password" />
          <h1 className="font-title text-center text-4xl font-bold leading-9 tracking-tight text-white">
            Sign up
          </h1>
          <div className="font-content text-pistach">
            {data && data.message && (
              <div>
                {Object.keys(data.message).map((key, index) => (
                  <div key={index}>{data.message[key]}</div>
                ))}
              </div>
            )}
          </div>
          <h3 className="font-title text-center mt-4 text-white">
            Sign up to start managing your company
          </h3>
        </div>
        <div className="mt-5 sm:mx-auto">
          <Form className="space-y-6" method="POST">
            <FormComponent
              label="Name :"
              id="name"
              type="text"
              name="name" // Ensure the name attribute is set correctly
              className="text-gray"
            />
            <FormComponent
              label="Phone :"
              id="phone"
              type="text"
              name="phone" // Ensure the name attribute is set correctly
              className="text-gray"
            />
            <FormComponent
              label="Email Address"
              id="email"
              type="email"
              name="email" // Ensure the name attribute is set correctly
              className="text-gray"
            />
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="font-content block text-sm text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg py-1.5 shadow-sm focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password_confirmation"
                  className="font-content block text-sm text-white"
                >
                  Confirm password:
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password_confirmation" // Ensure the name attribute is set correctly
                  id="password_confirmation"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg py-1.5 shadow-sm focus:ring-2 focus:ring-inset focus:ring-pistach sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <ButtonComponent label="Sign up" />
          </Form>
        </div>
      </div>
    </div>
  );
}

