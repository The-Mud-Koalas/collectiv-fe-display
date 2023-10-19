import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInputField from "../elements/TextInputField";
import PasswordField from "../elements/PasswordField";
import { postRequest } from "@/lib/fetch";
import { showErrorToast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "../elements";
import { inter } from "@/utils/constants/fonts";
import cn from "clsx";
import { nanoid }from "nanoid"

interface Props {
  regisType: "volunteer" | "participant";
  eventDetails: EventDetail;
  closeModal: () => void;
}

interface FormFields {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface EmailParticipantLogin extends FormFields {
  eventDetail: EventDetail;
}

const EmailParticipationForm: React.FC<Props> = ({
  regisType,
  eventDetails,
  closeModal,
}) => {
  const {
    handleSubmit,
    register,
    unregister,
    setError,
    formState: { errors },
  } = useForm<FormFields>();

  const [confirmPassword, setConfirmPassword] = useState(false);

  const registrationNew = useMutation({
    mutationFn: async ({
      email,
      password,
      eventDetail,
    }: EmailParticipantLogin) => {
      const account = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await account.user.getIdToken();

      try {
        try {

          await postRequest<UserPreferenceFields>({
            endpoint: "/user/update",
            token: idToken,
            body: {
              full_name: `random-user-${nanoid(16)}`,
              location_track: false, // Disallow location tracking, only when user says yes
              preferred_radius: 10, // When first created, discovery radius set to 10 km
            },
          });
        } catch (error) {
          await account.user.delete();
          return error;
        }

        await postRequest({
          endpoint: `/participation/${regisType}/register`,
          token: idToken,
          body: {
            event_id: eventDetail.id,
          },
        });
        await signOut(auth);
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () =>
      toast.success(
        `Your account has been created and you have successfully registered to ${eventDetails.name}.`
      ),
    onError: (error: Error) => showErrorToast({ error }),
  });

  const registration = useMutation({
    mutationFn: async ({
      email,
      password,
      eventDetail,
    }: EmailParticipantLogin) => {
      try {
        const account = await signInWithEmailAndPassword(auth, email, password);
        const token = await account.user.getIdToken();
        await postRequest({
          endpoint: `/participation/${regisType}/register`,
          token,
          body: {
            event_id: eventDetail.id,
          },
        });
      } catch {
        setConfirmPassword(true);
        return { newAcc: true };
      }
      await signOut(auth);
    },
    onSuccess: (data) => {
      if (!data?.newAcc) {
        toast.success(
          `You have successfully registered to ${eventDetails.name}.`
        );
      } else {
        toast.info(
          `Please confirm your Pincode for your new account.`
        );
      }
    },
    onError: (error: Error) => showErrorToast({ error }),
  });

  const onSubmit: SubmitHandler<FormFields> = async ({ email, password, confirmPassword }) => {
    if (!confirmPassword) {
      const response = await registration.mutateAsync({
        email,
        password,
        eventDetail: eventDetails,
      });
      if (response?.newAcc) return;
    } else {
      if (password !== confirmPassword) {
        setError('confirmPassword', { message: "Confirmed Pincode does not match original Pincode" })
        return;
      }
      await registrationNew.mutateAsync({
        email,
        password,
        eventDetail: eventDetails,
      });
    }
    closeModal();
  };

  useEffect(() => {
    if (!confirmPassword) {
      unregister("confirmPassword");
    }
  }, [confirmPassword, unregister]);

  return (
    <form
      className="w-full px-10 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInputField
        field="email"
        label="Enter your email"
        error={errors.email}
        register={register}
        registerOptions={{ required: "This field is required" }}
      />
      <PasswordField
        field="password"
        label="6 digit Pincode"
        error={errors.password}
        register={register}
        registerOptions={{ required: "This field is required" }}
      />
      {confirmPassword && (
        <PasswordField
          field="confirmPassword"
          label="Confirm 6 digit Pincode"
          error={errors.confirmPassword}
          register={register}
          registerOptions={{
            required: "This field is required",
          }}
        />
      )}
      <div className={cn("w-full flex gap-3 px-10", inter.className)}>
        <Button
          onClick={closeModal}
          type="button"
          className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium text-primary-800 border-2"
        >
          Cancel
        </Button>
        <Button className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium bg-primary-800 text-primary-300">
          {confirmPassword ? "Confirm" : "Register"}
        </Button>
      </div>
    </form>
  );
};

export default EmailParticipationForm;
