const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')
   .then(()=>console.log('connected to MongoDB...'))
   .catch(err=>console.err('could not connect to MongoDB...', err));

const courseSchemas= new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
        //match: /pattern/,
        //lowercase: true,
        //uppercase:true,
        //trim: true    this is used to remove padding (spaces) in string
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        
        type:Array,
        validate: {
            isAsync:true,
           validator: function(v, callback){
               setTimeout(()=>{
                  const result= v && v.length>0;
                  callback(result);
               },3000);
            },
            message:'Course should atleast have one tag'
        } 
    },
    date: {type:Date, default:Date.now},
    isPublished:Boolean,
    price: {
        type: Number,
        required: function (){ return this.isPublished},
        min:10,
        max:100,
        get : v =>Math.round(v),
        set : v =>Math.round(v)
    }
});
const Course=mongoose.model('Course',courseSchemas);
async function createCourse(){
        
        const course=new Course({
        name:'Angular Course',
        category: 'web',
        author: 'Olivier',
        tags: ['fronted'],
        isPublished: true,
        price: 80.2
    })
    try{
    const result= await course.save();
    console.log(result);
    }
    catch(ex){
        for(field in ex.errors)
        console.log(ex.errors[field].message);
    }
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
async function removeCourse(id){
    const result=await Course.deleteOne({_id:id});

    console.log(result);
}

createCourse();