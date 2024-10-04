// app/api/login/route.js

import User from "@/Models/Users/User";
import { dbConnect } from "@/lib/db";
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

await dbConnect();

// POST method for user login
export async function POST(request) {
    try {
        // Parse the request body
        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        // Return success response with user information (excluding password)
        const { password: _, ...userInfo } = user._doc; // Exclude password from response
        return NextResponse.json({ message: 'Login successful', user: userInfo }, { status: 200 });
    } catch (error) {
        console.error('Error logging in user:', error);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
