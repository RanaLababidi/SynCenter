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
import OtpInput from "../../components/OtpInput";
import ButtonComponent from "../../components/ButtonComponent";
import email from "../../assets/email.gif";

export default function CheckCode() {
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
        <img src={email} className="w-1/2 mx-auto" alt="Forgot Password" />
          <div className="font-content text-pistach">
            {data && data.message && <div>{data.message}</div>}
          </div>
          <h3 className="font-title text-center mt-5 text-white">
            Please enter the check Code we sent to your email
          </h3>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" method="POST">
            <input type="hidden" name="otp" value={otp} />
            <OtpInput length={5} onOtpChange={handleOtpChange} />
            <ButtonComponent label="Verify" />

          </Form>
        </div>
      </div>
    </div>
  );
}

