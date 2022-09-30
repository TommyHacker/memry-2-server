const { hashPassword, verifyPassword } = require('../helpers/passwordHelpers');

const password = 'testPassword';

describe('password helpers', () => {
	test('should return hashed/salted password', () => {
		const hashedPassword = hashPassword(password);
		expect(hashedPassword.length).not.toBe(12);
		expect(typeof hashedPassword).toBe(typeof 'string');
	});
	test('should return true', () => {
		const hashedPassword = hashPassword(password);
		const verified = verifyPassword('testPassword', hashedPassword);
		expect(verified).toBeTruthy();
	});
	test('should return false if password mismatch', () => {
		const hashedPassword = hashPassword(password);
		const guessPassword = 'incorrectPassword';
		const verified = verifyPassword(guessPassword, hashedPassword);
		expect(verified).not.toBeTruthy();
	});
});
