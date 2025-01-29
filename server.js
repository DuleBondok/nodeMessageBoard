const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));  

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
    }
];

app.get("/", (req,res) => {
    res.render("index", {title: "Mini Messageboard", messages: messages});
})

app.get("/new", (req,res) => {
    res.render("form")
})

app.post("/new", (req,res) => {
    const {authorName, messageText} = req.body;

    if(authorName && messageText) {
        messages.push({text: messageText, user: authorName, added: new Date()});
    }

    res.redirect("/");
})

app.listen(3000);