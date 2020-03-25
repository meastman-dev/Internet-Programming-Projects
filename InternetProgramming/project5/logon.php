
<?php

    require_once('/home/common/mail.php'); // Add email functionality
    require_once('/home/common/dbInterface.php'); // Add database functionality
    processPageRequest(); // Call the processPageRequest() function 
    

    function authenticateUser($username, $password) {
        $array = validateUser($username, $password);

        if(is_array($array)) {
            session_start();
            $_SESSION['id'] = $array[0];
            $_SESSION['name'] = $array[1];
            $_SESSION['email'] = $array[2];
            header('Location: index.php');
            
        }
        else {
            $message = "Incorrect username and password";
            displayLoginForm($message);
        }
    }

    function createAccount($username, $password, $displayName, $emailAddress) {
        $userId = addUser($username, $password, $displayName, $emailAddress);
        if($userId > 0) {
            sendValidationEmail($userId, $displayName, $emailAddress);
            $message = "Account created";
            displayLoginForm($message);
        }
        else {
            $message = "Username already exists";
            displayLoginForm($message);
        }
    }  

    function displayCreateAccountForm() {
        require_once('templates/create_form.html'); 
    }

    function displayForgotPasswordForm() {
        require_once('templates/forgot_form.html'); 
    }

    function displayLoginForm($message="") {
        require_once('templates/logon_form.html');  
    }

    function displayResetPasswordForm($userId) {
        require_once('templates/reset_form.html');  
    }

    function processPageRequest() {
        session_start();
        session_unset();
        session_destroy();
        if($_POST) {
            if(isset($_POST['action'])) {
                if($_POST['action'] === 'create') {
                    $displayName = $_POST['name'];
                    $emailAddress = $_POST['email'];
                    $username = $_POST['username'];
                    $password = $_POST['password'];
                    createAccount($username, $password, $displayName, $emailAddress);
                }
                else if($_POST['action'] === 'forgot') {
                    $username = $_POST['username'];
                    sendForgotPasswordEmail($username);
                    displayLoginForm();
                }
                else if($_POST['action'] === 'login') {
                    $username = $_POST['username'];
                    $password = $_POST['password'];
                    authenticateUser($username, $password);
                }
                else if($_POST['action'] === 'reset') {
                    $password = $_POST['password'];
                    $postId = $_POST['user_id'];
                    resetPassword($postId, $password);
                }  
            }
        }
        else if($_GET) {
            if(isset($_GET['action'])) {
                if($_GET['action'] === 'validate') {
                    $getId = $_GET['user_id'];
                    validateAccount($getId);
                } 
                else {
                    displayLoginForm();
                }     
            }
            else if(isset($_GET['form'])) {
                if($_GET['form'] === 'create') {
                    displayCreateAccountForm();
                }
                else if($_GET['form'] === 'forgot') {
                    displayForgotPasswordForm();
                }
                else if($_GET['form'] === 'reset') {
                    $getId = $_GET['user_id'];
                    displayResetPasswordForm($getId);
                }
            }
        }
        else {
            displayLoginForm();
        }
    } 

    function resetPassword($userId, $password) {
        $reset = resetUserPassword($userId, $password);
        if($reset === TRUE) {
            $message = "Password successfully updated";
            displayLoginForm($message);
        }
        else {
            $message = "User does not exist or the password chosen is the same as your current password";
            displayLoginForm($message);
        }
    }
    
    function sendForgotPasswordEmail($username) {
        $userData = getUserData($username);
        $userId = $userData[0];
        $name = $userData[1];
        $email = $userData[2];
        $message = "<div style='text-align:center;'>
                        <div>
                            <h1>myMovies Xpress!</h1>
                        </div>
                        <div>
                            <h3>".$name."</h3>
                        </div>
                        <div>
                            <ol>
                                <li><h5>Enter your email address and choose 'Send email'.</h5></li>
                                <li><h5>Open the email and click 'Set a New Password'.</h5></li>
                                <li><h5>Create a new password.</h5></li>
                            </ol>
                        </div>
                        <div>
                            <a href='http://139.62.210.181/~em429363/project5/logon.php?form=reset&user_id=".$userId."'>Reset password</a>
                        </div>
                    </div>";
        $result = sendMail(642829952, $email, $name, "myMovies! Password Reset Request", $message);
    }   

    function sendValidationEmail($userId, $displayName, $emailAddress) {
        $message = "<div>
                        <h1>myMovies Xpress!</h1>
                    </div>
                    <div>
                        <h3>".$displayName."</h3>
                    </div>
                    <div>
                        <p>Click the link below to validate your email address.</p>
                    </div>
                    <div>
                        <a href='http://139.62.210.181/~em429363/project5/logon.php?action=validate&user_id=".$userId."'>Activate Account</a>
                    </div>";
        $result = sendMail(642829952, $emailAddress, $displayName, "myMovies! Account Validation", $message);
    }

    function validateAccount($userId) {
        $activateAccount = activateAccount($userId);
        if($activateAccount === TRUE) {
            $message = "The specified User ID exists, and the account has been activated";
            displayLoginForm($message);
        }
        else {
            $message = "The specified User ID does not exist";
            displayLoginForm($message);
        }
    }


?>