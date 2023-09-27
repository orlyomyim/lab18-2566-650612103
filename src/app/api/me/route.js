import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "yinpiao wongtrakunme",
    studentId: "650612103",
  });
};
