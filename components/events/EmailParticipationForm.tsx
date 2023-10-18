import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInputField from "../elements/TextInputField";
import PasswordField from "../elements/PasswordField";
import { postRequest } from "@/lib/fetch";
import { showErrorToast } from "@/lib/toast";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "../elements";
import { inter } from "@/utils/constants/fonts";
import cn from "clsx";

interface Props {
  regisType: "volunteer" | "participant";
  eventDetails: EventDetail;
  closeModal: () => void;
}

interface FormFields {
  email: string;
  password: string;
}

interface EmailParticipantLogin extends FormFields {
  eventDetail: EventDetail;
}

const EmailParticipationForm: React.FC<Props> = ({
  regisType,
  eventDetails,
  closeModal
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>();

  const registration = useMutation({
    mutationFn: async ({
      email,
      password,
      eventDetail,
    }: EmailParticipantLogin) => {
      const account = await signInWithEmailAndPassword(auth, email, password);
      const token = await account.user.getIdToken();
      await postRequest({
        endpoint: `/participation/${regisType}/register`,
        token,
        body: {
          event_id: eventDetail.id,
        },
      });
      await signOut(auth);
    },
    onSuccess: () =>
      toast.success(`You have successfully registed to ${eventDetails.name}.`),
    onError: (error: Error) => showErrorToast({ error }),
  });

  const onSubmit: SubmitHandler<FormFields> = async ({ email, password }) => {
    await registration.mutateAsync({
      email,
      password,
      eventDetail: eventDetails,
    });
    closeModal();
  };

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
      <div className={cn("w-full flex gap-3 px-10", inter.className)}>
          <Button
            onClick={closeModal}
            type="button"
            className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium text-primary-800 border-2"
          >
            Cancel
          </Button>
          <Button
            className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium bg-primary-800 text-primary-300"
          >
            Register
          </Button>
        </div>
    </form>
  );
};

export default EmailParticipationForm;
