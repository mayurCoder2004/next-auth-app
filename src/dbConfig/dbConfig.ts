import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDb is running. ' + err);
            process.exit();
        })
    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
    }
}