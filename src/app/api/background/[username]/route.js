// /app/api/background/[username]/route.js
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db'; // Adjust path as necessary
import User from '@/Models/User'; // Adjust path as necessary

export async function POST(request, { params }) {
  const { username } = params;
  
  await dbConnect(); // Connect to the database

  try {
    // Parse the incoming form data
    const formData = await request.formData();
    const imageFile = formData.get('image'); // 'image' should be the name of the field used in the FormData object on the client-side

    if (!imageFile || !imageFile.name) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Define the save location for the uploaded file
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'background');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate a unique filename for the new image
    const uniqueFileName = `${Date.now()}-${imageFile.name}`;
    const newFilePath = path.join(uploadDir, uniqueFileName);

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If user already has a background image, delete the old image
    if (user.backgroundImage) {
      const oldFilePath = path.join(process.cwd(), 'public', user.backgroundImage);
      try {
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Delete old image file
        }
      } catch (error) {
        console.error('Error deleting old image:', error);
        return NextResponse.json({ error: 'Failed to delete old image' }, { status: 500 });
      }
    }

    // Convert the Blob to a Buffer and save the new file to the filesystem
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(newFilePath, buffer);

    // Update the user's profile with the new image path
    user.backgroundImage = `/images/background/${uniqueFileName}`; // Save relative path for easy frontend access
    await user.save();

    return NextResponse.json({
      message: 'Image uploaded and user profile updated successfully',
      backgroundImage: user.backgroundImage,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
