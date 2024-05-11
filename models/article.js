//nabni lmodel
const mongoose = require("mongoose");

//njib Schema min mongoose
const Schema = mongoose.Schema;

//Schema == class nkharjo minha object= new Schema
const articleSchema = new Schema({
    //fild
	title: String,
	body: String,
	numberOfLikes: Number,
});

//difini lmodel
const Article = mongoose.model("Article", articleSchema);

//export=sadarto
module.exports = Article;