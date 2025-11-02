<?php
// =================================================================
// DATABASE CONNECTION CONFIGURATION
// =================================================================
// Please update the following variables with your MySQL database
// credentials to connect to your database.
//
// - $servername: Your database host (e.g., "localhost").
// - $username: Your database username.
// - $password: Your database password.
// - $dbname: The name of your database.
// =================================================================

$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
