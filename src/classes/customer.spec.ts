import { EnterpriseCustomer, IndividualCustomer } from './customer';

const createIndividualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (
  name: string,
  cnpj: string,
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

describe('IndividualCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  const individualCustomerName = 'John';
  const individualCustomerLastName = 'Doe';
  const individualCustomerCpf = '12345678900';

  it('should have firstName, lastName and cpf', () => {
    const sut = createIndividualCustomer(
      individualCustomerName,
      individualCustomerLastName,
      individualCustomerCpf,
    );
    expect(sut).toHaveProperty('firstName', 'John');
    expect(sut).toHaveProperty('lastName', 'Doe');
    expect(sut).toHaveProperty('cpf', '12345678900');
  });

  it('should create individual customer', () => {
    const sut = createIndividualCustomer(
      individualCustomerName,
      individualCustomerLastName,
      individualCustomerCpf,
    );
    expect(sut).toBeInstanceOf(IndividualCustomer);
  });

  it('should have methods to get name and idn', () => {
    const sut = createIndividualCustomer(
      individualCustomerName,
      individualCustomerLastName,
      individualCustomerCpf,
    );
    expect(sut.getName()).toBe(
      individualCustomerName + ' ' + individualCustomerLastName,
    );
    expect(sut.getIDN()).toBe(individualCustomerCpf);
  });
});

describe('EnterpriseCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  const enterpriseCustomerName = 'pjotilson';
  const enterpriseCustomerCnpj = '12345678900';

  it('should create enterprise customer', () => {
    const sut = createEnterpriseCustomer(
      enterpriseCustomerName,
      enterpriseCustomerCnpj,
    );
    expect(sut).toBeInstanceOf(EnterpriseCustomer);
  });

  it('should have name and cnpj', () => {
    const sut = createEnterpriseCustomer(
      enterpriseCustomerName,
      enterpriseCustomerCnpj,
    );
    expect(sut).toHaveProperty('name', enterpriseCustomerName);
    expect(sut).toHaveProperty('cnpj', enterpriseCustomerCnpj);
  });

  it('should have methods to get name and idn', () => {
    const sut = createEnterpriseCustomer(
      enterpriseCustomerName,
      enterpriseCustomerCnpj,
    );

    expect(sut.getName()).toBe(enterpriseCustomerName);
    expect(sut.getIDN()).toBe(enterpriseCustomerCnpj);
  });
});
