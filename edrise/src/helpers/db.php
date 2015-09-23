<?php
class DB {
    private static $link;

    public static function connect() {
        if (empty(self::$link)) {
            self::$link = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        }
        return !empty(self::$link);
    }
    public static function selectUser($email) {
        $email = mysqli_escape_string(self::$link, $email);
        $query = "SELECT `id`, `email`, `password`, `login`, `secret`, `admin` FROM `users` WHERE `email`='$email';";
        $result = mysqli_query(self::$link, $query);
        $data = array('id' => 0);
        while ($row = mysqli_fetch_assoc($result)) {
            $data = array(
                'id' => $row['id'],
                'email' => $row['email'],
                'password' => $row['password'],
                'login' => $row['login'],
                'secret' => $row['secret'],
                'admin' => $row['admin']
            );
        }
        mysqli_free_result($result);
        return $data;
    }
    public static function setUserSecret($id, $secret) {
        $query = "UPDATE `users` SET `secret`='$secret' WHERE `id`=$id;";
        return mysqli_query(self::$link, $query);
    }
    public static function insertRequest($data) {
        foreach ($data as $key => $value) {
            if (isset($data[$key]) && !empty($data[$key]) && gettype($data[$key]) == 'string') {
                $data[$key] = mysqli_escape_string(self::$link, $data[$key]);
            }
        }
        $name = $data['name'];
        $login = $data['login'];
        $age = $data['age'];
        $status = $data['status'];
        $city = $data['city'];
        $hobby = $data['hobby'];
        $reason = $data['reason'];
        $email = $data['email'];
        $query = "INSERT INTO `requests`
                    (`name`, `login`, `age`, `status`, `city`, `hobby`, `reason`, `email`)
                  VALUES
                    ('$name', '$login', '$age', '$status', '$city', '$hobby', '$reason', '$email');";
        return mysqli_query(self::$link, $query);
    }
    public static function selectRequest($req_id) {
        $query = "SELECT * FROM `requests` WHERE id='$req_id'";
        $result = mysqli_query(self::$link, $query);
        $row = mysqli_fetch_assoc($result);
        mysqli_free_result($result);
        return $row;
    }
    public static function selectAllRequests() {
        $data = array(
            'unsorted' => []
        );
        $query = "SELECT * FROM `requests`;";
        $result = mysqli_query(self::$link, $query);
        while ($row = mysqli_fetch_assoc($result)) {
            $data['unsorted'][] = $row;
        }
        mysqli_free_result($result);
        return $data;
    }
    public static function updateRequestAccepted($req_id) {
        $req_id = mysqli_escape_string(self::$link, $req_id);
        $query = "UPDATE `requests` SET `state`=1, `accepted`=CURDATE() WHERE `id`='$req_id'";
        return mysqli_query(self::$link, $query);
    }
    public static function updateRequestDeclined($req_id) {
        $req_id = mysqli_escape_string(self::$link, $req_id);
        $query = "UPDATE `requests` SET `state`=0 WHERE `id`='$req_id'";
        return mysqli_query(self::$link, $query);
    }
    public static function insertUser($data) {
        $email = mysqli_escape_string(self::$link, $data['email']);
        $password = mysqli_escape_string(self::$link, $data['password']);
        $login = mysqli_escape_string(self::$link, $data['login']);
        $admin = isset($data['admin']) ? 1 : 0;
        $request_id = $data['request_id'];
        $query = "INSERT INTO `users`
                    (`email`, `password`, `login`, `admin`, `request_id`)
                  VALUES
                    ('$email', '$password', '$login', '$admin', '$request_id');";
        return mysqli_query(self::$link, $query);
    }
    public static function selectPlayer($user_id) {
        $query = "SELECT `id`, `user_id`, `skin` FROM `players` WHERE `user_id`='$user_id';";
        $result = mysqli_query(self::$link, $query);
        $data = array('id' => 0);
        while ($row = mysqli_fetch_assoc($result)) {
            $data = array(
                'id' => $row['id'],
                'user_id' => $row['user_id'],
                'skin' => $row['skin'],
            );
        }
        mysqli_free_result($result);
        return $data;
    }
    public static function updatePlayerUID($user_id, $skin) {
        $skin = mysqli_escape_string(self::$link, $skin);
        $query = "UPDATE `players` SET `skin`='$skin' WHERE `user_id`=$user_id;";
        return mysqli_query(self::$link, $query);
    }
    public static function updatePlayerPID($player_id, $skin) {
        $skin = mysqli_escape_string(self::$link, $skin);
        $query = "UPDATE `players` SET `skin`='$skin' WHERE `id`=$player_id;";
        return mysqli_query(self::$link, $query);
    }
    public static function insertPlayer($user_id) {
        $query = "INSERT INTO `players` (`user_id`) VALUES ($user_id);";
        return mysqli_query(self::$link, $query);
    }


    function __destruct() {}
}