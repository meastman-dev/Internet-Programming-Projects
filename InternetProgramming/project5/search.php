<?php
    session_start(); // Connect to the existing session
    processPageRequest(); // Call the processPageRequest() function  

    function displaySearchForm() {
        require_once('templates/search_form.html');
    }

    function displaySearchResults($searchString) {
        $results = file_get_contents('http://www.omdbapi.com/?apikey=fc7e3ddf&i&s='.urlencode($searchString).'&type=movie&r=json');
        $array = json_decode($results, true)["Search"];
        require_once('templates/results_form.html');
    }

    function processPageRequest() {
        if(!isset($_SESSION['name'])) {
            header('Location: logon.php');
        }
        if($_POST) {
            $searchString = $_POST['searchString'];
            displaySearchResults($searchString);
        }
        else {
            displaySearchForm(); 
        }
    }
?>