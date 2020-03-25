<?php
   session_start(); // Connect to the existing session
   require_once('/home/common/mail.php'); // Add email functionality
   require_once('/home/common/dbInterface.php'); // Add database functionality
   processPageRequest(); // Call the processPageRequest() function

    function addMovieToCart($movieID) {
        $movie = movieExistsInDB($movieID);
        if($movie === 0) {
            $movie = file_get_contents('http://www.omdbapi.com/?apikey=fc7e3ddf&i='.$movieID.'&type=movie&r=json');
            $array = json_decode($movie, true);
            $imdbId = $array['imdbID'];
            $title = $array['Title'];
            $year = $array['Year'];
            $rating = $array['Rating'];
            $runtime = $array['Runtime'];
            $genre = $array['Genre'];
            $actors = $array['Actors'];
            $director = $array['Director'];
            $writer = $array['Writer'];
            $plot = $array['Plot'];
            $poster = $array['Poster'];
            
            $movie = addMovie($imdbId, $title, $year, $rating, $runtime, $genre, $actors, $director, $writer, $plot, $poster);
        }
        addMovieToShoppingCart($_SESSION['id'], $movie);
        echo displayCart();
    }

    function checkout($name, $address) {
        $message = displayCart(true);
        $result = sendMail(642829952, $address,  $name , "Your Receipt from myMovies!", $message); 
    }

    function createMovieList($forEmail=false) {
        if(isset($_SESSION['order'])) {
            $tempArray = getMoviesInCart($_SESSION['id'], $_SESSION['order']);
        }
        else {
            $tempArray = getMoviesInCart($_SESSION['id']);
        }
        ob_start(); // Create an output buffer
        require_once('./templates/movie_list.html');
        $message = ob_get_contents(); // Get the contents of the output buffer
        ob_end_clean(); // Clear the output buffer
        return $message;
    }

    function displayCart($forEmail=false) {
        $count = countMoviesInCart($_SESSION['id']);
        $list = createMovieList($forEmail);
        ob_start(); // Create an output buffer
        require_once('./templates/cart_form.html');
        $message = ob_get_contents(); // Get the contents of the output buffer
        ob_end_clean(); // Clear the output buffer
        return $message;
    }

    function processPageRequest() { 
        if(!isset($_SESSION['name'])) {
            header('Location: logon.php');
        }
        if($_GET) {
            if(isset($_GET['action'])) {
                if($_GET['action'] === 'add') {
                    $movieID = $_GET['movie_id'];
                    addMovieToCart($movieID);
                    echo displayCart();
                }
                else if($_GET['action'] === 'checkout') {
                    $name = $_SESSION['name'];
                    $address= $_SESSION['email'];
                    checkout($name, $address);
                    echo displayCart();
                }
                else if($_GET['action'] === 'remove') {
                    $movieID = $_GET['movie_id'];
                    removeMovieFromCart($movieID);
                    echo displayCart();
                }
                else if($_GET['action'] === 'update') {
                    $order = $_GET['order'];
                    updateMovieListing($order);
                }
            }
        }
        else {
            echo displayCart(); 
        }
    }

    function removeMovieFromCart($movieID) {
        removeMovieFromShoppingCart($_SESSION['id'], $movieID);
        echo displayCart();
    }

    function updateMovieListing($order) {
        $_SESSION['order'] = $order;
        $string = createMovieList(false);
        echo $string;
    }

?>