<?php
if (User::checkAuth()) {
    redirect('/profile');
}
if (is_ajax()) {
    $result = Request::createRequest($_REQUEST);
    echo json_encode(array(
        'result' => $result ? 1 : 2
    ));
    return;
}
?>
<!DOCTYPE html>
<html>
<head lang="en">

    <!--fonts:css-->
    <link rel="stylesheet" href="css/fonts.css">
    <!--endinject-->

    <link href="css/invite/style.css" rel="stylesheet">
    <link href="css/invite/position.css" rel="stylesheet">

    <script src="libs/jquery.js"></script>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <div id="enter">
        <form action="/enter" method="post">
            <button type="submit" id="enter-button">ВХОД</button>
        </form>
    </div>
    <div id="logo-wrapper">
        <img id="logo" src="img/logo_evolution.svg"/>
    </div>
    <div id="letter">
        Добрый день!
        <br> <br>
        Меня зовут <input id="name" type="text" placeholder="Простейший Иван Иванович">, но на просторах сети Интернет меня знают,
        как <input id="login" type="text" placeholder="bacterium_309"> .
        <br>Мне <input id="age" type="text" placeholder="23 года"> от роду. <br>
        Хочу попробовать свои силы в большой битве организмов! Немного обо мне: я - <input id="status" type="text" placeholder="студент">
        из <input id="city" type="text" placeholder="Барнаула"> . В свободное время занимаюсь <input id="hobby" type="text" placeholder="прекрасными и полезными делами"> .
        Я хочу придумать лучшую боевую стратегию и окунуться в мир путешествий и приключений, потому что
        <input id="reason" type="text" placeholder="у меня на это есть веская причина"> .
        Я пройду путь от простейших форм жизни до более высоких ступеней развития, приму бой и дам отпор другим представителям фауны.<br>Вперед!
        <br> <br>
        Жду ответа на <input id="email" type="text" placeholder="bacterium@ameba.com"> .
        <br> <br>
        P.S.: Я понимаю, что игра сейчас находится на этапе тестирования, поэтому я обещаю сообщать разработчикам о своих пожеланиях, претензиях
        и найденных ошибках.
    </div>
    <div id="button-wrapper">
        <button id="button">ОТПРАВИТЬ</button>
    </div>

    <div id="opacity"></div>

    <div id="thanks">
        Спасибо!<br>
        Проверяйте почту, <br>в скором времени там будет<br> письмо от нас.<br>
        <form action="/" method="post">
            <button id="thanks-button">ОК</button>
        </form>
    </div>

    <div id="error">
        <br>Извините, что-то пошло не так...<br>Попробуйте позднее.<br><br>
        <form action="/" method="post">
            <button id="error-button">ОК</button>
        </form>
    </div>
    <script src="js/invite.js"></script>
</body>
</html>