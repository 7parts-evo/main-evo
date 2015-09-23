<?php
if (!User::checkAuth()) {
    redirect('/');
}
?>

<!DOCTYPE html>
<html>
<head lang="en">
    <script src="libs/jquery.js"></script>
    <script src="libs/bootstrap.js"></script>
    <link rel="stylesheet" href="libs/bootstrap.css">
    <link rel="stylesheet" href="css/tutorial/font-awesome.css">
    <link rel="stylesheet" href="css/tutorial/position.css">
    <link rel="stylesheet" href="css/tutorial/style.css">
    <link href="css/fonts.css" rel="stylesheet">
    <script src="js/settings_button.js"></script>
    <script src="js/left_menu.js"></script>
    <link href="css/left_menu_style.css" rel="stylesheet">
    <link href="css/settings.css" rel="stylesheet">

    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <div id="enter">
        <div id="log_out_button"></div>
        <div id="settings_button"></div>
    </div>

    <div id="upper_menu">
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

        <div id="logo_wrapper">
            <img  id="logo" src="./img/logo_evolution_small.svg"/>
            <span id="title">EDRISE</span>
        </div>
    </div>

    <div id="opacity"></div>

    <div id="welcome">
        Здесь можно будет совершенствовать себя и созданный искусственный интеллект.
        Для начала стоит пройти пять стартовых заданий, они покажут возможности системы и объяснят как она вообще работает.<br>
        Если ты опытный программист, то можешь пропустить этот этап и сразу выйти в мир, однако разбираться тебе придется самостоятельно.<br>
        Если же ты ничего не знаешь о программировании, но хочешь научиться и создать свой собственный искусственный интеллект,
        то советуем уделить нашему туториалу особое внимание.<br>
        На начальных уровнях вашим существом будет простейшее одноклеточное. Развивая свои навыки в написании ИИ вы получите возможность развить его.
        Для этого надо будет выполнять определенные задания, сначала в вашем аквариуме а затем и в открытом мире, сражаясь за выживание с другими игроками!
        Чем умнее будет ваш ИИ тем больше у него шансов выжить.<br>
        Удачи!<br>
        <button id="welcome-button">ОК</button>
    </div>

    <div id="main-div">
        <br>
        <h2>TUTORIAL</h2>
        <br>
        <div id="main-div-wrapper">
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingOne">
                        <h4 class="panel-title">
                            <a
                                    role="button"
                                    class="chapters"
                                    data-toggle="collapse"
                                    data-parent="#accordion"
                                    href="#collapseOne"
                                    aria-expanded="false"
                                    aria-controls="collapseOne">
                                <i class="icon fa fa-chevron-right"></i>
                                <i class="icon fa fa-chevron-down"></i>
                                ГЛАВА ПЕРВАЯ. НАЗВАНИЕ ГЛАВЫ.
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                        <div class="panel-body">
                            <table class="table table-hover" id="my-unstyled-table">
                                <thead>
                                <tr>
                                    <th>Движение</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><img  class="points" src="./img/point_done.svg"/><span class="done">Проба пера</span></td>

                                </tr>
                                <tr>
                                    <td><img  class="points" src="./img/point_during.svg"/><span class="during">About direction</span></td>

                                </tr>
                                <tr>
                                    <td><img  class="points" src="./img/point_empty.svg"/><span class="not-started">About size</span></td>

                                </tr>
                                <tr>
                                    <td><img  class="points" src="./img/point_empty.svg"/><span class="not-started">Kill him!</span></td>

                                </tr>
                                </tbody>
                                <thead>
                                <tr>
                                    <th>Around</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><img  class="points" src="./img/point_empty.svg"/><span class="not-started">Eating area</span></td>
                                </tr>
                                <tr>
                                    <td><img  class="points" src="./img/point_empty.svg"/><span class="not-started">Kill him!</span></td>

                                </tr>
                                <tr>
                                    <td><img  class="points" src="./img/point_empty.svg"/><span class="not-started">Kill him!</span></td>

                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingTwo">
                        <h4 class="panel-title">
                            <a class="collapsed chapters" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <i class="icon fa fa-chevron-right"></i>
                                <i class="icon fa fa-chevron-down"></i>
                                ГЛАВА ВТОРАЯ. НАЗВАНИЕ ГЛАВЫ.
                            </a>
                        </h4>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                        <div class="panel-body">
                            <ul class="list-group">
                                <li class="list-group-item">Избранное</li>
                                <li class="list-group-item">Пользователи</li>
                                <li class="list-group-item">Статьи</li>
                                <li class="list-group-item">Изображения</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingThree">
                        <h4 class="panel-title">

                            <a class="collapsed chapters"
                               role="button"
                               data-toggle="collapse"
                               data-parent="#accordion"
                               href="#collapseThree"
                               aria-expanded="false"
                               aria-controls="collapseThree">
                                <i class="icon fa fa-chevron-right"></i>
                                <i class="icon fa fa-chevron-down"></i>
                                ГЛАВА ТРЕТЬЯ. НАЗВАНИЕ ГЛАВЫ.
                            </a>
                        </h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                        <div class="panel-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                            3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.
                            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                            Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt
                            you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
    <script src="js/tutorial.js"></script>

</body>
</html>