import { multiplication } from './testJest';
describe('test multiplication function', () => {
  it('should return 50 for multiplication(10,5)', () => {
    expect(multiplication(10, 5)).toBe(50);
  });
  it('should return 6 for multiplication(2,3)', () => {
    expect(multiplication(2, 3)).toBe(6);
  });
});
