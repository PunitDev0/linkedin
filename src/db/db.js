import mongoose from 'mongoose'

export async function dbConnect(){
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/linkedin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
          })
          
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