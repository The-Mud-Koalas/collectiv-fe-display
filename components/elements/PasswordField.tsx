import { COLORS } from "@/utils/constants/colors";
import React, { useState, useId } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import Eye from "../svg/Eye";
import { motion } from "framer-motion";
import EyeClosed from "../svg/EyeClosed";
import { inter } from "@/utils/constants/fonts";
import FieldErrorMessage from "./FieldErrorMessage";

interface Props<T> extends React.ComponentProps<"input"> {
  field: Path<T & FieldValues>;
  register?: UseFormRegister<T & FieldValues>;
  registerOptions?: RegisterOptions;
  label: string;
  error?: FieldError;
}

const inputFieldVariant = (error?: FieldError) => ({
  focus: {
    boxShadow: `0px 0px 0px 2px ${
      error == null ? COLORS.secondary[400] : COLORS.danger[400]
    }`,
  },
  blur: {
    boxShadow: "1px 1px 1px 1px rgba(255,255,255,0.01)",
  },
});

/**
 * A password input field component with label
 *
 * @param field - The form field corresponding to the input
 * @param register - The register function, gathered from useForm
 * @param [registerOptions] - Register Options, which can consist of validators
 * @param label - The label for the input
 */
const PasswordField = <T extends unknown>({
  field,
  register,
  registerOptions,
  label,
  error,
  ...otherProps
}: Props<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`${inter.className} text-xs sm:text-sm font-medium`}
      >
        {label}{" "}
        {registerOptions?.required && <span className="text-red-600">*</span>}
      </label>
      <motion.div
        variants={inputFieldVariant(error)}
        animate={isFocus ? "focus" : "blur"}
        className="flex flex-row gap-2 justify-between bg-gray-50 px-3 py-3 text-sm sm:text-base rounded-lg border-gray-300 border-[1.5px]"
      >
        <input
          onFocus={() => setIsFocus(true)}
          className={`${inter.className} outline-none bg-transparent w-full `}
          type={isVisible ? "text" : "password"}
          id={inputId}
          {...(register != null
            ? register(
                field,
                {
                  ...registerOptions,
                  onBlur: () => setIsFocus(false),
                } ?? {}
              )
            : {})}
          {...otherProps}
        />
        <button type="button" onClick={() => setIsVisible((prev) => !prev)}>
          {isVisible ? (
            <EyeClosed color={COLORS.gray[400]} dimensions={{ width: 20 }} />
          ) : (
            <Eye color={COLORS.gray[400]} dimensions={{ width: 20 }} />
          )}
        </button>
      </motion.div>
      {error && <FieldErrorMessage message={error.message} />}
    </div>
  );
};

export default PasswordField;
