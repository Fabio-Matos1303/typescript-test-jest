import { Messaging } from './messaging';

const createSut = () => {
  return new Messaging();
};

const msg = 'Mensagem de pedido';

describe('Messaging', () => {
  afterEach(() => jest.clearAllMocks());

  it('Should return undefined', () => {
    const sut = createSut();
    expect(sut.sendMessage(msg)).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = createSut();
    // jest.spyOn(objeto, 'método')
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage(msg);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should call console.log with "Mensagem enviada" and msg', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage(msg);
    expect(consoleSpy).toHaveBeenCalledWith('Mensagem enviada:', msg);
  });
});
