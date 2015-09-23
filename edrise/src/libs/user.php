<?php
class User {
    public static function auth($email, $pass, $remember=false) {
        $dbData = DB::selectUser($email);
        if ($dbData['password'] == md5($pass)) {
            if ($remember) {
                $_COOKIE['user_id'] = $dbData['id'];
                $_COOKIE['email'] = $dbData['email'];
                $_COOKIE['key'] = $dbData['password'];
            }
            $_SESSION['user'] = $dbData;

            $secret = generateRandomPassword(64);
            DB::setUserSecret($dbData['id'], $secret);
            $_SESSION['secret'] = $secret;
            return true;
        }
        return false;
    }
    public static function logout() {
        DB::setUserSecret($_SESSION['user']['id'], NULL);
        unset($_COOKIE['user_id']);
        unset($_COOKIE['email']);
        unset($_COOKIE['key']);
        setcookie('user_id', null, -1, '/');
        setcookie('email', null, -1, '/');
        setcookie('key', null, -1, '/');
        session_destroy();
    }
    public static function checkAuth() {
        if (isset($_SESSION['user']) && !empty($_SESSION['user'])) {
            return true;
        }
        if (isset($_COOKIE['user_id']) && !empty($_COOKIE['user_id'])) {
            $dbData = DB::selectUser($_COOKIE['email']);
            if ($dbData['id'] == $_COOKIE['user_id'] &&
                $dbData['email'] == $_COOKIE['email'] &&
                $dbData['password'] == $_COOKIE['key']) {
                $_SESSION['user'] = $dbData;
                return true;
            }
        }
        return false;
    }
    public static function isAdmin() {
        return isset($_SESSION['user']['admin']) && !empty($_SESSION['user']['admin']);
    }
    public static function createUser($data) {
        $pass = generateRandomPassword();
        if (DB::insertUser(array(
            "email" => $data['email'],
            'password' => md5($pass),
            'login' => $data['login'],
            'admin' => $data['admin'],
            'request_id' => $data['request_id']
        ))) {
            return $pass;
        };
        return false;
    }
}