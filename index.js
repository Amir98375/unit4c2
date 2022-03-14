const express = require("express")
const app =express()
app.use(express.json())
const mongoose = require("mongoose")
const { stringify } = require("nodemon/lib/utils")

const connect = ()=>mongoose.connect(
"mongodb+srv://web15:web15@cluster0.zieim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
)


//userSchema

const userSchema= new mongoose.Schema({

    first_name:{type:String,required:true},
    middle_name:{type:String,required:true},
    last_name:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    branchId:{type:mongoose.Schema.Types.ObjectId,ref:"branches",required:false}
   

},
{
    timestamps:true,
    versionKey:false

}
)


//usermodel

const User = new mongoose.model("user",userSchema)
//branchmodel
const branchSchema= new mongoose.Schema({

    name:{type:String,required:true},
    address:{type:String,required:true},
    IFSC:{type:String,required:true},
    MICR:{type:Number,required:true},
   
   

},
{
    timestamps:true,
    versionKey:false

}
)

const Branch= new mongoose.model("branches",branchSchema)

//saving schema
const savingSchema= new mongoose.Schema({

    account_number:{type:Number,required:true},
    balance:{type:Number,required:true},
    intrest_rate:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:false}
   
   
   

},
{
    timestamps:true,
    versionKey:false

}
)

const Saving= new mongoose.model("savings",savingSchema)

//masteracconutschema

const masterSchema= new mongoose.Schema({

    account_number:{type:Number,required:true},
    balance:{type:Number,required:true},
    intrest_rate:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:false}
   
   
   

},
{
    timestamps:true,
    versionKey:false

}
)

const Master= new mongoose.model("masters",masterSchema)

//controler master account
app.get("/masters",async(req,res)=>{
    const master = await Master.find().lean().exec()
    return res.status(200).send(master)
})

app.post("/msaters",async(req,res)=>{
    const master = await Master.create(req.body)
    return res.status(200).send(master)
})

app.delete("/masters/:id",async(req,res)=>{
    const master =  await Master.findByIdAndDelete(req.params.id)
    return res.status(200).send(master)
})



//controllers saving
app.get("/savings",async(req,res)=>{
    const saving = await Saving.find().lean().exec()
    return res.status(200).send(saving)
})

app.post("/savings",async(req,res)=>{
    const saving = await Saving.create(req.body)
    return res.status(200).send(saving)
})

app.delete("/savings/:id",async(req,res)=>{
    const saving =  await Saving.findByIdAndDelete(req.params.id)
    return res.status(200).send(saving)
})

//controller branches

app.get("/branches",async(req,res)=>{
    const branch = await Branch.find().lean().exec()
    return res.status(200).send(branch)
})

app.post("/branches",async(req,res)=>{
    const branch = await Branch.create(req.body)
    return res.status(200).send(branch)
})

app.delete("/branches/:id",async(req,res)=>{
    const branch =  await Branch.findByIdAndDelete(req.params.id)
    return res.status(200).send(branch)
})

//controller user

app.get("/users",async(req,res)=>{
    const user = await User.find().lean().exec()
    return res.status(200).send(user)
})

app.post("/users",async(req,res)=>{
    const user = await User.create(req.body)
    return res.status(200).send(user)
})

app.delete("/users/:id",async(req,res)=>{
    const user =  await User.findByIdAndDelete(req.params.id)
    return res.status(200).send(user)
})



app.listen(5000,()=>{
    connect()
    console.log("listen on port 5000")
})