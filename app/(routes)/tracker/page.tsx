"use client";

import Tracker from "@/components/tracker";
import { useEffect, useState } from "react";

export default function TrackerPage() {
  const [timeSpent, setTimeSpent] = useState(0);
  const [studying, setStudying] = useState(false);
  const [startTime, setStartTime] = useState(new Date());

  // Fetch data from the API
  const getData = async () => {
    const res = await fetch("/api/tracker");
    const data = await res.json();
    console.log(data);
    setTimeSpent(data.timeSpent);
    setStudying(data.studying);
    setStartTime(data.currentStartTime);
  };

  useEffect(() => {
    getData();
  }, []);

  // Start the tracker
  const handleStart = async () => {
    await fetch("/api/tracker/start", {
      method: "PATCH",
    });
    getData();
  };

  // Stop the tracker
  const handleStop = async (startTime: Date) => {
    await fetch("/api/tracker/stop", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startTime }),
    });
    getData();
  };

  return (
    <Tracker
      initialTimeSpent={timeSpent}
      handleStart={handleStart}
      handleStop={handleStop}
      startTime={startTime}
      studying={studying}
    />
  );
}
