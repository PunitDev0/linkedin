// app/api/register/route.js

import User from "@/Models/Users/User";
import { dbConnect } from "@/lib/db";
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

await dbConnect();

export async function POST(request) {
    try {
        // Parse the request data
        const data = await request.json();
        const { email, password, username } = data;

        if (!email || !password || !username) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Clean up any existing null values for googleId, twitterId, and githubId
        await User.updateMany({ googleId: null }, { $unset: { googleId: "" } });
        await User.updateMany({ twitterId: null }, { $unset: { twitterId: "" } });
        await User.updateMany({ githubId: null }, { $unset: { githubId: "" } });

        // Drop existing indexes to avoid duplication errors
        await User.collection.dropIndexes();

        // Create new sparse indexes
        await User.createIndexes([
            { key: { googleId: 1 }, unique: true, sparse: true },
            { key: { twitterId: 1 }, unique: true, sparse: true },
            { key: { githubId: 1 }, unique: true, sparse: true }
        ]);

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'Email is already registered' }, { status: 409 });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance with hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        // Return a success response
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error registering user:', error);

        // Handle duplicate key error for unique fields (e.g., googleId, email)
        if (error.code === 11000) {
            const duplicatedField = Object.keys(error.keyPattern)[0];
            return NextResponse.json({ error: `${duplicatedField} already exists` }, { status: 409 });
        }

        // General server error
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}
