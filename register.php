<?php

include 'connect.php';

if(isset($_POST['signUp'])){
    $firstName=$_POST['fName'];
    $lastName=$_POST['lName'];
    $email=$_POST['email'];
    $password=$_POST['password'];
    $password=md5($password);

    $checkEmail="SELECT * From users where email='$email'";
    $result=$conn->query($checkEmail);
    if ($result->num_row>0){
        echo "Email Address Already Exists";
    }
    else{
        $insertquery="INSERT INTO users(firstName,lastName,email,password)";
                       VALUES ('$firstName','$lastName', '$email','$password');
            if($conn->query($insertQuery)==TRUE){
                header("location: login.php");
            }
            else{
                echo "Error:" . $conn->error;
            }           

    }
    
}

if(isset($_POST['signIn'])){
    $email=$_POST['email'];
    $password=$_POST['password'];
    $password=md5($password);

    $sql="SELECT * FROM users WHERE email='$email' and passwords='$password'";
    $result=$conn->query($sql);
    if($result->num_rows>0){
        session_start();
        $row=$result->fetch_assoc();
        $_SESSION['email']=$row['email'];
        header("Location: index.html");    /* Change later */
        exit(); 
    }
    else{
        echo "Not found, Incorrect Email or Password";
    }

}
?>