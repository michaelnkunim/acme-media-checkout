import { readFileSync, writeFileSync } from 'fs';

export class Payment {
    constructor() {
    }

    static makePayment(data: Record<string, any>): any {
        let paymentInfo: Record<string, any> = {};
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
                network: data.network,
                amount: data.cartTotal
            }
            paymentInfo = {
                billingAddres,
                paymentData,
                cartItems,
                timestamp: Date.now()
            };

            const payments = JSON.parse(readFileSync('src/data/payments.json', 'utf8'));
            payments.push(paymentInfo);
            writeFileSync('src/data/payments.json', JSON.stringify(payments));
            writeFileSync('src/data/cart.json', JSON.stringify([]));
        } catch (error) {
            return error;
        }
        return paymentInfo;
    }


}