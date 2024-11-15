document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5c49c94d088d8cc130648b78'; // Remplace par ta clé API ExchangeRate-API
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');
    const form = document.getElementById('convert-form');

    // Charger la liste des devises à partir de l'API
    async function loadCurrencies() {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
        const data = await response.json();
        
        if (data.result === "success") {
            const currencyCodes = data.supported_codes;

            currencyCodes.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency[0];
                optionFrom.textContent = `${currency[1]} (${currency[0]})`;
                fromCurrency.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency[0];
                optionTo.textContent = `${currency[1]} (${currency[0]})`;
                toCurrency.appendChild(optionTo);
            });
        }
    }

    // Fonction pour effectuer la conversion
    async function convertCurrency(amount, from, to) {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.conversion_rate;
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${from} équivaut à ${convertedAmount} ${to}`;
        } else {
            resultDiv.textContent = "Erreur lors de la conversion.";
        }
    }

    // Soumission du formulaire
    form.addEventListener('submit', event => {
        event.preventDefault();
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount && from && to) {
            convertCurrency(amount, from, to);
        } else {
            resultDiv.textContent = "Veuillez remplir tous les champs.";
        }
    });

    // Charger les devises au démarrage
    loadCurrencies();
});
