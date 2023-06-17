import { readFileSync, writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '../enums/orderStatus.enum';

export class Order {
    constructor() {
    }

    static placeOrder(data: Record<string, any>): any {
        let orderInfo: Record<string, any> = {};
        try {
            const cartItems = JSON.parse(readFileSync('src/data/cart.json', 'utf8'));
            const billingAddres = {
                address: data.address,
                addres2: data.address2,
                country: data.country,
                city: data.city,
                zip: data.zip
            };
            const paymentData = {
                email: data.email,
                paymentMethod: data.paymentMethod,
                nameOnCard: data.nameOnCard,
                cardNumber: data.cardNumber,
                expirationDate: data.expirationDate,
                cvv: data.cvv,
                network: data.network || 'N\/A',
                amount: data.cartTotal
            }
            orderInfo = {
                transactionId: uuidv4(),
                transactionStatus:OrderStatus.PENDING,
                billingAddres,
                paymentData,
                cartItems,
                timestamp: Date.now()
            };

            const payments = JSON.parse(readFileSync('src/data/payments.json', 'utf8'));
            payments.push(orderInfo);
            writeFileSync('src/data/payments.json', JSON.stringify(payments));
            writeFileSync('src/data/cart.json', JSON.stringify([]));
        } catch (error) {
            return error;
        }
        return orderInfo;
    }


}