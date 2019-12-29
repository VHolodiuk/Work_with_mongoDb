const express = require("express");
const router = express.Router();
const User = require("./user")
const Room = require("./room")

router.get("/users", (req, res)=>{
  User.find({})
    .then(user => {
      res.send(user);
    });
});

router.post("/users", (req, res)=>{
  User.create(req.body)
    .then(user => {
      res.send(user);
    });
});

router.put("/users/:id", (req, res)=>{
  User.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      User.findOne({_id: req.params.id})
        .then(user => {
          res.send(user);
        });
    });
});

router.delete("/users/:id", (req, res)=>{
  User.deleteOne({_id: req.params.id})
    .then(user => {
      res.send(user);
    });
});

router.get("/rooms", (req, res)=>{
  Room.find({})
    .then(room => {
      res.send(room);
    });
});

router.post("/rooms", (req, res)=>{
  Room.create(req.body)
    .then(room => {
      res.send(room);
    });
});

router.put("/rooms/:id", (req, res)=>{
  Room.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      Room.findOne({_id: req.params.id})
        .then(room => {
          res.send(room);
        });
    });
});


router.delete("/rooms/:id", (req, res)=>{
  Room.deleteOne({_id: req.params.id})
    .then(room => {
      res.send(room);
    });
});


module.exports = router;
