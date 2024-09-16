const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
const cors = require('cors');

const connectDb = require('./config/db');


const app = express();

app.use(express.json());


app.use(cors({
    origin: ["http://localhost:3000","http://localhost:5000"],
    credentials: true
}));



const userRoutes = require('./routes/user.route');

app.use('/api/user', userRoutes);





app.listen(port, ()=>{
    connectDb(); //start connection
    console.log('Server started at port:', port);
})