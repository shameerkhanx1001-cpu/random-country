<?php
header("Content-Type: application/json; charset=UTF-8");
require_once '../../src/db.php';

$sql = "SELECT * FROM countries ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  echo json_encode($row);
} else {
  echo json_encode([]);
}

$conn->close();
?>
