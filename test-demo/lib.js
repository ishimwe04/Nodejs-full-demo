const db=require('./db');
const mail= require('./mail');

module.exports.absolute=function(number){
    if(number >= 0) return number;
    if(number < 0) return -number;
};

module.exports.greet=function(name){
    return 'Welcome'+" "+name;
};

module.exports.getCurrencies=function(){
    return ['RWF', 'USD', 'KSH'];
};

module.exports.getProduct=function(productId, price){
    return { id:productId, price:price};
};

module.exports.registUser=function(username){
    if(!username) throw new Error('the name is required');

    return ({ id: new Date().getTime(), username:username});
};

module.exports.fizzBuzz=function(input){
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

module.exports.applyDiscount=function(order){
    const customer=db.getCustomerSync(order.customerId);
    
    if(customer.points > 10)
      order.totalPrice *= 0.9;
}

module.exports.notifyCustomer=function(order){
    const customer=db.getCustomerSync(order.customerId);
    
    mail.send(customer.email, 'your order has been successfully booked');
}