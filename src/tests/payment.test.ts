import { Validate } from '../models/validate.model';

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

    // Add more test cases for different scenarios
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

});

