import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db'; // Adjust path as necessary
import User from '@/Models/User'; // Adjust path as necessary

// export const config = {
//   api: {
//     bodyParser: false, // Required to handle file uploads
//   },
// };

export async function POST(request, { params }) {
  const { username } = params;

  try {
    // Connect to the database
    await dbConnect();

    // Parse form data
    const formData = await request.formData();
    const imageFile = formData.get('image'); // Ensure 'image' matches the client-side form field name

    if (!imageFile) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimeTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG and PNG are allowed.' },
        { status: 400 }
      );
    }

    // Define upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'background');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique file name
    const uniqueFileName = `${Date.now()}-${imageFile.name}`;
    const newFilePath = path.join(uploadDir, uniqueFileName);

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove old image if it exists
    if (user.backgroundImage) {
      const oldFilePath = path.join(process.cwd(), 'public', user.backgroundImage);
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (err) {
          console.error('Error deleting old image:', err);
        }
      }
    }

    // Save new file
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(newFilePath, buffer);

    // Update user's profile with the new image path
    user.backgroundImage = `/images/background/${uniqueFileName}`;
    await user.save();

    return NextResponse.json({
      message: 'Image uploaded and profile updated successfully',
      backgroundImage: user.backgroundImage,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
