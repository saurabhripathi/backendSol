const mongoose=require('mongoose')
// const validator=require("validator")
const uschema=mongoose.Schema(
    {
        
        
        
    },{collection:"practice"}

)




const profile=mongoose.model("profile",uschema)
module.exports={
    profile:profile

}

