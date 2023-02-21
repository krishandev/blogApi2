const express=require('express');
const req=require('express/lib/request');
const router=express.Router();

const mongoType=require('mongoose').Types;

const Post=require('../BlogAPI/Models/Post.js');

//Routes defines here

//get all data from this api

router.get('/', (req, res)=>{
    Post.find((err, doc)=>{
        if(err){
            console.log("Error occures while fetching Data"+err);
            res.status(400).send('Internal Error', err);
        }else{
            res.send(doc);
        }
    })
})

//create new Post

router.post('/', (req, res)=>{
    let post=new Post({
        title:req.body.title,
        content:req.body.content,
        username:req.body.username
    })
    post.save((err, doc)=>{
        if(err){
            console.log("Internal Error:"+err);
            res.status(400).send("Internal Error:"+err)
        }else{
            res.send(doc);
        }
    })
})

//API for get post by id
router.get('/:id', (req, res)=>{
    if(mongoType.ObjectId.isValid(req.params.id)){
        Post.findById(req.params.id, (err, doc)=>{
            if(err){
                console.log("Internal Error:"+err);
                res.status(400).send("Internal Error:"+err);
            }else{
                res.send(doc);
            }
        })
    }else{
        res.status(400).send("No Record found by this id:", id)
    }
} )


//API for Delete post by id
router.delete('/:id', (req, res)=>{
    if(mongoType.ObjectId.isValid(req.params.id)){
        Post.findByIdAndRemove(req.params.id, (err, doc)=>{
            if(err){
                console.log("Internal Error:"+err);
                res.status(400).send("Internal Error:"+err);
            }else{
                res.send(doc);
            }
        })
    }else{
        res.status(400).send("No Record found by this id:", id)
    }
} )

//API for Update post by id
router.put('/:id', (req, res)=>{
    {
        let post={
            title:req.body.title,
        content:req.body.content,
        username:req.body.username
        }
    }
    if(mongoType.ObjectId.isValid(req.params.id)){
        Post.findByIdAndUpdate(req.params.id, {$set:post},{new:true}, (err, doc)=>{
            if(err){
                console.log("Internal Error:"+err);
                res.status(400).send("Internal Error:"+err);
            }else{
                res.send(doc);
            }
        })
    }else{
        res.status(400).send("No Record found by this id:", id)
    }
} )

module.exports=router;