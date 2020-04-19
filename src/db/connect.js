import { config } from 'dotenv';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const settings = config();

const connectToDb = async () => {
    try{
        await mongoose.connect(settings.parsed.MONGO_URL, 
            { 
                auth: { "authSource": "admin" },
                user: "admin",
                pass: "admin",
                useUnifiedTopology: true, 
                useNewUrlParser: true,
                useFindAndModify: false
            });
    }catch(err) {
        console.log(err);
    }
}

export default connectToDb;