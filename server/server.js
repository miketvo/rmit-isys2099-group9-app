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
app.use(cors());
 
apiRouter.use(cookieParser());
 
app.use('/apiRouter',apiRouter)
    
app.listen(PORT, ()=>{
    console.log(`server is listening  on ${PORT}`);
});
    
module.exports = app;