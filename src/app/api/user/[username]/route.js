  import { NextResponse } from "next/server";
  import { dbConnect } from "@/lib/db";

  import User from "@/Models/User";

  await dbConnect();

  export async function GET(req, {params}){
      const { username } = params;
      
      try{
          const user = await User.findOne({username:username})

          if (!user) {
              return NextResponse.json({ message: 'User not found' }, { status: 404 });
          }
          return NextResponse.json(user);
      }catch(err){
          console.error("Error fetching user data:", err);
          return NextResponse.json({ message: 'Internal server error' }, { status: 500 });

      }
  }

  

  export async function POST(req, { params }) {
    const { username } = params; // Get username from URL parameters
    console.log("post" + username);
    
    try {
      // Connect to the database
      await dbConnect();
  
      // Parse the request body to get the updated profile data
      const profileData = await req.json();
      
      console.log('Profile Data to Update:', profileData);
      console.log('Profile Data to Update:', profileData.experience);
  
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
  
      if (profileData.experience) {
        // Ensure user.experience is initialized as an array if it doesn't exist
        user.experience = [...(user.experience || []), profileData.experience];
      }
      if (profileData.education) {
        // Ensure user.experience is initialized as an array if it doesn't exist
        user.education = [...(user.education || []), profileData.education];
      }
  
      // Check if there is any data to update (to prevent unnecessary updates)
      if (Object.keys(profileData).length === 0) {
        return NextResponse.json({ message: 'No data provided for update' }, { status: 400 });
      }
  
      // Update the user with the fields provided in the request
      const updatedUser = await User.findOneAndUpdate(
        { username },               // Find user by username
        { ...profileData,
           experience: user.experience,
           education: user.education
          },  // Update the fields in profileData
        { new: true }                   // Return the updated document
      );
  
      if (!updatedUser) {
        return NextResponse.json({ message: 'Failed to update profile' }, { status: 400 });
      }
  
      // Return success response with updated user data
      return NextResponse.json({
        message: 'Profile updated successfully',
        updatedUser,
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }