import express, { Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import  { URLSearchParams } from 'url';
import fs  from 'fs';
import {Validate} from  '../models/validate.model';
import { Payment } from '../models/payment.model'
import { ErrorMessageInterface } from '../inteface/error-interface';
const router = express.Router();


router.get('/', (req: Request, res: Response) => {
  const {quantity,do_payment} = req.query;
  const items = getItems();
  res.render('checkout', {
    quantity,
    do_payment,
    items,
  });

});

router.post('/payment', (req: Request, res: Response) => {
  let errorResults: Record<string, any> [] = [];
  const  data  = req.body;

  // errorResults = [
  // {field:'phoneNumber',value:false, message: 'Phone Number is Invalid'},
  // {field:'cardNumber',value:false, message: 'Card Number is Invalid'},
  // {field:'expirationDate',value:false, message: 'Invalid Exipry Date'},
  // ]

  if(data.paymentMethod === 'momo'){

    const isValidPhoneNumber = Validate.validatePhoneNumber(data.momoNumber);
    if(!isValidPhoneNumber){
      errorResults.push({field:'momoNumber',value: isValidPhoneNumber,message:'PhoneNumber is Invalid'});
    }

    if(isValidPhoneNumber && data.network){
      const payStatus = Payment.makePayment(data);
     return res.send({status:200, errors:errorResults,message:'',payStatus});
     }else{
      return res.send({status:401,errors:errorResults,message:'Failed Process Payment'});
     }

  }else if(data.paymentMethod = 'card'){
    const isValidCardNumber = Validate.validateCreditCard(data.cardNumber);
    if(!isValidCardNumber){
      errorResults.push({field:'cardNumber',value: isValidCardNumber, message:'Credit Card Number is Invalid'});
    }

    const isValidCardExpiry = Validate.validateExpiryDate(data.expirationDate) && Validate.compareValidExpDate(data.expirationDate);
    if(!isValidCardExpiry){
      errorResults.push({field:'expirationDate',value: isValidCardExpiry, message:'Credit Card Expiry Date is Invalid'});
    }
    const isValidCvv = Validate.validateCVV(data.cvv);
    if(!isValidCvv){
      errorResults.push({field:'cvv',value: isValidCvv, message:'Invalid CVV number'});
    }
    const isValidCardName = Validate.validateCreditCardName(data.nameOnCard);
    if(!isValidCardName){
      errorResults.push({field:'nameOnCard', value: isValidCardName, message:'Card Name is Invalid'});
    }

     if(isValidCardNumber && isValidCardExpiry && isValidCvv && isValidCardName){
      const payStatus = Payment.makePayment(data);
      return res.send({status:200, errors:errorResults,message:'',payStatus});
     }else{
      return res.send({status:401,errors:errorResults,message:'Failed Process Payment'});
     }
  }
  return res.send({data,message:'Payment Successful'});
  //res.send({status:401,errors: errorResults})
});


router.post('/add-to-cart', (req: Request, res: Response) => {
  const itemData = req.body.itemData;
  fs.readFile('src/data/cart.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading cart.json:', err);
      return res.status(500).send('Error reading cart.json');
    }
    let cartItems: any[] = [];
    if (data) {
      cartItems = JSON.parse(data);
    }
    const newItemData: any = JSON.parse(itemData);
     newItemData.quantity = req.body.itemQuantity
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === newItemData.id);
    if (existingItemIndex > -1) {
      cartItems.splice(existingItemIndex, 1);
    }
    cartItems.push(newItemData);
    fs.writeFile('src/data/cart.json', JSON.stringify(cartItems), 'utf8', (err) => {
      if (err) {
        console.error('Error writing cart.json:', err);
        return res.status(500).send('Error writing cart.json');
      }
      res.send('Item added to cart successfully');
    });

  });
});

router.get('/get-cart', async (req, res) => {
  try {
    // Read the contents of the cart.json file
    const cartData = await readFileSync('src/data/cart.json', 'utf8');
    
    // Parse the JSON data
    const cartItems = JSON.parse(cartData);

    // Send the cart items as a JSON response
    res.json(cartItems);
  } catch (error) {
    console.error('Error reading cart.json:', error);
    res.status(500).send('Error reading cart data');
  }
});



const  getItems = () => {
    const items = [
        {
          id: 3405939549905,
          name: "Digital Camera X",
          description: "This is a product description.",
          price: 100,
          quantity: 10,
          image: "https://images.pexels.com/photos/593324/pexels-photo-593324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 3405939549776,
          name: "Digital Camera X52",
          description: "This is another product description.",
          price: 200,
          quantity: 20,
          image: "https://images.pexels.com/photos/1367202/pexels-photo-1367202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 3405939549000,
          name: "Digital Camera X11",
          description: "This is yet another product description.",
          price: 300,
          quantity: 30,
          image: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        // {
        //   id: 34059395499099,
        //   name: "Digital Camera Q43",
        //   description: "This is the last product description.",
        //   price: 400,
        //   quantity: 40,
        //   image: "https://images.pexels.com/photos/1848667/pexels-photo-1848667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        // }
      ];
    //  items.forEach((product:any) => {
    //     const params:any = new URLSearchParams();
    //     params.append('id', product.id);
    //     params.append('name', product.name);
    //     params.append('description', product.description);
    //     params.append('price', product.price);
    //     params.append('quantity', product.quantity);
    //     params.append('init_checkout', true);

    //     const url = new URL('http://localhost:3000');
    //     url.search = params.toString();
    //     product.url = url.toString();

    //   });

      return items;

  };

export default router;
