var make_player = require('../player/make_player.js');
var make_food = require('../food/make_food.js');
var make_wall = require('../wall/make_wall.js');

module.exports = function (world, scope) {
    world.make_player = function (opts) {
        var player = make_player.apply(this, [scope.unitCounter++, opts]);
        scope.units.push(player);
        this.trigger('new-player', player);
        return player;
    };
    world.make_food = function (opts) {
        var food = make_food.apply(this, [scope.unitCounter++, opts]);
        scope.units.push(food);
        this.trigger('new-food', food);
        return food;
    };
    world.make_wall = function (opts) {

    };
    return world;
};