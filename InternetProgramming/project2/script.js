
const creditForm =  '<table id="creditTable" class="center-table">' +
                        '<tr>' +
                            '<th colspan="2"><h4>Credit Card Payment</h4></th>' +
                        '</tr>' +
                        '<tr>'  +
                            '<td><label for="firstName">First Name:</label><input type="text" name="fname" required></td>'  +
                            '<td><label for="lastName">Last Name:</label><input type="text" name="lname" required></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><label for="address">Address:</label><input type="text" name="address" required></td>' +
                            '<td><label for="city">City:</label><input type="text" name="city" required></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><label for="zipCode">ZipCode:</label><input type="text" id="zipCode" name="zipCode" required></td>' +
                            '<td><label for="emailAddress">Email Address:</label><input type="text" id="creditEmail" name="creditEmail" required></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><label for="nameOnCard">Name on the Card:</label><input type="text" name="noc" required></td>' +
                            '<td><label for="cardNumber">Card Number:</label><input type="text" id="cardNumber" name="cardNumber" required></td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><label for="security" class="tooltip"><span class="tooltiptext">What is this?</span>' +
                                '<a href="https://en.wikipedia.org/wiki/Card_security_code" target="_blank">' +
                                'CVV2/CVC</a>:</label><input type="text" id="securityCode" name="securityCode" required></td>' +
                            '<td><label for="stateSelection">State:</label><select name="statelist" id="stateOptions">' +
                                    '<option value="default" selected>Select State</option>' +
                                    '<option value="AL">Alabama</option>' +
                                    '<option value="AK">Alaska</option>' +
                                    '<option value="AZ">Arizona</option>' +
                                    '<option value="AR">Arkansas</option>' +
                                    '<option value="CA">California</option>' +
                                    '<option value="CO">Colorado</option>' +
                                    '<option value="CT">Connecticut</option>' +
                                    '<option value="DE">Delaware</option>' +
                                    '<option value="FL">Florida</option>' +
                                    '<option value="GA">Georgia</option>' +
                                    '<option value="HI">Hawaii</option>' +
                                    '<option value="ID">Idaho</option>' +
                                    '<option value="IL">Illinois</option>' +
                                    '<option value="IN">Indiana</option>' +
                                    '<option value="IA">Iowa</option>' +
                                    '<option value="KS">Kansas</option>' +
                                    '<option value="KY">Kentucky</option>' +
                                    '<option value="LA">Louisiana</option>' +
                                    '<option value="ME">Maine</option>' +
                                    '<option value="MD">Maryland</option>' +
                                    '<option value="MA">Massachusetts</option>' +
                                    '<option value="MI">Michigan</option>' +
                                    '<option value="MN">Minnesota</option>' +
                                    '<option value="MS">Mississippi</option>' +
                                    '<option value="MO">Missouri</option>' +
                                    '<option value="MT">Montana</option>' +
                                    '<option value="NE">Nebraska</option>' +
                                    '<option value="NV">Nevada</option>' +
                                    '<option value="NH">New Hampshire</option>' +
                                    '<option value="NJ">New Jersey</option>' +
                                    '<option value="NM">New Mexico</option>' +
                                    '<option value="NY">New York</option>' +
                                    '<option value="NC">North Carolina</option>' +
                                    '<option value="ND">North Dakota</option>' +
                                    '<option value="OH">Ohio</option>' +
                                    '<option value="OK">Oklahoma</option>' +
                                    '<option value="OR">Oregon</option>' +
                                    '<option value="PA">Pennsylvania</option>' +
                                    '<option value="RI">Rhode Island</option>' +
                                    '<option value="SC">South Carolina</option>' +
                                    '<option value="SD">South Dakota</option>' +
                                    '<option value="TN">Tennessee</option>' +
                                    '<option value="TX">Texas</option>' +
                                    '<option value="UT">Utah</option>' +
                                    '<option value="VT">Vermont</option>' +
                                    '<option value="VA">Virginia</option>' +
                                    '<option value="WA">Washington</option>' +
                                    '<option value="WV">West Virginia</option>' +
                                    '<option value="WI">Wisconsin</option>' +
                                    '<option value="WY">Wyoming</option>' +
                                '</select>' +
                            '</td>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><label for="expiryDate">Expiration Date:</label><input type="month" name="expirationDate" id="expiry" value="2019-04"' +
                                'min="2017-01" max="2020-12">' +
                            '</td>' +
                        '</tr>' +
                    '</table>';

const payPalForm =  '<table class="center-table">' +
                        '<tr>' +
                            '<th colspan="2"><h4>PayPal Payment</h4></th>' +
                        '</tr>' +
                        '<tr>' +
                            '<td><label for="ppEmail">Email Address:</label><input type="text" id="payPalEmail" name="payPalEmail" required></td>' +
                            '<td><label for="password">Password:</label><input type="password" id="payPalPassword" name="payPalPassword" required></td>' +
                        '</tr>' +
                    '</table>';
                              
                    
const paymentForm = document.getElementById('paymentForm');
paymentForm.innerHTML = creditForm;

function testLength(value, length, exactLength) {
    if(exactLength) {
        if(value.length === length)
            return true;
        else
            return false;
    }
    else {
        if(value.length >= length)
            return true;
        else
            return false;
    }
} //works

function testNumber(value) {
    if(isNaN(value)) {
        return false;
    }
    else {
        return true;
    }
} //works

function updateForm(control) {
    var radioCreditCard = document.getElementById('radioCreditCard');
    var radioPayPal =  document.getElementById('radioPayPal');

    if(control.checked === radioCreditCard.checked) {
        paymentForm.innerHTML = creditForm;   
    }
    else if(control.checked === radioPayPal.checked) {
        paymentForm.innerHTML = payPalForm;
    }
} //works

function validateControl(control, name, length) {
    if(testLength(control, length, true) && testNumber(Number(control))) {
        return true;
    } 
    else {
        alert(name + ' is incorrect! Must be ' + length + ' characters long and a number.');
        return false;
    } 
} //works

function validateCreditCard(value) {
    var creditCard = value.replace(/\s+/g, '');
    var creditCardNum = Number(creditCard);
    var firstDigit = value.charAt(0);

    if(!testNumber(creditCardNum)) {
        alert('Credit Card must be a number.');
        return false;
    }
    else if(firstDigit === '3') {
        if(!testLength(creditCard, 15, true)) {
            alert('Credit Card must be 15 characters in length for AmEx or Credit Card must be 16 characters in length for Dicover, Master Card, or Visa. ');
            return false;
        }
        else
            return true;
    }
    else if(firstDigit === '4' || firstDigit === '5' || firstDigit === '6') {
       if(!testLength(creditCard, 16, true)) {
            alert('Credit Card must be 15 characters in length for AmEx or Credit Card must be 16 characters in length for Dicover, Master Card, or Visa. ');
            return false;
        }
        else
            return true;
    }
    else {
        alert('Invalid Credit Card type. Must be a valid AmEx, Discover, Master Card, or Visa.');
        return false;
    }
} //works

function validateDate(value) {

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var inputDate = new Date(value);
    var inputMonth = inputDate.getMonth();
    var inputYear = inputDate.getFullYear();

    if(inputYear > currentYear) {
        return true;
    }
    else if(inputYear === currentYear) {
        if((inputMonth + 1) >= currentMonth) {
            return true;
        }
        else {
            alert('Credit Card is expired.');
            return false;
        }
    }
    else {
        alert('Credit Card is expired.');
        return false;
    }
} //works

function validateEmail(value) {
    if(/\S+@\S+\.\S+/.test(value)){
        return true;
    }
    else {
        alert('Incorrect email address.');
        return false;
    }
} //works

function validateForm() {
    if(document.getElementById('creditTable')) {
        var date = document.getElementById('expiry').value;
        var creditEmail = document.getElementById('creditEmail').value;
        var securityCode = document.getElementById('securityCode').value;
        var zipCode = document.getElementById('zipCode').value;
        var cardNumber = document.getElementById('cardNumber').value;
        var zipName = document.getElementById('zipCode').getAttribute('name');
        var securityName = document.getElementById('securityCode').getAttribute('name');
        validateCreditCard(cardNumber);
        validateDate(date);
        validateEmail(creditEmail);
        validateControl(zipCode, zipName, 5);
        validateControl(securityCode,securityName, 3);
        validateState();
    }
    else {
        var password = document.getElementById('payPalPassword').value;
        var payPalEmail = document.getElementById('payPalEmail').value;
        validateEmail(payPalEmail);
        validatePassword(password, 6);
    }
} //works

function validatePassword(value, minLength) {
    if(!testLength(value, minLength, false)) {
        alert('Password is too short! Requires 6 characters');
        return false;
    }
    else
        return true;
} //works

function validateState() {
    var selectOptions = document.getElementById('stateOptions'); 
    var selectedValue = selectOptions.options[selectOptions.selectedIndex].value;

    if(selectedValue === 'default') {
        alert('Please select a state.');
        return false;
    }
    else
        return true;
} //works
