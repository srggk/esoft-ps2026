import { useState, useEffect, useRef } from "react";
import Button from "./ui-elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const INITIAL_TIME = 60 * 60 - 1;

function SpecialDealTimer({ onClose }) {
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isRunning, setIsRunning] = useState(true);
    const [isExpired, setIsExpired] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && !isExpired) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsExpired(true);
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning, isExpired]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const handleStopResume = () => {
        if (!isExpired) {
            setIsRunning((prev) => !prev);
        }
    };

    const handleRestart = () => {
        setTimeLeft(INITIAL_TIME);
        if (isExpired) {
            setIsExpired(false);
            setIsRunning(true);
        } else {
            setIsExpired(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-lg p-4 text-white flex flex-col gap-2 relative">
            <Button
                isIconOnly={true}
                className="absolute top-2 right-2"
                variant="light"
                onClick={onClose}
            >
                <FontAwesomeIcon icon="fa-solid fa-xmark" className='text-white hover:text-gray-200 text-md' />
            </Button>

            <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon="fa-solid fa-clock" className='text-md' />
                <h3 className="text-xl font-medium">Special Deal!</h3>
            </div>
            <p className="font-extralight mb-3">Register now to unlock exclusive offers and discounts</p>
            
            <div className="flex flex-row items-center justify-between gap-4">
                <p className="font-extralight">Offer expires in:</p>
                <p className="text-md font-mono font-bold">
                    {isExpired ? "The timer has expired" : formatTime(timeLeft)}
                </p>
            </div>

            <div className="flex gap-2 mt-2">
                <Button
                    variant="white"
                    size="sm"
                    isDisabled={isExpired}
                    onClick={handleStopResume}
                >
                    {isRunning ? "Stop" : "Resume"}
                </Button>
                <Button
                    variant={isExpired ? "white" : "light"}
                    size="sm"
                    onClick={handleRestart}
                >
                    Restart
                </Button>
            </div>
        </div>
    );
}

export default SpecialDealTimer;