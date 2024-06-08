"use client";

import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import TrackerLoader from "./loader/tracker-loader";

export default function Tracker() {
  const [data, setData] = useState({ timeSpent: 0, currentStartTime: new Date(), studying: false });
  const [timeSpent, setTimeSpent] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [studying, setStudying] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [loaderOn, setLoaderOn] = useState(true);

  const getData = async () => {
    setLoaderOn(true);
    const res = await fetch("/api/tracker", { cache: "no-store", method: "POST" });
    const newData = await res.json();
    console.log(newData);
    setData(newData);
    setStudying(newData.studying);
    setTimeSpent(newData.timeSpent);
    setStartTime(new Date(newData.currentStartTime));
  };

  useEffect(() => {
    getData();
    setLoaderOn(false);
  }, []);

  // Start the tracker
  const handleStart = async () => {
    setLoaderOn(true);
    const startTime = new Date();
    await fetch("/api/tracker/start", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startTime }),
    });
    getData();
    setLoaderOn(false);
  };

  // Stop the tracker
  const handleStop = async (startTime: Date) => {
    setLoaderOn(true);
    console.log(startTime);
    await fetch("/api/tracker/stop", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startTime }),
    });
    getData();
    setStudying(false);
    setLoaderOn(false);
  };

  const formatTime = (seconds: number) => {
    if (!studying) {
      seconds = data.timeSpent;
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
          setTimeSpent(data.timeSpent + Math.floor((now - start) / 1000));
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

        {studying && (
          <section className=" w-96 mx-auto">
            <DotLottieReact
              src="https://lottie.host/283e2f13-db8c-47d3-9aed-bde3b861c36d/CcYe5Obtkj.json"
              speed={1}
              loop
              autoplay
            />
          </section>
        )}

        <section className="flex flex-col gap-8">
          <div className="flex flex-col text-xl font-bold gap-2 justify-center items-center">
            <p>Time Spent: </p>
            {loaderOn ? <TrackerLoader /> : <p className="text-5xl">{formatTime(timeSpent)}</p>}
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
