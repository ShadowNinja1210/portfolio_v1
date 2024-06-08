import { connectDB } from "@/lib/db";
import { Tracker } from "@/schema/Schema";
import { setDefaultOptions } from "date-fns";
import { format } from "date-fns/format";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { enIN } from "date-fns/locale";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    setDefaultOptions({ locale: enIN });
    const today = format(new Date(), "PP");
    const body = await req.json();
    const startTime = body.startTime;

    const endTime = new Date().toISOString();
    console.log(startTime, endTime);

    const data = await Tracker.find({ date: today, startTime: new Date(startTime), endTime: null });

    if (data.length === 0) {
      return NextResponse.json({ message: "No ongoing study session found" }, { status: 404 });
    } else {
      await Tracker.updateOne({ date: today, startTime: new Date(startTime), endTime: null }, { endTime: endTime });
      return NextResponse.json({ message: "Stopped", data: data }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}
