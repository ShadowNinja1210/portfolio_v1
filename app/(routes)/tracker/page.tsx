"use client";

import Tracker from "@/components/tracker";
import { useEffect, useState } from "react";

export default function TrackerPage() {
  const [data, setData] = useState({
    timeSpent: 0,
    currentStartTime: new Date(),
    studying: false,
  });

  // Fetch data from the API
  const getData = async () => {
    const res = await fetch("/api/tracker", { cache: "no-store" });
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const fetchedData = await getData();
    setData(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Tracker data={data} getData={() => getData()} />;
}
