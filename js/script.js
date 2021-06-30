//service array

//Populate dropdown
const services = [{
    value: 1,
    title: 'great - 20%'
}, {
    value: 1,
    title: 'good - 10%'
}, {
    value: 1,
    title: 'bad - 2%'
}];

//validation tests and error message
function validateInput(billAmount, numUsers, selectedService) {
    let isFeedback = false;
    const feedback = document.querySelector('.feedback');
    feedback.innerHTML = '';

    if (billAmount == '' || billAmount <= '0') {
        feedback.classList.add('showItem', 'alert-danger');
        feedback.innerHTML += '<p>Bill amount is invalid<p>';
        isFeedback = true;
    }

    if (numUsers <= 0) {
        feedback.classList.add('showItem', 'alert-danger');
        feedback.innerHTML += '<p>Number of users is invalid<p>';
        isFeedback = true;
    }
    if (selectedService == '0') {
        feedback.classList.add('showItem', 'alert-danger');
        feedback.innerHTML += '<p>Please select a service<p>';
        isFeedback = true;
    }

    setTimeout(() => feedback.classList.remove('showItem', 'alert-danger'), 5000)

    return isFeedback;
}

function calculateTip(billAmount, numUsers, selectedService) {
    let percentTip = 0;
    switch (selectedService) {
        case '1': percentTip = 0.2; break;
        case '2': percentTip = 0.1; break;
        default: percentTip = 0.02; break;
    }
    const tipAmount = Number(billAmount) * percentTip;
    const totalAmount = Number(billAmount) + tipAmount;
    const eachPerson = totalAmount / numUsers;

    return [tipAmount, totalAmount, eachPerson];
}

//adding dropdown options
services.forEach(service => {
    let option = document.createElement('option');
    option.text = service.title;
    option.value = service.value;
    document.querySelector('#input-service').appendChild(option);
});

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const billAmount = document.querySelector('#input-bill').value;
    const numUsers = document.querySelector('#input-users').value;
    const selectedService = document.querySelector('#input-service').value;

    //check to see if errors
    let feedback = validateInput(billAmount, numUsers, selectedService);

    //if errors
    if (feedback == true)
        return;

    let answer = calculateTip(billAmount, numUsers, selectedService);
    document.querySelector('#tip-amount').innerHTML = answer[0].toFixed(2);
    document.querySelector('#total-amount').innerHTML = answer[1].toFixed(2);
    document.querySelector('#person-amount').innerHTML = answer[2].toFixed(2);


    //show fake GIF message
    document.querySelector('.loader').classList.add('showItem');
    setTimeout(() => {
        //show fake GIF message
        document.querySelector('.loader').classList.remove('showItem');
        //show actual output
        document.querySelector('.results').classList.add('showItem');
        setTimeout(() => {
            //show actual output
            document.querySelector('.results').classList.remove('showItem');
            //reset input fields
            document.querySelector('#input-bill').value = '';
            document.querySelector('#input-users').value = '';
            document.querySelector('#input-service').value = 0;
        }, 5000);
    }, 5000);
});