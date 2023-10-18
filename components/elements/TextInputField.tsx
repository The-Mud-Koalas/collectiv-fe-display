import { COLORS } from "@/utils/constants/colors";
import { MotionProps, motion } from "framer-motion";
import React, { useId } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import FieldErrorMessage from "./FieldErrorMessage";
import { inter } from "@/utils/constants/fonts";

interface Props<T> extends React.ComponentProps<"input"> {
  field: Path<T & FieldValues>;
  register?: UseFormRegister<T & FieldValues>;
  registerOptions?: RegisterOptions;
  placeholder?: string;
  label: string;
  error?: FieldError;
}

/**
 * A text input field component with label
 *
 * @param field - The form field corresponding to the input
 * @param register - The register function, gathered from useForm
 * @param [registerOptions] - Register Options, which can consist of validators
 * @param [placeholder] - Placeholder for the input column
 * @param label - The label for the input
 */
const TextInputField = <T extends unknown>({
  field,
  register,
  registerOptions,
  placeholder,
  label,
  error,
  ...otherProps
}: Props<T>) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={inputId}
        className={`${inter.className} text-sm sm:text-base font-small`}
      >
        {label}{" "}
        {registerOptions?.required && <span className="text-red-600">*</span>}
      </label>
      <motion.input
        whileFocus={{
          boxShadow: `0 0 0 2px ${
            error == null ? COLORS.secondary[400] : COLORS.danger[400]
          }`,
        }}
        className={`${inter.className} outline-none bg-gray-50 text-sm sm:text-base px-3 py-3 rounded-lg border-gray-300 border-[1.5px] disabled:text-gray-400`}
        type="text"
        id={inputId}
        placeholder={placeholder}
        {...(register != null ? register(field, registerOptions ?? {}) : {})}
        {...(otherProps as MotionProps)}
      />
      {error && <FieldErrorMessage message={error.message} />}
    </div>
  );
};

export default TextInputField;
