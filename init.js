//initialise database
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
main()
    .then(() => {
    console.log("Connection Successful");
    })
    .catch((err) => {console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
};

let allChats = [{
    from : "neha",
    to : "priya",
    msg : "send me your exam sheets",
    created_at : new Date(),
},
{
    from : "rohit",
    to : "mohit",
    msg : "hello",
    created_at : new Date(),
},
{
    from : "amit",
    to : "sumit",
    msg : "where are you?",
    created_at : new Date(),
},
{
    from : "aditya",
    to : "jiya",
    msg : "how are you doing",
    created_at : new Date(),
},
{
    from : "babbar",
    to : "striver",
    msg : "whatsup bro?",
    created_at : new Date(),
},
{
    from : "love",
    to : "bruce",
    msg : "ping me back when u get this",
    created_at : new Date(),
}
]
Chat.insertMany(allChats);