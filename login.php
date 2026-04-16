<?php
session_start();
include 'connect.php';

if (isset($_POST['signIn'])) {

    $email    = $_POST['email'];
    $password = md5($_POST['password']);

    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $_SESSION['email'] = $row['email'];

        header("Location: index.php");
        exit();

    } else {
        echo "Incorrect Email or Password";
    }
}
?>

<!DOCTYPE html>
<html lang="en"> 

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> PeakSportswear Project </title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>



<body class="login-page">

      
    <section id="header">
        <a href="#"> <img src="img/logo.png" class="logo" alt=""></a> 

        <div> 
            <ul id="navbar">
                <li><a href="index.php">Home</a></li>
                <li><a href="shop.html">Shop</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a class="active" href="login.php">Login</a></li>
                <li id="lg-bag"><a href="cart.html"><i class="fa-solid fa-bag-shopping"></i></a></li>
                <a href="#" id="close"><i class="far fa-times"></i></a>
            </ul>
        </div>
        <div id = "mobile">
            <a href="cart.html"><i class="fa-solid fa-bag-shopping"></i></a>
            <i id="bar" class="fas fa-outdent"></i>
        </div>
    </section>



        <div id ="signup" class="container">
        <h1 class="form-title">Register</h1>
        <form method ="post" action="register.php">
            <div class="input-group">
                <i class="fa-solid fa-user"></i>
                <input type="text" name="fName" id="fName" placeholder="First Name" required>
                <label for="fname"></label>
            </div>
            <div class="input-group">
                <i class="fa-solid fa-user"></i>
                <input type="text" name="lName" id="lName" placeholder="Last Name" required>
                <label for="lName"></label>
            </div>
            <div class="input-group">
                <i class="fa-regular fa-envelope"></i>
                <input type="email" name="email" id="email" placeholder="Email" required>
                <label for="email"></label>
            </div>
            <div class="input-group">
                <i class="fa-solid fa-lock"></i>
                <input type="password" name ="password" id="password" placeholder="Password" required>
                <label for="password"></label>
            </div>
            <input type="submit" class="btn" value="Sign Up" name="signUp">
            

        </form>
        <p class="or">
            ------or------
        </p>
        <div class="icons">
            <i class="fa-brands fa-google"></i>
            <i class="fa-brands fa-facebook"></i>
        </div>
        <div class="links">
            <p>Already Have Account?</p>
            <button id="signInButton">Sign In</button>
        </div>
    </div>
    

     <div id ="signIn" class="container">
        <h1 class="form-title">Sign In</h1>
        <form method ="post" action="login.php">
          
            <div class="input-group">
                <i class="fa-regular fa-envelope"></i>
                <input type="email" name="email" id="email" placeholder="Email" required>
                <label for="email"></label>
            </div>
            <div class="input-group">
                <i class="fa-solid fa-lock"></i>
                <input type="password" name="password" id="password" placeholder="Password" required>
                <label for="password"></label>
            </div>
            <p class="recover">
                <a href="#">Recover Password</a>
            </p>
            <input type="submit" class="btn" value="Sign In" name="signIn">
            

        </form>
        <p class="or">
            ------or------
        </p>
        <div class="icons">
            <i class="fa-brands fa-google"></i>
            <i class="fa-brands fa-facebook"></i>
        </div>
        <div class="links">
            <p>Don't have an account yet?</p>
            <button id="signUpButton">Sign Up</button>
        </div>
    </div>

  <script src="script.js"></script>
</body>

</html>