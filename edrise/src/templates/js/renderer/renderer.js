document.renderer = (function () {
    var flag = false;
    var scroll;
    var minZoom;
    var worldSize;
    var make_point = function () {
        var _args = arguments;

        function F() {
            return paper.Point.apply(this, _args);
        }

        F.prototype = paper.Point.prototype;
        return new F();
    };
    var player_view, food_view, aura_view, me_view;
    var layer;
    var objects;
    var init = function () {
        var food_view_path = new paper.Path.Circle({
            radius: 1,
            fillColor: 'blue'
        });
        food_view = new paper.Symbol(food_view_path);
        food_view_path.remove();
        paper.project.importSVG(document.skinPath, {
                onLoad: function (item) {
                    player_view = new paper.Symbol(item.scale(0.003));
                    item.remove();
                    flag = true;
                }
            });

        var me_view_path = new paper.Path.Circle({
            radius: 1,
            fillColor: 'green'
        });
        me_view = new paper.Symbol(me_view_path);
        me_view_path.remove();
        
        var aura_view_path = new paper.Path.Circle({
            radius: 1,
            fillColor: new paper.Color(1, 1, 0, 0.3)
        });
        aura_view = new paper.Symbol(aura_view_path);
        aura_view_path.remove();
        layer = new paper.Group();
        objects = {};
    };
    var reSize = function (world){
            worldSize = [world.width, world.height];
            var d = Math.min(paper.view._element.parentNode.clientWidth / worldSize[0], paper.view._element.parentNode.clientHeight / worldSize[1]);
            paper.view._element.width = worldSize[0] * d;
            paper.view._element.height = worldSize[1] * d;
            paper.view.viewSize = [paper.view._element.clientWidth, paper.view._element.clientHeight];
            paper.view.center = [world.width / 2, world.height / 2];
            if (scroll){
                minZoom = Math.max(paper.view._element.clientWidth / world.width, paper.view._element.clientHeight / world.height);
                paper.view.zoom = minZoom;
            } else {
                paper.view.zoom = Math.min(paper.view._element.clientWidth / world.width, paper.view._element.clientHeight / world.height);
            }
    };
    var initialized = false;
    return {
        setup: function (canvas) {
            canvas.resize = true;
            scroll = false;
            minZoom = 0.2;
            worldSize = [0, 0];
            paper.setup(canvas);
            if (!initialized) {
                init();
            }
        },
        scrollOn: function(){
            scroll = true;
            var setCenter = function(center){
                center = center || [paper.view.center._x, paper.view.center._y];
                var visibleHeight = paper.view.viewSize.height / paper.view.zoom / 2;
                var visibleWidth = paper.view.viewSize.width / paper.view.zoom / 2;
                if (center[0] < visibleWidth) center[0] = visibleWidth; else if (center[0] > worldSize[0]-visibleWidth) center[0] = worldSize[0]-visibleWidth;
                if (center[1] < visibleHeight) center[1] = visibleHeight; else if (center[1] > worldSize[1]-visibleHeight) center[1] = worldSize[1]-visibleHeight;
                paper.view.center = center;
            };
            paper.view._element.onwheel = function(e) {
                var dzoom = 0.1;
                var d = e.deltaX + e.deltaY + e.deltaZ;
                    if (d < 0) paper.view.zoom += dzoom; else  paper.view.zoom -= dzoom;
                    if (paper.view.zoom < minZoom) paper.view.zoom = minZoom;
                    var dx = (e.clientX - paper.view._element.clientWidth / 2) / 2 / paper.view.zoom * minZoom * dzoom;
                    var dy = (e.clientY - paper.view._element.height / 2) / 2 / paper.view.zoom * minZoom * dzoom;
                    var newCenter = d < 0 ? [paper.view.center.x + dx, paper.view.center.y + dy] : [paper.view.center.x - dx, paper.view.center.y - dy];
                    setCenter(newCenter);
            };
            paper.view._element.onmousedown = function(e) {
                var lastCoordinate = [e.pageX, e.pageY];
                paper.view._element.onmousemove = function(e) {
                    var dx = e.pageX - lastCoordinate[0];
                    var dy = e.pageY - lastCoordinate[1];
                    setCenter([paper.view.center.x - dx / paper.view.zoom, paper.view.center.y - dy / paper.view.zoom]);
                    lastCoordinate = [e.pageX, e.pageY];
                };
                document.onmouseup = function() {
                    paper.view._element.onmousemove = null;
                }
            }
        },
        render: function (world) {
            var setPosition = function(unit, position_){
                if (position_ === undefined) position_ = unit.position;
                this.paper.position = make_point(position_);
                this.paper.scale(1 / this.unit.size);
                this.paper.scale(unit.size);
                if (this.aura !== undefined) {
                    this.aura.position = this.paper.position;
                    this.aura.scale(1 / this.unit.radius);
                    this.aura.scale(unit.radius);
                }
                this.unit = unit;
            };
            var addPlayer = function(unit, position_){
                if (position_ === undefined){
                    position_ = unit.position;
                }
                var obj;
                if (unit.id === world.meId) {
                    obj = me_view.place();
                } else {
                    obj = player_view.place();
                }
                obj.scale(unit.size);
                obj.position = make_point(position_);
                var object = {
                    paper: obj,
                    debug: null,
                    unit: unit,
                    exists: true,
                    setPosition: setPosition
                };
                if (unit.type === 'player' && (unit.id === world.meId || world.meId === undefined)){
                    var aura = aura_view.place();
                    aura.scale(unit.radius);
                    aura.position = obj.position;
                    aura.sendToBack();
                    object.aura = aura;
                };
                object.duplicated = false;
                return object;
            };
            var addFood = function(unit, position_){
                if (position_ === undefined){
                    position_ = unit.position;
                }
                var obj = food_view.place();
                obj.scale(unit.size);
                obj.position = make_point(position_);
                layer.addChild(obj);
                obj.sendToBack();
                var object = {
                    paper: obj,
                    debug: null,
                    unit: unit,
                    exists: true,
                    setPosition: setPosition
                };
                object.duplicated = false;
                return object;
            };
            var removeFromPaper = function(o){
                o.paper.remove();
                if (o.aura !== undefined)
                    o.aura.remove();
            }


            if (flag) {
                if (worldSize[0] !== world.width || worldSize[1] !== world.height) {
                    reSize(world);
                }

                for (var o in objects) {
                    if (objects.hasOwnProperty(o)) {
                        objects[o].exists = false;
                    }
                }
                world.units.forEach(function (unit) {
                    if (!objects[unit.id]) {
                        var obj;
                        if (unit.type === 'food') {
                            obj = addFood(unit);
                        } else if (unit.type === 'player'){
                            obj = addPlayer(unit);
                        }
                        objects[unit.id] = obj;
                    } else {
                        objects[unit.id].setPosition(unit);
                        objects[unit.id].exists = true;
                    }


                    if(unit.type === 'player' || unit.type === 'food'){
                        var x, y;
                        if(unit.position[0] < unit.radius || unit.position[0] > world.width - unit.radius){
                            if (unit.position[0] < unit.radius)
                                x = world.width + unit.position[0];
                            else
                                x = unit.position[0] - world.width;
                            var coordinate = [x, unit.position[1]];
                            if (objects[unit.id].horizontal === undefined){
                                if (unit.type === 'player') objects[unit.id].horizontal = addPlayer(unit, coordinate);
                                if (unit.type === 'food') objects[unit.id].horizontal = addFood(unit, coordinate);
                            } else {
                                objects[unit.id].horizontal.setPosition(unit, coordinate);
                            }
                        } else if (objects[unit.id].horizontal !== undefined) {
                            removeFromPaper(objects[unit.id].horizontal);
                            delete objects[unit.id].horizontal;
                        }

                        if(unit.position[1] < unit.radius || unit.position[1] > world.height - unit.radius){
                            if (unit.position[1] < unit.radius)
                                y = world.height + unit.position[1];
                            else
                                y = unit.position[1] - world.height;
                            var coordinate = [unit.position[0], y];
                            if (objects[unit.id].vertical === undefined){
                                if (unit.type === 'player') objects[unit.id].vertical = addPlayer(unit, coordinate);
                                if (unit.type === 'food') objects[unit.id].vertical = addFood(unit, coordinate);
                            } else {
                                objects[unit.id].vertical.setPosition(unit, coordinate);
                            }
                        }else if (objects[unit.id].vertical !== undefined) {
                            removeFromPaper(objects[unit.id].vertical);
                            delete objects[unit.id].vertical;
                        }

                        if (objects[unit.id].vertical !== undefined && objects[unit.id].horizontal !== undefined) {
                            var coordinate = [x, y];
                            if (objects[unit.id].angle === undefined){
                                if (unit.type === 'player') objects[unit.id].angle = addPlayer(unit, coordinate);
                                if (unit.type === 'food') objects[unit.id].angle = addFood(unit, coordinate);
                            } else {
                                objects[unit.id].angle.setPosition(unit, coordinate);
                            }
                        } else if (objects[unit.id].angle !== undefined) {
                            removeFromPaper(objects[unit.id].angle);
                            delete objects[unit.id].angle;
                        }
                    }
                });


                for (o in objects) {
                    if (objects.hasOwnProperty(o)) {
                        if (!objects[o].exists) {
                            if (objects[o].vertical !== undefined) {
                                removeFromPaper(objects[o].vertical);
                                delete objects[o].vertical;
                            }
                            if (objects[o].horizontal !== undefined) {
                                removeFromPaper(objects[o].horizontal);
                                delete objects[o].horizontal;
                            }
                            if (objects[o].angle !== undefined) {
                                removeFromPaper(objects[o].angle);
                                delete objects[o].angle;
                            }
                            removeFromPaper(objects[o]);
                            delete objects[o];
                        }
                    }
                }

                paper.view.draw();
            }
        }
    };
})();