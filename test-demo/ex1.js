function fizzBuzz(input){
   if( typeof input !=='number') 
    throw new Error('input should be a number');

    if((input % 3 ===0) && (input % 5 ===0))
    return 'fizzBuzz';

    if(input % 3 ===0)
    return 'fizz';

    if(input % 5 ===0)
    return 'Buzz';

    return input; 
}
console.log(fizzBuzz(12));

