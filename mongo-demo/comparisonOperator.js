const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(()=>console.log('connected to MongoDB...'))
   .catch(err=>console.err('could not connect to MongoDB...', err));

const courseSchemas= new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date, default:Date.now},
    isPublished:Boolean
});
const Course=mongoose.model('Course',courseSchemas);
async function createCourse(){
    
    const course=new Course({
        name:'Angular Course',
        author: 'Olivier',
        tags: ['Angular', 'frontend'],
        isPublished:true
    })
    const result= await course.save();
    console.log(result);
};
async function getCourse(){
    //eq (equal), ne(not equal)
    //lt(less than), lte(less than or equal to)
    //gt(greater than), gte(greater than or equal to)
    //in, nin(not in)
    const courses= await Course.find({author:'Olivier', isPublished:true})
     //.find({price:{$gte:10,$lte:20}})
     //.find({price:{$in:[10,15,20]}})
     .limit(10)
     .sort({name:1,})
     .select({name:1, tags:1});
    console.log(courses);
};

getCourse();