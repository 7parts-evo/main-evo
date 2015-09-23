<?php

class Router {
    public static $prefix = '';
    private static $routers;

    public static function addRule($url, $template) {
        self::$routers[$url] = $template;
    }

    public static function dispatcher($url) {
        $url = strip_tags(trim(trim(trim(explode('?', $url)[0]), '/')));
        $route = explode('/', $url)[0];
        if (!empty($route)) {
            return self::$prefix . self::$routers[$route];
        }
        return self::$prefix . self::$routers['start'];
    }
}