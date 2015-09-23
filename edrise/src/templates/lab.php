<?php
if (!User::checkAuth()) {
    redirect('/');
}
?>
<!DOCTYPE html>
<html ng-app="main-app">
<head lang="en">
    <meta charset="UTF-8">
    <title></title>

    <script>
        document.game_host = '<?php echo GAME_HOST; ?>';
        document.secret = '<?php echo $_SESSION['secret']; ?>';
        document.skinPath = '<?php
            $skin = explode(',', Player::getSkin());
            $type = $skin[0];
            $color = $skin[1];
            echo "img/ameba_pics/$type/$color.svg";
        ?>';
    </script>

    <script src="libs/angular.js"></script>
    <script src="libs/paper-full.js"></script>
    <script src="libs/socket.io.js"></script>
    <script src="libs/underscore.js"></script>
    <script src="libs/jquery.js"></script>
<!--    <script src="libs/coffee-script.js"></script>-->
    <script src="libs/ace.js"></script>

    <link rel="stylesheet" href="css/lab/position.css">
    <link rel="stylesheet" href="css/lab/play.css">
    <link rel="stylesheet" href="css/lab/tester.css">
    <link rel="stylesheet" href="css/droplet/droplet.css"/>

    <script src="js/droplet/droplet-full.js"></script>
    <script src="js/droplet/dropletCreate.js"></script>
    <script src="js/connection/ConnectionService.js"></script>
    <script src="js/lab/tester.js"></script>
    <script src="js/lab/play.js"></script>
    <script src="js/shared.js"></script>
    <script src="js/renderer/renderer.js"></script>
    <script src="js/lab/main-app.js"></script>
</head>
<body ng-controller="MainController as ctrl">
    <div ng-show="shared.state == 'loading'">LOADING</div>
    <tester ng-show="shared.state == 'tester'"></tester>
    <play ng-show="shared.state == 'play'"></play>
</body>
</html>