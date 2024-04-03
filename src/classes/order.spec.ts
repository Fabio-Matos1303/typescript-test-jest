/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';
import { EnterpriseCustomer } from './customer';
import { Discount } from './discount';
import { CartItem } from './interfaces/cart-item';
import { CustomerOrder } from './interfaces/customer-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { Order } from './order';
import { ShoppingCart } from './shopping-cart';

const createDiscountMock = () => {
  // eslint-disable-next-line prettier/prettier
  class DiscountMock extends Discount { }
  return new DiscountMock();
};

class ShoppingCartMock implements ShoppingCartProtocol {
  addItem(item: CartItem): void { }
  removeItem(index: number): void { }
  total(): number {
    return 1;
  }
  totalWithDicount(): number {
    return 2;
  }
  isEmpty(): boolean {
    return false;
  }
  clear(): void { }
  get items(): Readonly<CartItem[]> {
    return [];
  }
}

class MessaginMock implements MessagingProtocol {
  sendMessage() { }
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder() { }

}

class CustomerMock implements CustomerOrder {
  getName(): string {
    return ''
  }
  getIDN(): string {
    return ''
  }
}

const createSut = () => {

  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessaginMock();
  const persistencyMock = new PersistencyMock();
  const customerMock = new CustomerMock();

  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    customerMock,
  );

  return {
    sut,
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    customerMock,
  };
};

describe('Order', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return order status', () => {
    const { sut } = createSut();
    expect(sut.orderStatus).toBe('open');
  });

  it('should not checkout if order is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValue(true);
    sut.checkout();
    expect(sut.orderStatus).toBe('open');
  });

  it('should not checkout if order is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValue(false);
    sut.checkout();
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send an email to customer', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalled();
  });

  it('should save order', () => {
    const { sut, persistencyMock } = createSut();
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkout();
    expect(persistencyMockSpy).toHaveBeenCalled();
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalled();
  });

  it('should call console.log with customers name and customer idn', () => {
    const { sut, customerMock } = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.checkout();
    expect(consoleSpy).toHaveBeenCalledWith('O cliente é:', customerMock.getName(), customerMock.getIDN());
  })
});
