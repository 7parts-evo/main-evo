<?php
if (!User::isAdmin()) {
    redirect('/start');
}
if (is_ajax()) {
    $id = $_REQUEST['id'];
    $state = $_REQUEST['state'];
    $admin = $_REQUEST['admin'];
    if ($state == 1) {
        Request::acceptRequest($id, $admin);
    } else {
        Request::declineRequest($id);
    }
    $return = array(
        'result' => Request::getRequest($id)['state']
    );
    echo json_encode($return);
    return;
}

?>
<!doctype html>
<html>
<head>
    <link rel="stylesheet" href="css/requests/style.css">
    <script src="libs/jquery.js"></script>
    <script src="js/requests.js"></script>
    </head>
<body>
<table>
    <?php
    foreach (Request::getAllRequests()['unsorted'] as $req) {
        $class = 'unsorted';
        if ($req['state'] == 0) {
            $class = 'declined';
        } else if ($req['state'] == 1) {
            $class = 'accepted';
        }
        $id = $req['id'];
        echo "<tr id='req-$id' class='row $class'>";
        foreach ($req as $key => $value) {
            echo "<td class='$key'>$value</td>";
        }
        echo "<td><button onclick='button($id, 1)'>Accept</button></td>";
        echo "<td><button onclick='button($id, 0)'>Decline</button></td>";
        echo "<td><input type='checkbox' name='admin' id='admin-$id'/></td>";
        echo "</tr>";
    }
    ?>
</table>
</body>
</html>