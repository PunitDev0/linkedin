import User from "@/Models/User";
import { dbConnect } from "@/lib/db";
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect(); // Moved inside the function to ensure it's called each time a POST request is made

    const data = await request.json();
    const { email, password, username } = data;

    if (!email || !password || !username) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Clean up null fields and drop indexes as intended
    await User.updateMany({ googleId: null }, { $unset: { googleId: "" } });
    await User.updateMany({ twitterId: null }, { $unset: { twitterId: "" } });
    await User.updateMany({ githubId: null }, { $unset: { githubId: "" } });

    await User.collection.dropIndexes();

    await User.createIndexes([
      { key: { googleId: 1 }, unique: true, sparse: true },
      { key: { twitterId: 1 }, unique: true, sparse: true },
      { key: { githubId: 1 }, unique: true, sparse: true }
    ]);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email is already registered' }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);

    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyPattern)[0];
      return NextResponse.json({ error: `${duplicatedField} already exists` }, { status: 409 });
    }

    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
