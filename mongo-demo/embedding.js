const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(()=>console.log('connected to MongoDB...'))
   .catch(err=>console.err('could not connect to MongoDB...', err));

const authorSchema=new mongoose.Schema({
    name: String,
    bio: String,
    web: String
});
const Author=mongoose.model('Author', authorSchema);

const Course= mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
}));

async function createCourse(name, authors){
    
    const course=new Course({
        name,
        authors
    });
    const result= await course.save();
    console.log(result);
};
async function listCourse(){

    const courses= await Course.find()
    .select('name author')
    console.log(courses);
};

async function updateAuthor(courseId){
    const course= await Course.findById(courseId);
    course.author.name='ishimwe olly';
    course.save();
}

async function addAuthor(courseId, author){
    const course= await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId){
    const course= await Course.findById(courseId);
    const author=course.authors.id(authorId);
    author.remove(); 
    course.save();
}

removeAuthor('5e45961c991d8d24b8cf81c0', '5e45961c991d8d24b8cf81be');

//addAuthor('5e45961c991d8d24b8cf81c0', new Author({ name: 'eliaquim' }));
//updateAuthor('5e45405627e71d20c8690563');

// createCourse('nodejs course', [
//     new Author({ name: 'olivier' }),
//     new Author({ name: 'ishimwe' })
// ]);

//listCourse();