import express from 'express';
import path from 'path';
import checkoutRouter from './routes/checkout';
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/', checkoutRouter);
app.use('/checkout', checkoutRouter);
app.use('/payment', checkoutRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
