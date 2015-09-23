<?php

class Request {

    public static function getAllRequests() {
        return DB::selectAllRequests();
    }
    public static function getRequest($req_id) {
        return DB::selectRequest($req_id);
    }
    public static function createRequest($data) {
        return DB::insertRequest($data);
    }
    public static function acceptRequest($req_id, $admin=false) {
        DB::updateRequestAccepted($req_id);
        $req = self::getRequest($req_id);
        $pass = User::createUser(array(
            'email' => $req['email'],
            'login' => $req['login'],
            'admin' => $admin ? 1 : 0,
            'request_id' => $req_id
        ));
        sendMessage($req['email'], "Ваша заявка одобрена. Пароль: $pass");
    }
    public static function declineRequest($req_id) {
        DB::updateRequestDeclined($req_id);
        $req = self::getRequest($req_id);
        sendMessage($req['email'], "Ваша заявка отклонена.");
    }
    public static function setRequestState($req_id, $state) {
        $state == 0 ? self::declineRequest($req_id) : self::acceptRequest($req_id);
    }

}