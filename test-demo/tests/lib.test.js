const lib=require('../lib');
const db=require('../db');
const mail= require('../mail');

describe('absolute', ()=>{
    it('should return a positive number if input is positive', ()=>{
        const result=lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return a positive number even if input is negative', ()=>{
        const result=lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return zero if input is zero', ()=>{
        const result=lib.absolute(0);
        expect(result).toBe(0);
    });
});
describe('greet',()=>{
    it('should return a welcome message', ()=>{
        const result=lib.greet('Ishimwe');
        expect(result).toBe('Welcome Ishimwe');
        // expect(result).toMatch('/Ishimwe/');
        // expect(result).toContain('Ishimwe');
    });
});
describe('getCurrencies', ()=>{
    it('should return currencies', ()=>{
        const result=lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['USD','RWF','KSH']));

        //specific
        // expect(result[0]).toBe('RWF');
        // expect(result[1]).toBe('USD');
        // expect(result[2]).toBe('KSH');

    });
});

describe('getProduct', ()=>{
   it('should return object', ()=>{
       const result=lib.getProduct(1,5);
       expect(result).toEqual({id:1, price:5});

       // to enable addition to the objects but must have the selected unit

    //    expect(result).toMatchObject({id:1, price:5});
   })
});

describe('registUser', ()=>{
    it('should throw an error message if username is not valid',()=>{
        const args=[null, undefined, '', 0, NaN, false];
        args.forEach(a=>{
            expect(()=>{ lib.registUser(a)}).toThrow();
        });
    });
    it('should return username if it is valid', ()=>{
        const result=lib.registUser('olivier');
        expect(result).toMatchObject({username: 'olivier'});
    });
});

describe('fizzBuzz', ()=>{
    it('should throw if input is not a number',()=>{
        expect(()=> {lib.fizzBuzz('a')}).toThrow();
        expect(()=> {lib.fizzBuzz(null)}).toThrow();
        expect(()=> {lib.fizzBuzz(undefined)}).toThrow();
    });
    it('should return fizzBuzz if input is divided by 3 and 5 ', ()=>{
        const result=lib.fizzBuzz(15);
        expect(result).toBe('fizzBuzz');
    });
    it('should return fizz if input is divided by 3 and not divided by 5', ()=>{
        const result=lib.fizzBuzz(9);
        expect(result).toBe('fizz');
    });
    it('should return fizz if input is neither divided by 5 or 3', ()=>{
        const result=lib.fizzBuzz(2);
        expect(result).toBe(2);
    });

});

describe('getCustomerSync', ()=>{
    it('should apply 10% discount if customer points are greater than 10', ()=>{
        db.getCustomerSync=function(customerId){
            console.log('Fake leading from database.');
            return { id: customerId, points: 11};
        }

    const order= { customerId:1, totalPrice:100};
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(90);
        
    })
});

describe('notifyCustomer', ()=>{
    it('should send email to the customer',()=>{
        db.getCustomerSync=jest.fn().mockReturnValue({ email: 'a'});
    mail.send=jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls [0] [0]).toBe('a');
    expect(mail.send.mock.calls [0] [1]).toMatch(/order/);
    })   
})