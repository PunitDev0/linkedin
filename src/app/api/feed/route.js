// pages/api/user.js
console.log("hello duniya madarchod");

import { NextResponse } from 'next/server';
import { auth } from '@/app/auth'; // Import your NextAuth configuration
import { dbConnect } from '@/lib/db'; // Assume you have a DB connection utility
import User from '@/Models/User';
export async function GET(req, res){
    const session = await auth()
    console.log(session)    
    await dbConnect(); // Your MongoDB connection
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const userEmail = session.user.email; // Assuming you store email in the session

    // Fetch user-specific data from the database
    const userInfo = await User.findOne({ email: userEmail });

    if (!userInfo) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Send user data in the response
    return NextResponse.json(
      { message: 'User registered successfully', userInfo},
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
