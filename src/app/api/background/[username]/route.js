import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import User from '@/Models/User';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request, { params }) {
  const { username } = params;

  try {
    // Connect to the database
    await dbConnect();

    // Parse form data
    const formData = await request.formData();
    const imageFile = formData.get('image');

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

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove old image from Cloudinary if it exists
    if (user.backgroundImage) {
      const oldPublicId = extractPublicId(user.backgroundImage);
      if (oldPublicId) {
        try {
          await cloudinary.v2.uploader.destroy(oldPublicId);
        } catch (error) {
          console.error('Failed to delete old image from Cloudinary:', error);
        }
      }
    }

    // Upload the new image to Cloudinary
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: 'user_backgrounds', // Organize uploads in a folder
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error('Cloudinary upload failed'));
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    // Update user with the new image URL
    user.backgroundImage = uploadResult.secure_url;
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

// Helper function to extract the public ID from a Cloudinary URL
function extractPublicId(url) {
  try {
    const parts = url.split('/');
    const fileWithExtension = parts.pop(); // Extract the last part of the URL
    const publicId = fileWithExtension.split('.')[0]; // Remove the file extension
    return `${parts.join('/')}/${publicId}`.split('user_backgrounds/')[1];
  } catch (error) {
    console.error('Error extracting public ID from URL:', error);
    return null;
  }
}
