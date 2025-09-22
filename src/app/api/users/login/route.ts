import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        await connect();

        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        // Check if user exists
        const user = await User.findOne({email});

        if (!user) {
            return NextResponse.json({error: "User does not exists"}, {status: 400})
        }

        // Check if password exists
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error: "Invalid Password"}, {status: 400})
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: "Login successfully",
            success: true,
        })
        response.cookies.set("token", token, {httpOnly: true})
        return response;

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 500})
        }
        return NextResponse.json({error: 'Unknown error'}, {status: 500})
    }
}