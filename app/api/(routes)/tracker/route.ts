import { connectDB } from "@/lib/db";
import { ITrackerSchema, Tracker } from "@/schema/Schema";
import { differenceInSeconds, setDefaultOptions } from "date-fns";
import { format } from "date-fns/format";
import { NextResponse } from "next/server";
import { enIN } from "date-fns/locale";

export async function GET() {
  try {
    await connectDB();
    setDefaultOptions({ locale: enIN });
    const today = format(new Date(), "PP");
    let timeSpent = 0; // in seconds
    let studying = false;
    let currentStartTime = null;

    const data = await Tracker.find({ date: today });

    if (data.length === 0) {
      Tracker.create({ date: today, startTime: null, endTime: null });
    } else {
      await Promise.all(
        data.map(async (item: ITrackerSchema) => {
          if (item.startTime !== null && item.endTime !== null) {
            if (item.startTime && item.endTime) {
              // Just to check if even one of them is undefined for the sake of TypeScript
              timeSpent += differenceInSeconds(item.endTime, item.startTime);
            }
          } else if (item.startTime !== null && item.endTime === null) {
            studying = true;
            currentStartTime = item.startTime;
          }
        })
      );
    }

    return NextResponse.json({ timeSpent, currentStartTime, studying }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
