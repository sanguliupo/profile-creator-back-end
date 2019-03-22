const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) =>{
		res.send("backend is working!");
});

app.get("/profiles", (req, res) =>{
	console.log('request to profiles');
	db.select('*').from('profile').then(data =>{
		res.json(data);
	});
});

app.post("/profile", (req, res)=>{
	const {name, description, imageUrl} = req.body;
	db('profile')
	  .returning('*')
	  .insert({
			name:name,
			description: description,
			image: imageUrl
		})
	 .then(response =>{
			res.json(response);
		})
		.catch(err => res.status(400).json("unable to create profile"))	
})

app.listen(process.env.PORT || 3000, ()=>{
	console.log("app running")
});
