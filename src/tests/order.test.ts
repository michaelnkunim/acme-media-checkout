import { Validate } from "../utils/validate";

describe('Validate', () => {
  describe('validateCreditCard', () => {
    test('returns true for a valid credit card number', () => {
      const validNumber = '1234-5678-9012-3456';
      const isValid = Validate.validateCreditCard(validNumber);
      expect(isValid).toBe(true);
    });

    test('returns true for a valid credit card number without dashes', () => {
      const validNumber = '1234567890123456';
      const isValid = Validate.validateCreditCard(validNumber);
      expect(isValid).toBe(true);
    });
  });

  describe('validatePhoneNumber', () => {
    test('returns true for a valid phone number', () => {
      const validPhoneNumber = '+1234567896';
      const isValid = Validate.validatePhoneNumber(validPhoneNumber);
      expect(isValid).toBe(true);
    });

    // Add more test cases for different scenarios
  });

  describe('validateCreditCardName', () => {
    test('returns true for a valid name without special characters', () => {
      const validName = 'John Doe';
      const isValid = Validate.validateCreditCardName(validName);
      expect(isValid).toBe(true);
    });

    test('returns true for a valid name with special characters', () => {
      const validName = "O'Connor";
      const isValid = Validate.validateCreditCardName(validName);
      expect(isValid).toBe(true);
    });

    test('returns false for an invalid name with numbers', () => {
      const invalidName = 'John Doe __123';
      const isValid = Validate.validateCreditCardName(invalidName);
      expect(isValid).toBe(false);
    });

    // Add more test cases for different scenarios
  });

  describe('validateCVV', () => {
    test('returns true for a valid CVV', () => {
      const validCVV = '123';
      const isValid = Validate.validateCVV(validCVV);
      expect(isValid).toBe(true);
    });

    test('returns false for an invalid CVV with non-digit characters', () => {
      const invalidCVV = '12a';
      const isValid = Validate.validateCVV(invalidCVV);
      expect(isValid).toBe(false);
    });

    // Add more test cases for different scenarios
  });

  describe('validateExpiryDate', () => {
    test('returns true for a valid expiry date', () => {
      const validExpiryDate = '2022/12';
      const isValid = Validate.validateExpiryDate(validExpiryDate);
      expect(isValid).toBe(true);
    });

    test('returns false for an invalid expiry date with an incorrect format', () => {
      const invalidExpiryDate = '12/2022';
      const isValid = Validate.validateExpiryDate(invalidExpiryDate);
      expect(isValid).toBe(false);
    });

    // Add more test cases for different scenarios
  });

  describe('compareValidExpDate', () => {
    test('returns true for a valid expiry date in the future', () => {
      const futureExpiryDate = '2023/07';
      const isValid = Validate.compareValidExpDate(futureExpiryDate);
      expect(isValid).toBe(true);
    });

    test('returns false for an expiry date that is today', () => {
      const todayExpiryDate = '2023/06';
      const isValid = Validate.compareValidExpDate(todayExpiryDate);
      expect(isValid).toBe(false);
    });

    // Add more test cases for different scenarios
  });

  describe('validateFieldsNotEmpty', () => {
    test('should return true when all fields are not empty, undefined, or null', () => {
      const data = {
        email: 'johndoe@gmail.com',
        address: '14 Okai Lane, Chrsitian Village Achimota',
        address2: 'APT C2',
        country: 'Ghana',
        state: 'Accra',
        zip: '03400',
        paymentMethod: 'momo',
        nameOnCard: 'John Star Doe',
        cardNumber: '2424505090909090',
        expirationDate: '2023/07',
        cvv: '324',
        momoNumber: '+233245893867',
        network: 'vodafone',
        cartTotal: '1400'
      };
  
      const result = Validate.validateFieldsNotEmpty(data);
  
      expect(result).toBe(true);
    });
  
    test('should return false when at least one required field is empty, undefined, or null', () => {
      const data = {
        email: 'johndoe@gmail.com',
        address: '',
        address2: 'APT C2',
        country: '',
        state: 'Accra',
        zip: '03400',
        paymentMethod: 'momo',
        nameOnCard: 'John Star Doe',
        cardNumber: '2424505090909090',
        expirationDate: '2023/07',
        cvv: '324',
        momoNumber: '+233245893867',
        network: 'vodafone',
        cartTotal: '1400'
      };
  
      const result = Validate.validateFieldsNotEmpty(data);
      expect(result).toBe(false);
    });
  
    test('should return true when field "address2" is empty, undefined, or null', () => {
      const data = {
        email: 'johndoe@gmail.com',
        address: '14 Okai Lane, Chrsitian Village Achimota',
        address2: '',
        country: 'Ghana',
        state: 'Accra',
        zip: '03400',
        paymentMethod: 'momo',
        nameOnCard: 'John Star Doe',
        cardNumber: '2424505090909090',
        expirationDate: '2023/07',
        cvv: '324',
        momoNumber: '+233245893867',
        network: 'vodafone',
        cartTotal: '1400'
      };
  
      const result = Validate.validateFieldsNotEmpty(data);
  
      expect(result).toBe(true);
    });
  });


  describe('validateItemsCount', () => {
    test('should return true if the items array is not empty', () => {
      const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ];
  
      const result = Validate.validateItemsCount(items);
  
      expect(result).toBe(true);
    });
  
    test('should return false if the items array is empty', () => {
      const items: Record<string, any>[] = [];
  
      const result = Validate.validateItemsCount(items);
  
      expect(result).toBe(false);
    });
  });
  
  

});

