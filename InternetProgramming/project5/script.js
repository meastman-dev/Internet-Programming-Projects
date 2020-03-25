function addMovie(movieID) {
    
    window.location.replace("./index.php?action=add&movie_id=" + movieID);
   
    return true;
}

function confirmCheckout() {
    if(confirm("Do you wish to checkout from myMovies Xpress!?") == true) {
        window.location.replace("./index.php?action=checkout");
        return true;
    }
    else {
        return false;
    }
}

function confirmLogout() {
    if(confirm("Do you wish to logout from myMovies Xpress!?") == true) {
        window.location.replace("./logon.php?action=logoff");
        return true;
    }
    else {
        return false;
    }
}

function confirmRemove(title, movieID) { 
    if(confirm("Do you wish to remove " + title  + " from your cart?") == true) {
        window.location.replace("./index.php?action=remove&movie_id=" + movieID);
        return true;
    }
    else {
        return false;
    }
}

function confirmCancel(form) {
    if(confirm("Do you wish to cancel your form?") == true) {
        if(form === "create" || form === "forgot" || form === "reset") {
            window.location.replace("./logon.php");  
        }
        else {
            window.location.replace("./index.php");
        }
        return true;
    }
    else {
        return false;
    }
}

function changeMovieDisplay() {
    let select = document.getElementById('select_order');
    let value = select.options[select.selectedIndex].value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        document.getElementById("shopping_cart").innerHTML= this.responseText;
    }
    xhttp.open("GET", "./index.php?action=update&order=" + value, true);
    xhttp.send();
}

function displayMovieInformation(movieID) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        alert(this.responseText);
        document.getElementById("modalWindowContent").innerHTML= this.responseText;
        showModalWindow();
    }
    xhttp.open("GET", "./movieinfo.php?movie_id=" + movieID, true);
    xhttp.send();
}

function forgotPassword() {
    window.location.replace("./logon.php?action=forgot");
    return true;
}

function showModalWindow() {
    var modal = document.getElementById('modalWindow');
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() 
    { 
        modal.style.display = "none";
    }

    window.onclick = function(event) 
    {
        if (event.target == modal) 
        {
            modal.style.display = "none";
        }
    }
 
    modal.style.display = "block";
}

function validateCreateAccountForm() {
    let email = document.getElementById('email').value;
    let confirmEmail = document.getElementById('confirmEmail').value;
    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;
    let confirmPassword = document.getElementById('confirmPass').value;
    
    if(email.indexOf(' ') >= 0 || confirmEmail.indexOf(' ') >= 0 || username.indexOf(' ') >= 0 || password.indexOf(' ') >= 0 || confirmPassword.indexOf(' ') >= 0) {
        alert("Your email, username, or password cannot contain any whitespace");
        return false;
    }
    if(email !== confirmEmail) {
        alert("Your email and confirm email are not the same");
        return false;
    }
    if(password !== confirmPassword) {
        alert("Your password and confirm password are not the same");
        return false;
    }
    return true;
}

function validateResetPassword() {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPass').value;

    if(password.indexOf(' ') >= 0 || confirmPassword.indexOf(' ') >= 0) {
        alert("Your password and confirm password cannot contain any whitespace");
        return false;
    }
    if(password !== confirmPassword) {
        alert("Your password and confirm password are not the same");
        return false;
    }
    return false;
}