// pages/api/signup.js
import Users from "@/Models/Users/User";
import { dbConnect } from "@/db/db";
dbConnect()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      const newUser = new Users({ name, email, password });
      await newUser.save();
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
