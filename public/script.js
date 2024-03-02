document.addEventListener('DOMContentLoaded', function () {
    const bloodBankList = document.getElementById('bloodBankList');
    const addBloodBankForm = document.getElementById('addBloodBankForm');

    // Fetch blood banks from the server
    fetch('/bloodbanks')
        .then(response => response.json())
        .then(data => {
            data.forEach(bloodBank => {
                const bloodBankDiv = document.createElement('div');
                bloodBankDiv.innerHTML = `<strong>${bloodBank.name}</strong> - ${bloodBank.location}`;
                bloodBankList.appendChild(bloodBankDiv);
            });
        });

    // Add a new blood bank
    addBloodBankForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const location = document.getElementById('location').value;

        fetch('/bloodbanks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, location })
        })
            .then(response => response.json())
            .then(data => {
                const bloodBankDiv = document.createElement('div');
                bloodBankDiv.innerHTML = `<strong>${data.name}</strong> - ${data.location}`;
                bloodBankList.appendChild(bloodBankDiv);
            });
    });
});
