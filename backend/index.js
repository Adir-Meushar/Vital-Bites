const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk'); 
const loggerMiddleware = require('./handlers/helpers/logger');
const port = process.env.PORT || 5000;

dotenv.config();
 
const app=express();   

app.use(express.json());  
 
app.use(cors({  
    origin: true,  
    credentials: true,  
    methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH', 
    allowedHeaders: 'Content-Type, Accept, Authorization',
})); 

async function main(){ 
    try {
        const remoteUrl = process.env.REMOTE_URL;
        if (!remoteUrl) {
            throw new Error ('REMOTE_URL environment variable not set');
        }
        await mongoose.connect(remoteUrl, { 
            serverSelectionTimeoutMS: 30000, // 30 seconds 
        });
        console.log(chalk.blue('Connection Established')); 
    } catch (err) {
        console.error(chalk.red('Failed to connect to MongoDB'), err); 
    }
} 
main(); 

app.listen(port,()=>{ 
    console.log(chalk.blue((`Listening to port ${port}`))); 
});  

app.use(loggerMiddleware);


require('./handlers/authentication/signup')(app);
require('./handlers/authentication/login')(app);
require('./handlers/recipe/recipe')(app);
require('./handlers/user/user')(app);
require('./handlers/initialData/initialDataService');


