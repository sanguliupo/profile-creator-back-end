const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    database: 'database'
  }
});

db.select('*').from('profiles').then(data =>{
	console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res)=>{

	const {description, name} = req.body;
	db('profiles')
	  .returning('*')
	  .insert({
		name:name,
		description: description,
	}).then(profile=>{
		res.json(profile);
	})
	.catch(err => res.status(400).json("unable to create profile"))	
})


app.post("/register", (req, res)=>{
	const {description, name} = req.body;
	db('profiles')
	  .returning('*')
	  .insert({
		name:name,
		description: description,
	})
	  .then(response =>{
		res.json(response);
	})
	.catch(err => res.status(400).json("unable to create profile"))	
})


app.listen(process.env.PORT || 3000, ()=>{
	console.log("app running")
});




/*

/-->this is working
/signin-->POST  success/fail
/register -->POST = user
/profile/:userId -->GET =user


*/