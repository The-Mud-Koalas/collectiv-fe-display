import { EMAIL_REGEX, PHONE_REGEX } from "@/utils/constants/regex";

const phoneOrEmailValidator = (v: string) => {
    const isValid = 
    EMAIL_REGEX.test(v) 
    // || 
    // PHONE_REGEX.test(v);
    return isValid || "The field must be a valid phone number or email";
}

export { phoneOrEmailValidator }