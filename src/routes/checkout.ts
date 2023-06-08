import express, { Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import  { URLSearchParams } from 'url';
const router = express.Router();


router.get('/', (req: Request, res: Response) => {
  const { id, name, description, price, quantity,do_payment, init_checkout } = req.query;
  const items = generateItems(1);

  const params:any = new URLSearchParams();
  params.append('id', id);
  params.append('name', name);
  params.append('description', description);
  params.append('price', price);
  params.append('quantity', quantity);
  params.append('do_payment', true);
  const url = new URL('http://localhost:3000');
  url.search = params.toString();
  const checkoutUrl = url.toString();

  res.render('checkout', {
    id,
    name,
    description,
    price,
    quantity,
    do_payment,
    init_checkout,
    items,
    checkoutUrl
  });

});

router.post('/payment', (req: Request, res: Response) => {
  const  data  = req.body;
  const paymentInfo = {
    data
  };

  const payments = JSON.parse(readFileSync('src/data/payments.json', 'utf8'));
  payments.push(paymentInfo);
  writeFileSync('src/data/payments.json', JSON.stringify(payments));
  res.send({data,message:'Payment Successful'});
});


const  generateItems = (count: number) => {
    const items = [
        {
          id: 3405939549905,
          name: "Digital Camera 1",
          description: "This is a product description.",
          price: 100,
          quantity: 10,
          image: "https://images.pexels.com/photos/593324/pexels-photo-593324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 3405939549776,
          name: "Digital Camera 1",
          description: "This is another product description.",
          price: 200,
          quantity: 20,
          image: "https://images.pexels.com/photos/1367202/pexels-photo-1367202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 3405939549000,
          name: "Digital Camera 1",
          description: "This is yet another product description.",
          price: 300,
          quantity: 30,
          image: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 34059395499099,
          name: "Digital Camera 2",
          description: "This is the last product description.",
          price: 400,
          quantity: 40,
          image: "https://images.pexels.com/photos/1848667/pexels-photo-1848667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      ];
     items.forEach((product:any) => {
        const params:any = new URLSearchParams();
        params.append('id', product.id);
        params.append('name', product.name);
        params.append('description', product.description);
        params.append('price', product.price);
        params.append('quantity', product.quantity);
        params.append('init_checkout', true);

        const url = new URL('http://localhost:3000');
        url.search = params.toString();
        product.url = url.toString();

      });

      return items;

  };

export default router;
