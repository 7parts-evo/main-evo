<?php
if (User::checkAuth()) {
    redirect('/profile');
}
if (isset($_POST["button"]) && $_POST["button"] == 'invite') {
    redirect('/invite');
}
if (isset($_POST["button"]) && $_POST["button"] == 'login') {
    if (User::auth($_POST['email'], $_POST['password'])) {
        redirect('/profile');
    }
}
?>
<!DOCTYPE html>
<html>
<head lang="en">

    <!--fonts:css-->
    <link rel="stylesheet" href="css/fonts.css">
    <!--endinject-->

    <link href="css/enter/style.css" rel="stylesheet">
    <link href="css/enter/position.css" rel="stylesheet">

    <meta charset="UTF-8">
    <title></title>
</head>
<body>

<div id="logo-wrapper">
    <img id="logo" src="img/logo_evolution.svg"/>
</div>
<div id="form">
    <form action="/enter" method="POST">
        <input name="email" id="email" type="text" placeholder="E-MAIL">
        <input name="password" id="password" type="password" placeholder="ПАРОЛЬ">
        <div id="button-wrapper">
                <button type="submit" name="button" value="login" id="enter-button">ВОЙТИ</button>
                <button type="submit" name="button" value="invite" id="invite-button"><span>ПОЛУЧИТЬ  ПРИГЛАШЕНИЕ</span></button>
        </div>
    </form>

</div>

</body>
</html>