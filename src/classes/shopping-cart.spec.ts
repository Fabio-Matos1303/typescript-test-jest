import { ShoppingCart } from './shopping-cart';
import { Product } from './product';
import { Discount } from './discount';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createDiscountMock = () => {
  // eslint-disable-next-line prettier/prettier
  class DiscountMock extends Discount { }
  return new DiscountMock();
};

const createProductMock = () => {
  // eslint-disable-next-line prettier/prettier
  class ProductMock extends Product { }
  return new ProductMock(itemName, price);
};

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  const productMock1 = createProductMock();
  const productMock2 = createProductMock();
  sut.addItem(productMock1);
  sut.addItem(productMock2);
  return { sut, discountMock, productMock1, productMock2 };
};

const itemName = 'Lápis';
const price = 1.59;
const index = 1;

describe('ShoppingCart', () => {
  afterEach(() => jest.clearAllMocks());

  it('should be an empty cart when no product is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('should have two items', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
  });

  it('should calculate total', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total()).toBe(3.18);
  });

  it('should call discount.calculate once when totalWithDicount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const calculateDiscountSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDicount();
    expect(calculateDiscountSpy).toHaveBeenCalledTimes(1);
    expect(sut.total()).toBe(3.18);
  });

  it('should call discount.calculate with price when totalWithDicount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const calculateDiscountSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDicount();
    expect(calculateDiscountSpy).toHaveBeenCalledWith(price * 2);
  });

  it('should remove item', () => {
    const { sut } = createSutWithProducts();
    sut.removeItem(index);
    expect(sut.items.length).toBe(1);
  });

  it('should add products and clear cart', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });
});
