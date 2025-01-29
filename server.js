const express = require('express');
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));  

const messagesFilePath = "./messages.json";

if(!fs.existsSync(messagesFilePath)) {
    fs.writeFileSync(messagesFilePath, JSON.stringify([]));
}

let messages = JSON.parse(fs.readFileSync(messagesFilePath, "utf-8"));

app.get("/", (req,res) => {
    res.render("index", {title: "Mini Messageboard", messages});
})

app.get("/new", (req,res) => {
    res.render("form");
})

app.post("/new", (req,res) => {
    const {authorName, messageText} = req.body;

    if(authorName && messageText) {
        const newMessage = {text: messageText, user: authorName, added: new Date()};
        messages.unshift(newMessage);
        fs.writeFileSync(messagesFilePath, JSON.stringify(messages,null, 2), "utf-8");
    }

    res.redirect("/");
})

app.listen(3000);