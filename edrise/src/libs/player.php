<?php
class Player {

    public static function getSkin() {
        // TODO: refactor this
        $result = DB::selectPlayer($_SESSION['user']['id']);
        if ($result['id'] == 0) {
            DB::insertPlayer($_SESSION['user']['id']);
        }

        return DB::selectPlayer($_SESSION['user']['id'])['skin'];
    }
    public static function setSkin($skin) {
        return DB::updatePlayerUID($_SESSION['user']['id'], $skin);
    }
    public static function isInGame() {
        return DB::selectPlayer($_SESSION['user']['id'])['state'] == 1;
    }
}