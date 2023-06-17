import express, { Request, Response } from 'express';
import { makeOrder } from '../controllers/checkout.controller';
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

router.post('/order', (req: Request, res: Response) => {
  if(req){
    makeOrder(req, res)
  }else{
    res.send({status:401,message:'Error Processing Order'})
  }
});

export default router;
