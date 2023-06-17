import {Validate} from  '../utils/validate';
import { Order} from '../models/order'
import { Request, Response } from 'express';
import fs  from 'fs';


export function makeOrder(req: Request, res: Response){

    let errorResults: Record<string, any> [] = [];
    const  data  = req.body;

     if(!Validate.validateFieldsNotEmpty(data)){
       return  res.send({status:401,message:'Required field cannot be empty'});
     };

    if(data.paymentMethod === 'momo'){
  
      const isValidPhoneNumber = Validate.validatePhoneNumber(data.momoNumber);
      if(!isValidPhoneNumber){
        errorResults.push({field:'momoNumber',value: isValidPhoneNumber,message:'PhoneNumber is Invalid'});
      }
  
      if(isValidPhoneNumber && data.network){
        const payStatus = Order.placeOrder(data);
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
        const payStatus = Order.placeOrder(data);
        return res.send({status:200, errors:errorResults,message:'',payStatus});
       }else{
        return res.send({status:401,errors:errorResults,message:'Failed Process Payment'});
       }
    }
    return res.send({data,message:'Payment Successful'});
}

export function addToCart(req: Request, res: Response ){
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
}

export async function getCart(req: Request, res: Response ){
    try {
        const cartData = await fs.readFileSync('src/data/cart.json', 'utf8');
        const cartItems = JSON.parse(cartData);
        res.json(cartItems);
      } catch (error) {
        console.error('Error reading cart.json:', error);
        res.status(500).send('Error reading cart data');
      }
}