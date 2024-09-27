// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// // Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password"
// import { dbConnect } from "@/db/db"
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         let user = null
//         await dbConnect()
//         try{

//             const user = await UsersModel.findOne({
//                 $or:[
//                     {email:credentials.email},
//                     {password:credentials.password}
//                 ]
//             })
//             if (!user) {
//               // No user found, so this is their first attempt to login
//               // meaning this is also the place you could do registration
//               throw new Error("User not found.")
//             }

//         }catch(errr){

//         }
 
 
//         // return user object with their profile data
//         return user
//       },
//     }),
//   ],
// })