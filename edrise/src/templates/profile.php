<?php
if (!User::checkAuth()) {
    redirect('/');
}
if (is_ajax()) {
    $skin = $_REQUEST['skin'];
    if (!empty($skin)) {
        Player::setSkin($skin);
    }
    return;
}
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">

    <!--fonts:css-->
    <link rel="stylesheet" href="css/fonts.css">
    <!--endinject-->

    <link href="css/profile/style.css" rel="stylesheet">
    <link href="css/profile/position.css" rel="stylesheet">
    <link href="css/profile/colors_style.css" rel="stylesheet">
    <link rel="stylesheet" href="css/left_menu_style.css">
    <script src="libs/jquery.js"></script>
    <script src="js/profile.js"></script>
    <script src="js/left_menu.js"></script>
    <script src="js/settings_button.js"></script>

    <script>
        var skins = {};
        <?php
        $prefix = dirname(__FILE__);
        $dir = $prefix . '/img/ameba_pics/';
        $list = scandir($dir);
        foreach ($list as $skin) {
            if (is_dir($dir . $skin) && $skin != '.' && $skin != '..') {
                echo "skins['$skin'] = {};";
                $colors = scandir($dir . $skin);
                foreach ($colors as $c) {
                    if (!is_dir($c)) {
                        $t = explode('.', $c)[0];
                        echo "skins['$skin']['$t'] = 'img/ameba_pics/$skin/$c';";
                    }
                }

            }
        }
        ?>
        var selectedSkin = <?php
            $skin = explode(',', Player::getSkin());
            $type = $skin[0];
            $color = $skin[1];
        echo "['$type', '$color'];"?>;
    </script>

    <title></title>
</head>
<body>

<div id="enter">
    <div id="settings_menu">
        <div id="cross_button"></div>
        <ul id="settings_list">
            <li class="bold"><b>E-mail:</b></li><li>adress@mail.ru</li>
            <li class="link_title">Изменить e-mail</li>
            <li class="hidden"><input type="text"></li>
            <li class="bold"><b>Имя пользователя</b></li><li>username</li>
            <li class="hidden"><input type="text"></li>
            <li class="link_title">Изменить имя пользователя</li>
            <li class="bold"><b>Пароль</b></li><li>* * * * *</li>
            <li class="bold"><b>Новый пароль</b></li>
            <li><input type="text"></li>
            <li class="bold"><b>Повторите пароль</b></li>
            <li><input type="text"></li>
        </ul>
        <button id="accept_button">ACCEPT</button>
    </div>
    <a href="/logout"><div id="log_out_button"></div></a>
    <div id="settings_button"></div>
</div>
<div id="left_menu">
    <div id="arrow_button"></div><div id="arrow_button_back"></div>
    <ul>
        <li>На главную</li>
        <li>Лаборатория</li>
        <li>Посмотреть профиль</li>
        <li>В мир</li>
        <li>Настройки</li>
    </ul>
</div>

<div id="upper_menu">
    <div id="logo_wrapper">
        <img  id="logo" src="img/logo_evolution_small.svg"/>
        <span id="title">EDRISE</span>
    </div>
</div>

<div id="content">
    <div id="information">
        <br>
        <span class="heading">Login</span><br>
        <span><?php echo $_SESSION['user']['login']?></span><br><br>
        <div class="line"></div><br>
        <span class="heading">E-mail</span><br>
        <span><?php echo $_SESSION['user']['email']?></span><br><br>
        <div class="line"></div><br>
        <div id="buttons_container">
            <div class="square_button" id="save_strategy"><div class="button_pic" id="floppy"></div> </div>
            <div class="square_button" id="tutorial"><div class="button_pic" id="book"></div></div>
            <div class="square_button" id="mission"><div class="button_pic" id="cup"></div></div>
            <div class="label" id="save_strategy_label">Сохранить стратегию</div>
            <div class="label" id="tutorial_label">Учебник</div>
            <div class="label" id="mission_label">Миссия</div>
        </div>
        <div class="line"></div><br>
        <span class="heading">Состояние:</span><br>
        <span>разработка</span>
    </div>

    <div id="hero_properties_container">
        <div id="hero_choice">
                <div id="hero_picture"></div>
                <div class="line" id="ameba_line"></div>
                <div id="hero_level">Амёба</div>
        </div>
        <div id="hero_settings">
            <div id="heroes_list">
<!--                <div id="scrolling_arrow_up"></div>-->
                <div class="hero_item selected" id="first"></div>
                <div class="hero_item" id="second"></div>
                <div class="hero_item" id="third"></div>
                <div class="hero_item" id="fourth"></div>
                <div class="hero_item" id="fifth"></div>
<!--                <div id="scrolling_arrow_down"></div>-->
            </div>
            <div id="colors_list">
                <div class="color_item selected" id="yellow"></div>
                <div class="color_item" id="blue"></div>
                <div class="color_item" id="green"></div>
                <div class="color_item" id="green2"></div>
                <div class="color_item" id="violet"></div>
                <div class="color_item" id="red"></div>
            </div>
        </div>
        <button id="lab_button">ЛАБОРАТОРИЯ</button>
    </div>
</div>
</body>
</html>