import { Product } from './product';

const createSut = (name: string, price: number): Product => {
  return new Product(name, price);
};

const productName = 'Lapis';
const productPrice = 1.59;

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should return undefined', () => {
    const sut = createSut('camiseta', 49.9);
    expect(sut).toBeDefined();
  });

  it('should have properties', () => {
    const sut = createSut(productName, productPrice);
    expect(sut).toHaveProperty('name', productName);
    expect(sut).toHaveProperty('price', productPrice);
  });
});
