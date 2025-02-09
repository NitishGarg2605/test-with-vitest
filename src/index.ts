import express from "express";
import {prismaclient} from "./db";
export const app = express();
app.use(express.json());

app.post("/sum",  async(req:any, res:any)=> {
    const a=req.body.a;
    const b=req.body.b;
    if(a>100000|| b>100000){
        return res.status(400).json({
        message:"Numbers should be less than or equal to 100000"
    });
    }
   const request= await prismaclient.request.create({
        data:{
            a:a,
            b:b,
            answer:a+b,
            type:"sum"
        }
    })

    const result=a+b;
    
    res.json({sum:result,id:request.id});

})

app.post("/multiply", function (req, res) {
    const a=req.body.a;
    const b=req.body.b;
    const result=a*b;
    res.json({product:result});
});