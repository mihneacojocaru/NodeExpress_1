import data from "./data.js";

import express, { application } from "express";

import cors from    'cors';


let app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:false}));



app.get('/',(req,res)=>{

     res.json(data());

});


app.listen(3000,()=>{

    console.log('App listenining on port 3000');

})






