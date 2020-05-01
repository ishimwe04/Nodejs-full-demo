const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(()=>console.log('connected to MongoDB...'))
   .catch(err=>console.err('could not connect to MongoDB...', err));

const Author=mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    web: String
}));
const Course= mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));
async function createAuthor(name, bio, web){
    
    const author=new Author({
        name,
        bio,
        web
    });
    const result= await author.save();
    console.log(result);
};

async function createCourse(name, author){
    
    const course=new Course({
        name,
        author
    });
    const result= await course.save();
    console.log(result);
};
async function listCourse(){

    const courses= await Course
     .find()
     .populate('author')
     .select('name author');
    console.log(courses);
};

//createAuthor('olivier', 'my bio', 'my website');

//createCourse('nodejs course', '5e45891a12d84007f05e0395');  //paste the author_id

listCourse();