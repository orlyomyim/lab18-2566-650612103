import { DB } from "@/app/libs/DB";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export const GET = async (request) => {
  const rawAuthHeader = headers().get("authorization");
  const token = rawAuthHeader.split(" ")[1];
  let studentId = null;
  //preparing "role" variable for reading role information from token
  let role = null;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    studentId = payload.studentId;

    //read role information from "payload" here (just one line code!)
    role = payload.role;
  } catch {
    return NextResponse.json(
      {
	@@ -29,10 +29,12 @@ export const GET = async (request) => {
  }

  //Check role here. If user is "ADMIN" show all of the enrollments instead
  if (role === "ADMIN") {
    return NextResponse.json({
      ok: true,
      enrollments: DB.enrollments, //replace null with enrollment data!
    });
  }

  const courseNoList = [];
  for (const enroll of DB.enrollments) {
	@@ -58,7 +60,7 @@ export const POST = async (request) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    studentId = payload.studentId;
    //read role information from "payload" here (just one line code!)
    role = payload.role;
  } catch {
    return NextResponse.json(
      {
	@@ -70,13 +72,15 @@ export const POST = async (request) => {
  }

  //if role is "ADMIN", send the following response
  if (role === "ADMIN") {
    return NextResponse.json(
      {
        ok: true,
        message: "Only Student can access this API route",
      },
      { status: 403 }
    );
  }

  //read body request
  const body = await request.json();
	@@ -128,18 +132,37 @@ export const POST = async (request) => {

export const DELETE = async (request) => {
  //check token
  const rawAuthHeader = headers().get("authorization");
  const token = rawAuthHeader.split(" ")[1];
  //verify token and get "studentId" and "role" information here
  let studentId = null;
  let role = null;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    studentId = payload.studentId;
    //read role information from "payload" here (just one line code!)
    role = payload.role;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  //if role is "ADMIN", send the following response
  if (role === "ADMIN") {
    return NextResponse.json(
      {
        ok: true,
        message: "Only Student can access this API route",
      },
      { status: 403 }
    );
  }

  //get courseNo from body and validate it
  const body = await request.json();