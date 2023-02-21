const mongoose=require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/blogApp', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    family:4,
},
(err)=>{
    

    if(err){
        console.log("Connection is ended with error"+err);
    }else{
        console.log("Connection is sucessfull")
    }
})

module.exports=mongoose