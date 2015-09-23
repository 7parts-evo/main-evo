<?php
require_once 'low_level_route.php';
require_once 'config.php';

Router::$prefix = 'templates/';
Router::addRule('start', 'start.php');
Router::addRule('enter', 'enter.php');
Router::addRule('invite', 'invite.php');
Router::addRule('profile', 'profile.php');
Router::addRule('requests', 'requests.php');
Router::addRule('logout', 'logout.php');
Router::addRule('lab', 'lab.php');
Router::addRule('tutorial', 'tutorial.php');
Router::addRule('level', 'level.php');

require_once Router::dispatcher($_SERVER['REQUEST_URI']);