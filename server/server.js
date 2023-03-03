
const apiRoutes = require('./Routes/ApiRoutes');
const express = require('express');
const connectDb = require('./config/db');

const app = express();
const PORT = 3001;
app.use(express.json());
app.use((req, res, next) => {
    connectDb();
    next();
});
app.use('/api', apiRoutes)
app.use((error, req, res, next) => {
    console.log(error);
    next(error);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})