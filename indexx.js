const express = require("express");
const mongoose = require("mongoose");
  
const ejs = require('ejs');

// connect avec BD par  const Article
const Article = require("./models/article");


// app = istid3a2 express 
const app = express()

mongoose.connect("mongodb+srv://asmaredjouh6:maria2019@cluster0.cl3cfe0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

//connect return promes alors:
   .then(function(){
       console.log("connected successfully"); 

   }).catch(function(error){
       console.log("error with connectiing with the DB", error);
   })








///////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.json())

app.get("/hello", function(req, res){
   // send response
   res.send("hello in node js project");
})
///////////////////////////////////////////////////////////////////////////////////////////////////////


app.get("/numbers", (req, res) => {
	let numbers = "";
	for (let i = 0; i <= 100; i++) {
		numbers += i + " - ";
	}

      //res.sendFile(__dirname + "/views/num.html");
      //res.render("num.ejs");
      res.render("numbers.ejs", {
         name: "Asma",
         numbers: numbers,
      });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
                            /*PATH*/
 app.get("/findSummation/:number1/:number2", function(req, res){
        const num1 = req.params.number1;
        const num2 = req.params.number2;

        const total = Number(num1) + Number(num2);
        res.send(`the total is: ${total}`);
 })
/////////////////////////////////////////////////////////////////////////////////////////////////////
                             /*BODY*/    /*QUERY*/
 app.get("/sayHello", function(req, res){
      console.log(req.body)
      console.log(req.query)  /*QUERY*/
    res.send(`Hello: ${req.body.name}, Age is : ${req.query.age}`);
})
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/addComment", function(req, res){
    res.send("post request on add comment");
 })
/////////////////////////////////////////////////////////////////////////////////////////////////////

 app.delete("/testinDelete", function(req, res){
    res.send("visiting delete request");
 })

// ===================== ARTICLES ENDPOINTS ==========================================================
app.post("/articles", async (req, res) => {
	const newArticle = new Article();

         const artTitle = req.body.ArticleTitle;
         const artBody = req.body.ArticleBody;

         newArticle.title = artTitle;
	      newArticle.body = artBody;
	      newArticle.numberOfLikes = 0;
   
   //save 
	await newArticle.save(); // att hatan yakmal save ba3dha dir ==> res.json(newArticle);

	res.json(newArticle);
});
//save return promese  ndiro then or async/await

//===================get("/articles"==================================================================================//

app.get("/articles", async (req, res) => {

	const articles = await Article.find();  //find tjib articles kol
	console.log("the articles are", articles);

	res.json(articles);
});

//========================finf by Id==========================================================================//
/*== localhost:3000/articles/663f34c28886505fa3fd6aa6  ==*/

app.get("/articles/:articleId", async (req, res) => {
	const id = req.params.articleId;

	try {
		const article = await Article.findById(id);
		res.json(article);
		return;

	} catch (error) {
		console.log("error while reading article of id ", id);
		return res.send("error");
	}
});

//=========== delete article =================================================================================//
/*== localhost:3000/articles/663f34c28886505fa3fd6aa6  ==*/

app.delete("/articles/:articleId", async (req, res) => {
	const id = req.params.articleId;

	try {
		const article = await Article.findByIdAndDelete(id);
		res.json(article);
		return;

	} catch (error) {
		console.log("error while reading article of id ", id);
		return res.json(error);
	}
});

//================ get("/showArticles ========================================================================/
//find all article

app.get("/showArticles", async (req, res) => {
	const articles = await Article.find();

	res.render("articles.ejs", {
		allArticles: articles,
	});
});

//===================PORT=============================================================================//
//port listan request of user
app.listen(3000, function(){
    console.log("I am listening in port 3000");
})

