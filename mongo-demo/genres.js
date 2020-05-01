const mongoose=require('mongoose');
const Joi=require('joi');
const genres=require('./routes/genresRouter');
const express=require('express');
const app=express();

mongoose.connect('mongodb://localhost/videos')
   .then(()=> console.log('connected to mongodb...'))
   .catch(err=> console.error('could not connect to mongodb...'));

app.use(express.json());
app.use('/api/genres', genres);

const port=process.env.PORT || 10000;
app.listen(port, ()=> console.log(`listening is on port ${port}`));