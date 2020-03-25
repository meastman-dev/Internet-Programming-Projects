
<?php
    processPageRequest();       

    function authenticateUser($username, $password) {
        $fileHandle = fopen('data/credentials.db', 'r');
        $line = fgets($fileHandle);
        $credArray = explode(',', $line);
        $user = $credArray[0];
        $pass = $credArray[1];
        $name = $credArray[2];
        $email = $credArray[3];
        if($user === $username && $pass === $password) {
            session_start();
            $_SESSION['displayName'] = $name;
            $_SESSION['emailAddress'] = $email;
            header('Location: index.php');  
        }
        else {
            $message = "Incorrect username and password";
            displayLoginForm($message);
        }
        fclose($fileHandle);
    }

    function displayLoginForm($message="") {
        require_once('templates/logon_form.html');  
    }

    function processPageRequest() {
        if(isset($_SESSION)) {
            session_destroy();
        }
        if($_POST) {
            $username = $_POST['username'];
            $password = $_POST['password'];
            authenticateUser($username, $password);
        }
        else {
            displayLoginForm();
        }
    } 
   
?>