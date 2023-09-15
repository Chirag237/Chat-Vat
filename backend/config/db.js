const mongoose = require('mongoose');
require('dotenv').config()
const connectDB = async () => {
    try {
        console.log("trying new connection")
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify:true,
        });

        console.log(`MongoDB Conn: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};
module.exports = connectDB;