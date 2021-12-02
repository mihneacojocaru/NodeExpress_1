import data from "./data.js";

import express, { application } from "express";

import cors from    'cors';


let app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:false}));



let d=data();

app.get('/',(req,res)=>{

     res.json(d);

});


app.post('/',(req,res)=>{
    let user=req.body;
    d.push(user);

    res.json("Am reusit");
});

app.delete('/:id',(req,res)=>{


     let {id}=req.params;

     d=d.filter(e=>e.id!=id);

     res.json("ok");
});

app.put('/',(req,res)=>{

    let user=req.body;
    
    for(let i=0;i<d.length;i++){

        if(d[i].id==user.id){

            d[i]=user;
          
        }
    }

    res.json(d);
});

app.listen(3000,()=>{

    console.log('App listenining on port 3000');

});






