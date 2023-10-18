import { Button } from "@/components/elements";
import PhoneNumberField from "@/components/elements/PhoneNumberField";
import { useWindowSize } from "@/hooks/display";
import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";
import cn from "clsx";
import {BeatLoader, ClipLoader} from "react-spinners"
import {
  FieldError,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import CollectivLogoHorizontal from "@/components/svg/logo/CollectivLogoHorizontal";
import { BREAKPOINTS } from "@/utils/constants/breakpoints";

interface Props {
  form: UseFormReturn<PhoneLoginFormFields>;
  onSubmit: SubmitHandler<PhoneLoginFormFields>;
  onError: SubmitErrorHandler<FieldError>;
  isLoading: boolean;
  closeModal: () => void;
}

const inter = Inter({ subsets: ["latin"] });

const PhoneLogin: React.FC<Props> = ({
  form,
  onSubmit,
  onError,
  isLoading,
  closeModal,
}) => {
  const { handleSubmit, control } = form;
  const { windowWidth } = useWindowSize();

  return (
    <>
      <div className="grid place-items-center lg:grow">
        <div
          className={`${inter.className} flex flex-col md:py-[5%] gap-6 max-w-xl w-full`}
        >
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <PhoneNumberField
              label="Phone Number"
              field="phoneNumber"
              control={control}
            />

            <div className={cn("w-full flex gap-3 px-10", inter.className)}>
              <Button
                onClick={closeModal}
                type="button"
                className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium text-primary-800 border-2"
              >
                Cancel
              </Button>
              <Button className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium bg-primary-800 text-primary-300">
                {isLoading ? <ClipLoader
                                color="#BAF67E"
                                loading={isLoading}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> : "Register"}
              </Button>
            </div>
            <p className="text-xs sm:text-sm">
              Not a member?{" "}
              <Link
                href="/accounts/signup"
                className="underline text-primary-700 sm:font-semibold"
              >
                Register now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default PhoneLogin;
