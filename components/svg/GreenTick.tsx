import { FC } from "react";

interface GreenTickProps {}

const GreenTick: FC<GreenTickProps> = ({}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
        >
            <circle
                cx="28"
                cy="28"
                r="26.5"
                fill="#BAF67E"
                stroke="#163300"
                stroke-width="3"
            />
            <path
                d="M37.9551 20.5332L24.2662 34.2221L18.0439 27.9999"
                stroke="#163300"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export default GreenTick;
