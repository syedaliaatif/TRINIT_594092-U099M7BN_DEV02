
const apiRoutes = require('./Routes/ApiRoutes');
const express = require('express');
const connectDb = require('./config/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3003;


app.use(express.json());

app.use((req, res, next) => {
    console.log("Breakpoint");
    connectDb();
    next();
});
app.use(cookieParser());
app.use('/api', apiRoutes)
app.use((error, req, res, next) => {
    console.log(error);
    next(error);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})