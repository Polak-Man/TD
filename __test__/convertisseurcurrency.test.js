const { convertCurrency } = require('./app'); // Assurez-vous que votre fonction est exportée

test('Convert 100 USD to EUR', async () => {
    const result = await convertCurrency(100, 'USD', 'EUR');
    expect(result).toBeDefined(); // Vérifiez que le résultat est défini
    expect(typeof result).toBe('string'); // Vérifiez que le résultat est une chaîne
});
