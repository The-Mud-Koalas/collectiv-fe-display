import { FC, useState, useRef, useEffect } from "react";
import { Inter } from "next/font/google";
import { BeatLoader } from "react-spinners";
interface OTPpopupProps {
    phoneNumber: string;
    isLoading: boolean;
    handleOTPChange: (otp: string[]) => void;
}

const inter = Inter({ subsets: ["latin"] });

const OTPpopup: FC<OTPpopupProps> = ({
    phoneNumber,
    handleOTPChange,
    isLoading,
}) => {
    const [field, setField] = useState(["", "", "", "", "", ""]);

    const inputRefs: React.RefObject<HTMLInputElement>[] = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const handleInputChange = (index: number, value: string) => {
        const newInputValues = [...field];
        newInputValues[index] = value;
        setField(newInputValues);

        if (value.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1]?.current?.focus();
        }
    };

    useEffect(() => {
        handleOTPChange(field);
    }, [field]);

    return (
        <div className={`${inter}`}>
            <div className="bg-white px-6 py-10 border border-grey-300 mx-auto w-full max-w-lg  rounded-2xl">
                <div className="mx-auto flex w-full flex-col space-y-10">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <h1 className="text-2xl font-bold md:text-4xl">
                            SMS Verification
                        </h1>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p className="text-gray-400 font-semibold text-sm">
                                We have sent a code to {phoneNumber}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center ">
                        <BeatLoader
                            color="#BAF67E"
                            loading={isLoading}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                    <div>
                        <form action="" method="post">
                            <div className="flex flex-col space-y-15">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    {field.map((value, index) => (
                                        <div key={index} className="w-16 h-16">
                                            <input
                                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-primary-200"
                                                type="text"
                                                value={value}
                                                ref={inputRefs[index]}
                                                maxLength={1}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPpopup;
