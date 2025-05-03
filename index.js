const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));//to parse data coming from req.body
app.use(methodOverride("_method"));

main()
    .then(() => {
    console.log("Connection Successful");
    })
    .catch((err) => {console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
};


//Index Route
app.get(("/chats"), async (req,res) => {
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
})
//new chat route
app.get(("/chats/new"), (req,res) => {
    res.render("newchat.ejs");
})
//create that newly enterd chat
app.post("/chats", (req,res) => {
    let{from, to, msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    //saving chat in db
    newChat.save()
        .then((res) => {console.log("chat saved");})
        .catch((err) =>{console.log(err);})
    
    res.redirect("/chats");
})
//edit route
app.get(("/chats/:id/edit"), async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
//UPDATE ROUTE
app.patch(("/chats/:id"), async (req,res) => {
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg : newMsg},{runValidators: true, new: true});
    console.log(updatedChat);
    res.redirect("/chats");
})
//Destroy route
app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let delchat = await Chat.findByIdAndDelete(id);
    console.log("chat deleted");
    res.redirect("/chats");
})
app.get("/", (req,res) => {
    res.send("working");
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});