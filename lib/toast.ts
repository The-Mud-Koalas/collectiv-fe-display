import { toast } from "react-toastify";

interface ErrorToastProps {
    error: Error;
    customMessage?: string;
}

export const showErrorToast = ({ error, customMessage }: ErrorToastProps) => toast.error(customMessage ?? (error.cause as { message: string }).message as string);