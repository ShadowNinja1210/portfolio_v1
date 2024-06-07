import { connectDB } from "@/lib/db";
import { Tracker } from "@/schema/Schema";
import { setDefaultOptions } from "date-fns";
import { format } from "date-fns/format";
import { NextResponse } from "next/server";
import { enIN } from "date-fns/locale";

export async function PATCH() {
  try {
    await connectDB();
    setDefaultOptions({ locale: enIN });
    const today = format(new Date(), "PP");
    const startTime = new Date().toISOString();

    const data = await Tracker.find({ date: today, startTime: null, endTime: null });

    if (data.length === 0) {
      await Tracker.create({ date: today, startTime: startTime, endTime: null });
    } else {
      data.map(async (item) => {
        if (item.startTime === null && item.endTime === null) {
          await Tracker.updateOne({ date: today }, { startTime: startTime });
        }
      });
    }

    return NextResponse.json({ message: "Started" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
