import React, { useState } from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
  Link,
} from "react-router-dom";
import forgot from "../../assets/reset.gif";
import FormComponent from "../../components/FormComponent";
import ButtonComponent from "../../components/ButtonComponent";

export default function ResetPassword() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [otp, setOtp] = useState("");

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-[url('./assets/aa.jpg')] bg-no-repeat bg-cover">
      <div className="sm:mx-auto justify-center rounded-3xl shadow-2xl backdrop-blur-xl border-double border-4 p-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <img src={forgot} className="mx-auto w-1/2" alt="Forgot Password" />
          <h1 className="font-title text-center mt-3 mb-3 text-4xl font-bold leading-9 tracking-tight text-white">
            Reset Password?
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
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" method="POST">
            <FormComponent
              label="New password"
              id="new_password"
              type="password"
            />

            <FormComponent
              label="Confirm Password"
              id="confirmed"
              type="password"
            />
            <ButtonComponent label="Save" />
          </Form>
        </div>
      </div>
    </div>
  );
}

