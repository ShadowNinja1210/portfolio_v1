"use client";

import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export type TrackerProps = {
  initialTimeSpent: number;
  handleStart: () => void;
  handleStop: (startTime: Date) => void;
  startTime: Date | null;
  studying: boolean;
};

export default function Tracker({ initialTimeSpent, handleStart, handleStop, startTime, studying }: TrackerProps) {
  const [timeSpent, setTimeSpent] = useState(initialTimeSpent);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    if (!studying) {
      seconds = initialTimeSpent;
    }

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")} : ${mins.toString().padStart(2, "0")} : ${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (studying && startTime) {
      const start = new Date(startTime).getTime();
      setTimer(
        setInterval(() => {
          const now = new Date().getTime();
          setTimeSpent(initialTimeSpent + Math.floor((now - start) / 1000));
        }, 1000)
      );
    } else if (!studying && timer) {
      clearInterval(timer);
      setTimer(null);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [studying, startTime]);

  return (
    <main className="relative bg-black-100 min-h-screen flex justify-start overflow-clip items-center flex-col mx-auto sm:p-10 p-5">
      <div className="max-w-7xl w-full text-center flex flex-col gap-8">
        <section className="flex flex-col">
          <h1 className="text-3xl font-bold">Study Tracker</h1>
          <p className="text-lg">Track your studies and manage your time</p>
        </section>

        <section className=" w-96 mx-auto">
          <DotLottieReact
            src="https://lottie.host/283e2f13-db8c-47d3-9aed-bde3b861c36d/CcYe5Obtkj.json"
            speed={1}
            loop
            autoplay
          />
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col text-xl font-bold gap-2">
            <p>Time Spent: </p>
            <p className="text-5xl">{formatTime(timeSpent)}</p>
          </div>
          <div className="flex justify-center items-center">
            {!studying ? (
              <button
                className="px-4 py-2 bg-green-700 text-2xl font-medium rounded-lg disabled:opacity-40"
                disabled={studying}
                onClick={handleStart}
              >
                Start
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-red-700 text-2xl font-medium rounded-lg"
                disabled={!studying}
                onClick={() => startTime && handleStop(startTime)}
              >
                Stop
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
