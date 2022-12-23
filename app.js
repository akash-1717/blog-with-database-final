//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "Akash Drushti Khazi Yashank";
const aboutContent = "Presenting you the best page for planning your future trips with your favourite people. To add a new item with description, add /compose to the url and hit enter.";
const contactContent = "6363750120 6362282613 8088741011 8088603288";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://akash-1717:khazikhushi@cluster0.z25p2.mongodb.net/tripplannerDB", {useNewUrlParser: true});

const postSchema = {
  title : String,
  content : String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res) {

  const post = new Post({
    title : req.body.postTitle,
    content : req.body.postBody
  });

  post.save(function(err) {
    if(!err) {
      res.redirect("/");
    }
  });

});

app.post("/", function(req, res) {
  res.redirect("/compose");
});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
   res.render("post", {
     title: post.titlehead,
     content: post.content
   });
 });


});

let port = process.env.PORT;
if(port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully");
});
