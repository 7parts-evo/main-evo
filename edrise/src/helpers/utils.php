<?php

function redirect($url, $time = 0) {
    if ($time != 0) {
        @header("Location:" . $url);
    } else {
        @header("Location:" . $url);
    }
}

function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

function generateRandomPassword($length = 8) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $count = mb_strlen($chars);

    for ($i = 0, $result = ''; $i < $length; $i++) {
        $index = rand(0, $count - 1);
        $result .= mb_substr($chars, $index, 1);
    }

    return $result;
}

function sendMessage($email, $msg) {
//    $msg = wordwrap($msg, 70, "\r\n");
//    return mail($email, 'Edrise', $msg);
}