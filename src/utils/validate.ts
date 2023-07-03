export class Validate {

  constructor() {

  }

  static validateCreditCard(creditCardNumber: string): boolean {
    // Regular expression pattern for credit card number validation
    const regex = /^(?:[0-9]{4}-){3}[0-9]{4}$|^[0-9]{16}$/;
    const valid = regex.test(creditCardNumber);
    return valid;
  }

  static validatePhoneNumber(phoneNumber: string): boolean {
    const regex = /^(\+\d{1,3})?\d{9}$/
    return regex.test(phoneNumber);
  }

  static validateCreditCardName(name: string): boolean {
    const regex = /^[A-Za-z\s\-.'()]+$/;
    return regex.test(name);
  }

  static validateCVV(cvv: string): boolean {
    const regex = /^\d{3}$/
    const valid = regex.test(cvv);
    return valid;
  }

  static validateExpiryDate(expiryDate: string): boolean {
    let valid;
    const formatRegex = /^\d{4}\/\d{2}$/;
    valid = formatRegex.test(expiryDate);
    if (!valid) { return false; }
    return valid;
  }

  static compareValidExpDate(expiryDate: string): boolean {
    let valid = true;
    const [year, month] = expiryDate.split('/');
    const expiry = new Date(Number(year), Number(month) - 1, 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (expiry <= today) {
      valid = false;
      return valid;
    }
    return valid;
  }


    static checkFieldValueNotEmpty(value: any): boolean {
      const check  = value !== undefined && value !== null && value !== '';
      return check
    }
  
    static validateFieldsNotEmpty(data: Record<string, any>): boolean {
      const errors:any = [];
      const dataAsArray = Object.entries(data);      
      for (const [key, value] of dataAsArray) {
        if (key !== 'address2' && key !== 'network' && !this.checkFieldValueNotEmpty(value)) {
          errors.push([key,value]);
         // console.log('errors',errors);
         // return false;
        }
      }
      return errors.length > 0 ? false : true;
    }


   static  validateItemsCount(items: Record<string, any>[]){
      return items && !items.length ? false : true
    }
  
}