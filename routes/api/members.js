const express = require('express')
const uuid = require('uuid')
const router = express.Router();
const members =  require("../../members")


//Create member
router.post("/", (req, res) => {
    console.log("post")
    const newMember ={
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: "Please include a name and email"})
    }
    members.push(newMember);
    res.send(members);
    //res.redirect("/");
})
//Get all members
// "/api/members => /
router.get("/", (req,res) => {
    console.log("get")
    res.json(members);
})

//Get single member
//app.get => router.get (moved from index.js)
router.get("/:id", (req, res) => {    
    const found = members.some(x => x.id === parseInt(req.params.id))
    
    if (found) res.json(members.filter(x => x.id === parseInt(req.params.id)))
    else {
        res.status(400).json({msg: "Member not found"})
    }
})



//Update member
router.put("/:id", (req, res) => {    
    const found = members.some(x => x.id === parseInt(req.params.id))
    
    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({msg: "Member updated", member});  
            }
        })
    } 
    else {
        res.status(400).json({msg: "Member not found"})
    }
})
//Detele member
router.delete('/:id', (req,res) => {
    const found = members.some(x => x.id === parseInt(req.params.id))
    
    if (found) {
        res.json({msg: "member deleted", members : members.filter(x => x.id !== parseInt(req.params.id))});
    } 
    else {
        res.status(400).json({msg: "Member not found"})
    }

})
module.exports = router;