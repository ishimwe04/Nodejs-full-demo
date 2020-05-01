const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(()=> console.log('connect to MongoDB...'))
   .catch(err=> console.err('could not connect to MongoDB...', err));