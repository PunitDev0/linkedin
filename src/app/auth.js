import { Label } from "@radix-ui/react-label"
import NextAuth, { CredentialsSignin } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import User from "@/Models/Users/User"
import { dbConnect } from "@/lib/db"
import bcryptjs from "bcryptjs"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
        name:"Credentials",
        credentials:{
            email:{Label:"email", type:"email"},
            password:{Label:"password", type:"password"}
        },
        authorize: async (credentials)=>{
            const email = credentials.email;
            const password = credentials.password;
            if(!email || !password){
                throw new CredentialsSignin("Pls Provide Email or Password")
            }
            await dbConnect()
            //... your database logic here to validate credentials
             const user  = await User.findOne({email})
             console.log("user login");
             if(!user) throw new CredentialsSignin(" User Not Found")
                const isMatch = await bcryptjs.compare(password, user.password)
             if(!isMatch) throw new CredentialsSignin(" User Not Found")
                if(user){
                    
                }
            return user
        }
    })
  ],
  pages:{
    signIn:'/login'
  }
})