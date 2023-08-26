require("dotenv").config();
const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
 
const apiRouter = require('./apiRouter');
    
const app = express();
    
// eslint-disable-next-line no-undef
const PORT= process.env.PORT;

app.use(bodyParser.json());
app.use(cors({
    origin: `http://localhost:${PORT}`,
    credentials: true
}));
 
apiRouter.use(cookieParser());
 
app.use('/apiRouter', apiRouter);

app.get("/", (req, res) => {
    return res.json("Server is running");
});
    
app.listen(PORT, ()=>{
    console.log(`Server is listening  on ${PORT}`);
});
    
module.exports = app;