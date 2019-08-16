const mongoose=require('./mongoconnection')
var {profile}= require('./userschema')
const express=require('express')
const app=express()

const router=express.Router()

// const product=new Product


router.get('/prac',async (req,res)=>{

try{
    let  temp=await  profile.aggregate([{$unwind:'$results'},
        {$project:{results:1,less30:{$cond:[{$lt:["$results.dob.age",30]},1,0]},bet30_50:{$cond:[{$and:[{$lt:["$results.dob.age",50]},
        {$gt:["$results.dob.age",30]}]},1,0]},greater50:{$cond:[{$gt:["$results.dob.age",50]},1,0]}}},
        {$group:{_id:{gender:'$results.gender',nat:'$results.nat'},bet30_50:{$sum:"$bet30_50"},less30:{$sum:"$less30"},greater50:{$sum:"$greater50"}}},
        {$project:{bet30_50:1,less30:1,greater50:1,nat:"$_id.nat"}}
    ])

    if(temp){
        for(var x of temp)
        {
           delete x._id.nat
        }
        res.status(200).send(temp)  
    }

    else{

        throw new Error("Data not found")
    }


}catch(e){
res.status(400).send(e.message)

}
  





})


    module.exports=router
