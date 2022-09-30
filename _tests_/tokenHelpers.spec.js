const {
	generateToken,
	verifyToken,
	decodeToken,
} = require('../helpers/tokenHelpers');

// token with payload of {id:"123456"} that doesnt expire;
const perpetualToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsImlhdCI6MTY2NDQ1NDUwN30.JKk0XFk2gA38Wc3XmbbFJbo_RV9cXK9NM7IdbKO2jXA';

const id = '123456';

// this tampers with tokens by replacing the last character with "bacterialTransfer"
const dirtyHands = (token) => {
	let tempArr = token.split();
	tempArr[tempArr.length - 1] = 'bacteriaTransfer';
	let result = tempArr.join('');
	return result;
};

describe('token helpers tests', () => {
	test('should return new token', () => {
		const token = generateToken(id);
		expect(token).toBeTruthy();
		expect(token.length).toBeGreaterThan(30);
	});
	test('should return true, valid token', () => {
		const token = generateToken(id);
		const verified = verifyToken(token);
		expect(token).toBeTruthy();
	});
	test('should return false for an invalid token', () => {
		const token = generateToken(id);
		const tamperedToken = dirtyHands(token);
		const verified = verifyToken(tamperedToken);
		expect(verified).not.toBeTruthy();
	});
	test('should return id from token through extraction', () => {
		const token = generateToken('uniqueId');
		const decodedToken = decodeToken(token);
		expect(decodedToken).toBeTruthy();
		expect(decodedToken).toBe('uniqueId');
	});
});
