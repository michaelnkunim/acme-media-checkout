import {Validate} from  '../utils/validate';
import { Order} from '../models/order'
import { Request, Response } from 'express';



export function makeOrder(req: Request, res: Response){

    let errorResults: Record<string, any> [] = [];
    const  formObject  = req.body.formObject;
    const  cartItems  = req.body.cartItems;

    if(!Validate.validateItemsCount(cartItems)){
      return  res.send({status:401,message:'Cart Cannot Bemptu'});
    }

    if(!Validate.validateFieldsNotEmpty(formObject)){
      return  res.send({status:401,message:'Required field cannot be empty'});
    };

     if(!Validate.validateFieldsNotEmpty(formObject)){
       return  res.send({status:401,message:'Required field cannot be empty'});
     };

    if(formObject.paymentMethod === 'momo'){
  
      const isValidPhoneNumber = Validate.validatePhoneNumber(formObject.momoNumber);
      if(!isValidPhoneNumber){
        errorResults.push({field:'momoNumber',value: isValidPhoneNumber,message:'PhoneNumber is Invalid'});
      }
  
      if(isValidPhoneNumber && formObject.network){
        const payStatus = Order.placeOrder(formObject,cartItems);
       return res.send({status:200, errors:errorResults,message:'',payStatus});
       }else{
        return res.send({status:401,errors:errorResults,message:'Failed Process Payment'});
       }
  
    }else if(formObject.paymentMethod = 'card'){
      const isValidCardNumber = Validate.validateCreditCard(formObject.cardNumber);
      if(!isValidCardNumber){
        errorResults.push({field:'cardNumber',value: isValidCardNumber, message:'Credit Card Number is Invalid'});
      }
  
      const isValidCardExpiry = Validate.validateExpiryDate(formObject.expirationDate) && Validate.compareValidExpDate(formObject.expirationDate);
      if(!isValidCardExpiry){
        errorResults.push({field:'expirationDate',value: isValidCardExpiry, message:'Credit Card Expiry Date is Invalid'});
      }
      const isValidCvv = Validate.validateCVV(formObject.cvv);
      if(!isValidCvv){
        errorResults.push({field:'cvv',value: isValidCvv, message:'Invalid CVV number'});
      }
      const isValidCardName = Validate.validateCreditCardName(formObject.nameOnCard);
      if(!isValidCardName){
        errorResults.push({field:'nameOnCard', value: isValidCardName, message:'Card Name is Invalid'});
      }
  
       if(isValidCardNumber && isValidCardExpiry && isValidCvv && isValidCardName){
        const payStatus = Order.placeOrder(formObject,cartItems);
        return res.send({status:200, errors:errorResults,message:'',payStatus});
       }else{
        return res.send({status:401,errors:errorResults,message:'Failed Process Payment'});
       }
    }
    return res.send({data: formObject,message:'Payment Successful'});
}



