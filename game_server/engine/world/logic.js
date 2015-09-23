module.exports = {
    initiator: function (world, scope) {
        scope.timer = -1;
        scope.frameCounter = 0;
        scope.tickCounter = 0;
        scope.unitCounter = 0;
        scope.units = [];
        world.preferences.init.call({}, world, scope);
    },
    framer: function (world, scope) {
        try{
            console.timeEnd("framer");
        } catch(e){}
        console.time("framer");
        scope.frameCounter++;
        world.trigger('frame', world.json);
        if (scope.frameCounter % world.preferences.tickLength === 0) {
            this.ticker(world, scope);
        }
        world.preferences.frame.call({}, world, scope);

    },
    ticker: function (world, scope) {
        console.log(scope.units.length)
        scope.tickCounter++;
        world.trigger('tick');
        world.preferences.tick.call({}, world, scope);
    }
};