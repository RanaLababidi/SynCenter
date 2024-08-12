import React from "react";
import {
  Form,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import forgot from "../../assets/forgot.gif";
import FormComponent from "../../components/FormComponent";
import ButtonComponent from "../../components/ButtonComponent";

export default function ForgetPassword() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-[url('./assets/aa.jpg')] bg-no-repeat bg-cover">
      <div className="sm:mx-auto justify-center rounded-3xl shadow-2xl backdrop-blur-xl border-double border-4 p-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <img src={forgot} style={{ width: '75%' }} className="mx-auto" alt="Forgot Password" />
          <h1 className="font-title text-center mt-3 mb-3 text-4xl font-bold leading-9 tracking-tight text-white">
            Forgot Password?
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
          <h3 className="font-title text-center mt-5 text-white">
            Enter your email, We will send a verification code to your email.
          </h3>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" method="POST">
            <FormComponent label="Email Adress" id="email" type="email" />
            <ButtonComponent label="Send" />

          </Form>
        </div>
      </div>
    </div>
  );
}

