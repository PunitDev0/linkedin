import mongoose from 'mongoose'
const mongoURI = "mongodb://127.0.0.1:27017/linkedin"
const mongoAtlas = "mongodb+srv://punit:punit1234@hotels.1faa9.mongodb.net/linkedin"
export async function dbConnect(){
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/linkedin")
          
          const db = mongoose.connection
          
          db.on('error', (error) => console.error(error))
          
          db.on('connected',()=>{
              console.log('Connected to MongoDB')
          })
    }catch(error){
        console.error(error)
        process.exit(1)
    }
}