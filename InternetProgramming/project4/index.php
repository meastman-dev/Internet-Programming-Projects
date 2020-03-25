<?php
    session_start(); // Connect to the existing session
    // require_once '/home/common/mail.php'; // Add email functionality to program
    processPageRequest();

    function addMovieToCart($movieID) {
        $movieArray = readMovieData();
        array_push($movieArray, $movieID);
        writeMovieData($movieArray);
        displayCart();
    }

    function checkout($name, $address) {
        $movieArray = readMovieData();
        require_once('templates/cart_form.html'); 
        $string = $message1.$message2;
        $result = sendMail(642829952, $address,  $name , "Your Receipt from myMovies!", $string); 
        var_dump($result);

    }

    function displayCart() {
        $movieArray = readMovieData();
        require_once('templates/cart_form.html');
    }

    function processPageRequest() { 
        if(!isset($_GET['action'])) {
            displayCart();
        }
        else if($_GET['action'] === 'add') {
                $movieID = $_GET['movie_id'];
                addMovieToCart($movieID);
                echo displayCart();
        }
        else if($_GET['action'] === 'checkout') {
                $name = $_SESSION['displayName'];
                $address = $_SESSION['emailAddress'];
                checkout($name, $address);
        }
        else if($_GET['action'] === 'remove') {
                $movieID = $_GET['movie_id'];
                removeMovieFromCart($movieID);
                echo displayCart();
        }
    }


    function readMovieData() {
        $fileHandle = fopen('data/cart.db', 'r');
        $fileString = fgets($fileHandle);
        $movieArray = array_filter(explode(',', $fileString));
        fclose($fileHandle);
        return $movieArray;
    }

    function removeMovieFromCart($movieID) {
        $movieArray = readMovieData();
        if (($key = array_search($movieID, $movieArray)) !== false) {
            unset($movieArray[$key]);
        }
        writeMovieData($movieArray);
        displayCart();
    }

    function writeMovieData($array) {
        $fileHandle = fopen('data/cart.db', 'w');
        $arrayString = implode(",", $array);
        fwrite($fileHandle, $arrayString);
        fclose($fileHandle);
    }

    


    


?>