import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/Models/User";

await dbConnect();

export async function GET(req,{params}){
    const { username } = params;
    console.log(username);
    
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