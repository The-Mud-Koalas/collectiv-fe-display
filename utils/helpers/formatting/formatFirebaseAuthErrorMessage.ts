import { FirebaseError } from "firebase/app";

const FIREBASE_AUTH_ERROR_MESSAGES = {
  "auth/email-already-in-use": "Your email is already taken.",
  "auth/wrong-password": "Your password is incorrect.",
  "auth/user-not-found": "This user does not exist in our system.",
};

type FirebaseErrorKeys = keyof typeof FIREBASE_AUTH_ERROR_MESSAGES;

export const formatFirebaseAuthErrorMessage = (error: FirebaseError) => {
  const errorCode = error.code;

  if (!Object.hasOwn(FIREBASE_AUTH_ERROR_MESSAGES, errorCode))
    return `An error has occured. Code: ${errorCode}`;

  return FIREBASE_AUTH_ERROR_MESSAGES[errorCode as FirebaseErrorKeys];
};
