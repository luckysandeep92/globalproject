<?php

$data = json_decode(file_get_contents("php://input"));
//print_r($data);die;
mysql_connect("localhost", "root", "") or die(mysql_error());
mysql_select_db("angularjs") or die(mysql_error());
if ($data->action == 'updatelisting') {
    $userid = "";
    if (!empty($data->userId->userId)) {
        $userid = $data->userId->userId;
    }
    $conn = new mysqli("localhost", "root", "", "angularjs");
    $sql = "select * from user where id=" . $userid;
    $result = $conn->query($sql);
    while ($data = mysqli_fetch_assoc($result)) {
        $allData = $data;
    }
    echo json_encode($allData);
} else if ($data->action == 'listing') {
    $conn = new mysqli("localhost", "root", "", "angularjs");
    $sql = "select * from user";
    $result = $conn->query($sql);
    while ($data = mysqli_fetch_assoc($result)) {
        $allData[] = $data;
    }
    echo json_encode($allData);
} elseif ($data->action == 'updateUser') {
    $userid = "";
    if (!empty($data->params->userId)) {
        $userid = $data->params->userId;
    }
    $conn = new mysqli("localhost", "root", "", "angularjs");
    $sql = "update user set fname='" . $data->fstname . " ',lname='" . $data->lstname . "' where id=" . $userid;
    $data = $conn->query($sql);
//    mysql_select_db('angularjs');
//    $retval = mysql_query($sql, $conn);
//     print_r($retval);die;
//    $sql1 = "select * from user where id=" . $userid;
//    $data = $conn->query($sql1);
//    while ($data = mysqli_fetch_assoc($data)) {
//        $allData = $data;
//    }
//    echo json_encode($data);
} else {
    $fstname = mysql_real_escape_string($data->fstname);
    $lstname = mysql_real_escape_string($data->lstname);
    mysql_query("INSERT INTO user (fname,lname) VALUES ('$fstname', '$lstname')");
    Print "Your information has been successfully added to the database.";
}
