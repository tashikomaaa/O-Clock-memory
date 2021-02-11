<?php
# Fill our vars and run on cli
# $ php -f db-connect-test.php

$dbname = 'oclock';
$dbuser = 'root';
$dbpass = '5eev2d2d1dlcV_';
$dbhost = '127.0.0.1';

$link = mysqli_connect($dbhost, $dbuser, $dbpass) or die("Unable to Connect to '$dbhost'");
mysqli_select_db($link, $dbname) or die("Could not open the db '$dbname'");

$test_query = "SHOW TABLES FROM $dbname";
$result = mysqli_query($link, $test_query);

$tblCnt = 0;
while($tbl = mysqli_fetch_array($result)) {
  $tblCnt++;
  #echo $tbl[0]."\n";
}

if (!$tblCnt) {
  echo "There are no tables\n";
} else {
  echo "There are $tblCnt tables\n";
} 
?>
