import React, { useEffect, useState } from "react";
import OTPpopup from "../elements/OTPPopup";

import { PhoneNumberUtil } from "google-libphonenumber";
import {
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import PhoneLogin from "../elements/PhoneLogin";
import { auth } from "@/lib/firebase";
import { showErrorToast } from "@/lib/toast";
import { formatFirebaseAuthErrorMessage } from "@/utils/helpers/formatting/formatFirebaseAuthErrorMessage";
import { FirebaseError } from "firebase/app";
import {
  RecaptchaVerifier,
  User,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { postRequest } from "@/lib/fetch";

interface Props {
  regisType: "volunteer" | "participant";
  closeModal: () => void;
  eventDetails: EventDetail;
}

interface PhoneParticipantLogin {
  eventDetail: EventDetail;
  token: string;
}

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

const phoneUtil = PhoneNumberUtil.getInstance();

const PhoneParticipationForm: React.FC<Props> = ({
  regisType,
  closeModal,
  eventDetails,
}) => {
  const [showOTPModal, setShowOTPModal] = useState<boolean>(false);
  const [hasAttempted, setHasAttempted] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOTPLoading, setIsOTPLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const form = useForm<PhoneLoginFormFields>();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: PhoneParticipantLogin) => {
      await postRequest({
        endpoint: `/participation/${regisType}/register`,
        token: data.token,
        body: {
          event_id: data.eventDetail.id,
        },
      });
      await signOut(auth);
    },
    onSuccess: () =>
      toast.success(`You have successfully registed to ${eventDetails.name}.`),
    retry: false,
  });

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: string | null) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          if (response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber
            console.log(response);
            form.reset();

            // Call your function to handle sign-in here
          } else {
            console.log("reCAPTCHA challenge not completed.");
          }
        },
      }
    ); // Add a <div> with id 'recaptcha-container' in your HTML
  }, []);

  const isPhoneValid = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  const onSubmit: SubmitHandler<PhoneLoginFormFields> = async (data) => {
    setIsLoading(true);
    const { phoneNumber } = data;
    if (isPhoneValid(phoneNumber)) {
      setPhoneNumber(phoneNumber);
      signIn(phoneNumber);
    } else {
      console.log("invalid number");
      setIsLoading(false);
    }
  };

  const signIn = async (phoneNumber: string) => {
    const appVerifier = window.recaptchaVerifier;
    try {
      await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          console.log("Login success", confirmationResult);
          setShowOTPModal(true);
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          // Handle error
          console.error("Verification code sending error:", error);
        });
      form.reset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = formatFirebaseAuthErrorMessage(error);
        toast.error(errorMessage);
        return;
      }
      toast.error("An error has occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const onError: SubmitErrorHandler<FieldError> = (error) => {
    const errors = Object.values(error).map((item) => item.message) as string[];
    toast.error(errors?.[0]);
  };

  const router = useRouter();

  const handleOTPChange = async (newOTP: string[]) => {
    const otp = newOTP.join("");
    
    if (otp.length === 6) {
      if (hasAttempted) return;
      setIsOTPLoading(true);
      // verifu otp
      let confirmationResult = window.confirmationResult;
      let result: any;
      
      try {
        result = await confirmationResult.confirm(otp);
      } catch (error: any) {
        toast.error("Invalid verification code.");
        closeModal();
        return;
      }
      setHasAttempted(prev => prev + 1);

      const user: User = result.user;
      try {
        const token = await user.getIdToken();
        await mutateAsync({ eventDetail: eventDetails, token});
        setShowOTPModal(false);
        closeModal();
      } catch (error: any) {
        showErrorToast({ error });
        setIsOTPLoading(false);
        closeModal();
      }

    }
  };

  return (
    <>
      {showOTPModal === true ? (
        <OTPpopup
          phoneNumber={phoneNumber}
          handleOTPChange={handleOTPChange}
          isLoading={isOTPLoading}
        />
      ) : (
        <PhoneLogin
          closeModal={closeModal}
          form={form}
          isLoading={isLoading}
          onError={onError}
          onSubmit={onSubmit}
        />
      )}

      <div id="recaptcha-container" className="opacity-0"></div>
    </>
  );
};

export default PhoneParticipationForm;
