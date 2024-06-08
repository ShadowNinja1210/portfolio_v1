import { connectDB } from "@/lib/db";
import { Tracker } from "@/schema/Schema";
import { setDefaultOptions } from "date-fns";
import { format } from "date-fns/format";
import { NextResponse } from "next/server";
import { enIN } from "date-fns/locale";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    setDefaultOptions({ locale: enIN });
    const today = format(new Date(), "PP");
    const body = await req.json();
    const startTime = body.startTime;
    console.log(startTime);

    const data = await Tracker.find({ date: today, startTime: null, endTime: null });

    if (data.length === 0) {
      await Tracker.create({ date: today, startTime: startTime, endTime: null });
    } else {
      await Promise.all(
        data.map(async (item) => {
          if (item.startTime === null && item.endTime === null) {
            await Tracker.updateOne({ _id: item._id }, { startTime: startTime });
          }
        })
      );
    }
    return NextResponse.json({ message: "Started" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
