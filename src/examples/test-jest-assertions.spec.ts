describe('Primitive values', () => {
  it('should test jest assertions', () => {
    const number = 10;

    expect(number).toBeLessThan(11);
    expect(number).toBeLessThanOrEqual(10);

    expect(number).toBeCloseTo(10.001);
    expect(number).toBeCloseTo(9.996);

    expect(number).not.toBeNull();

    expect(number).toHaveProperty('toString');
  });

  it('should split tests', () => {
    const number = 10;

    expect(number).toBe(10); // Trabalhar com valores
    expect(number).toEqual(10); // Trabalhar com objetos

    expect(number).not.toBeFalsy(); // Teste booleano
    expect(number).toBeTruthy(); // Teste booleano

    expect(number).toBeGreaterThan(9); // Comparação
    expect(number).toBeGreaterThanOrEqual(10); // Comparação
  });
});

describe('Objects', () => {
  it('should test jest assertions with objects', () => {
    const person = { name: 'Luiz', age: 30 };
    const anotherPerson = { ...person };

    expect(person).toEqual(anotherPerson);
    expect(person).toHaveProperty('age');
    expect(person).not.toHaveProperty('lastName');
    expect(person).toHaveProperty('age', 30);

    expect(person.name).toBe('Luiz');
  });
});
