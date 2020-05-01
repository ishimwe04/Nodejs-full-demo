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
    const pageNumber=2;
    const pageSize=10;

    const courses= await Course
     .find({author:'Olivier', isPublished:true})
     .skip((pageNumber-1)*pageSize)
     .limit(pageSize)
     .sort({name:1,})
     .select({name:1, tags:1});
    console.log(courses);
};

async function updateCourse(id){
    const course=await Course.findByIdAndUpdate(id, {
        $set: {
            author:'john',
            isPublished:false
        }
    }, {new:true});
    
    console.log(course);
}
updateCourse('5e184da7718257162b86fb7a')