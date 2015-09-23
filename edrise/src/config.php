<?php

define('DB_HOST', '188.166.85.160');
define('DB_USER', 'php_back_user');
define('DB_PASSWORD', 'barracuda');
define('DB_NAME', 'edrise');

define('GAME_HOST', 'localhost:8888');

require_once 'helpers/utils.php';
require_once 'helpers/db.php';

require_once 'libs/router.php';
require_once 'libs/user.php';
require_once 'libs/request.php';
require_once 'libs/player.php';

DB::connect();

session_start();