import express, { Request, Response } from 'express';
import { addToCart, getCart, makeOrder } from '../controllers/checkout.controller';
import { getItems } from '../service/product';
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
  if(req){
    makeOrder(req, res)
  }else{
    res.send({status:401,message:'Error Processing Order'})
  }
});


router.post('/add-to-cart', (req: Request, res: Response) => {
  if(req){
    addToCart(req, res)
  }else{
    res.send({status:401,message:'Error Adding Item to Cart'})
  }
});

router.get('/get-cart', async (req, res) => {
  if(req){
    getCart(req, res)
  }else{
    res.send({status:401,message:'Error Adding Item to Cart'})
  }
});


export default router;
