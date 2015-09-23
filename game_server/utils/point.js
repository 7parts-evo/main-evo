function Point(arg0, arg1) {
    var type = typeof arg0;
    if (type === 'number') {
        var hasY = typeof arg1 === 'number';
        this.x = arg0;
        this.y = hasY ? arg1 : arg0;
        if (this.__read)
            this.__read = hasY ? 2 : 1;
    } else if (type === 'undefined' || arg0 === null) {
        this.x = this.y = 0;
        if (this.__read)
            this.__read = arg0 === null ? 1 : 0;
    } else {
        if (Array.isArray(arg0)) {
            this.x = arg0[0];
            this.y = arg0.length > 1 ? arg0[1] : arg0[0];
        } else if (arg0.x != null) {
            this.x = arg0.x;
            this.y = arg0.y;
        } else if (arg0.width != null) {
            this.x = arg0.width;
            this.y = arg0.height;
        } else if (arg0.angle != null) {
            this.x = arg0.length;
            this.y = 0;
            this.setAngle(arg0.angle);
        } else {
            this.x = this.y = 0;
            if (this.__read)
                this.__read = 0;
        }
        if (this.__read)
            this.__read = 1;
    }
}

Point.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
};
Point.prototype.equals = function(point) {
    return this === point || point
        && (this.x === point.x && this.y === point.y
        || Array.isArray(point)
        && this.x === point[0] && this.y === point[1])
        || false;
};
Point.prototype.clone = function() {
    return new Point(this.x, this.y);
};
Point.prototype.toString = function() {
    var f = Formatter.instance;
    return '{ x: ' + f.number(this.x) + ', y: ' + f.number(this.y) + ' }';
};
Point.prototype.getLength = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
Point.prototype.setLength = function(length) {
    if (this.isZero()) {
        var angle = this._angle || 0;
        this.set(
            Math.cos(angle) * length,
            Math.sin(angle) * length
        );
    } else {
        var scale = length / this.getLength();
        if (scale === 0)
            this.getAngle();
        this.set(
            this.x * scale,
            this.y * scale
        );
    }
};
Point.prototype.getAngle = function() {
    return this.getAngleInRadians.apply(this, arguments) * 180 / Math.PI;
};
Point.prototype.setAngle = function(angle) {
    this.setAngleInRadians.call(this, angle * Math.PI / 180);
};
Point.prototype.getAngleInRadians = function() {
    if (!arguments.length) {
        return this.isZero()
            ? this._angle || 0
            : this._angle = Math.atan2(this.y, this.x);
    } else {
        var point = arguments[0],
            div = this.getLength() * point.getLength();
        if (div === 0) {
            return NaN;
        } else {
            var a = this.dot(point) / div;
            return Math.acos(a < -1 ? -1 : a > 1 ? 1 : a);
        }
    }
};
Point.prototype.setAngleInRadians = function(angle) {
    this._angle = angle;
    if (!this.isZero()) {
        var length = this.getLength();
        this.set(
            Math.cos(angle) * length,
            Math.sin(angle) * length
        );
    }
};
Point.prototype.getQuadrant = function() {
    return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
};

Point.prototype.getDistance = function() {
    var point = arguments[0],
        x = point.x - this.x,
        y = point.y - this.y,
        d = x * x + y * y,
        squared = Base.read(arguments);
    return squared ? d : Math.sqrt(d);
};

Point.prototype.normalize = function(length) {
    if (length === undefined)
        length = 1;
    var current = this.getLength(),
        scale = current !== 0 ? length / current : 0,
        point = new Point(this.x * scale, this.y * scale);
    if (scale >= 0)
        point._angle = this._angle;
    return point;
};

Point.prototype.rotate = function(angle, center) {
    if (angle === 0)
        return this.clone();
    angle = angle * Math.PI / 180;
    var point = center ? this.subtract(center) : this,
        s = Math.sin(angle),
        c = Math.cos(angle);
    point = new Point(
        point.x * c - point.y * s,
        point.x * s + point.y * c
    );
    return center ? point.add(center) : point;
};

Point.prototype.transform = function(matrix) {
    return matrix ? matrix._transformPoint(this) : this;
};

Point.prototype.add = function() {
    var point = arguments[0];
    return new Point(this.x + point.x, this.y + point.y);
};

Point.prototype.subtract = function() {
    var point = arguments[0];
    return new Point(this.x - point.x, this.y - point.y);
};

Point.prototype.multiply = function() {
    var point = arguments[0];
    return new Point(this.x * point.x, this.y * point.y);
};

Point.prototype.divide = function() {
    var point = arguments[0];
    return new Point(this.x / point.x, this.y / point.y);
};

Point.prototype.modulo = function() {
    var point = arguments[0];
    return new Point(this.x % point.x, this.y % point.y);
};

Point.prototype.negate = function() {
    return new Point(-this.x, -this.y);
};

Point.prototype.isInside = function() {
    return Rectangle.read(arguments).contains(this);
};

Point.prototype.isClose = function(point, tolerance) {
    return this.getDistance(point) < tolerance;
};

Point.prototype.isColinear = function(point) {
    return Math.abs(this.cross(point)) < 1e-12;
};

Point.prototype.isOrthogonal = function(point) {
    return Math.abs(this.dot(point)) < 1e-12;
};

Point.prototype.isZero = function() {
    return this.x === 0 && this.y === 0;
};

Point.prototype.isNaN = function() {
    return isNaN(this.x) || isNaN(this.y);
};

Point.prototype.dot = function() {
    var point = arguments[0];
    return this.x * point.x + this.y * point.y;
};

Point.prototype.cross = function() {
    var point = arguments[0];
    return this.x * point.y - this.y * point.x;
};

Point.prototype.project = function() {
    var point = arguments[0];
    if (point.isZero()) {
        return new Point(0, 0);
    } else {
        var scale = this.dot(point) / point.dot(point);
        return new Point(
            point.x * scale,
            point.y * scale
        );
    }
};

Point.prototype.__defineGetter__('angle', function () {
    return this.getAngle();
});
Point.prototype.__defineSetter__('angle', function (v) {
    this.setAngle(v);
});
Point.prototype.__defineGetter__('length', function () {
    return this.getLength();
});
Point.prototype.__defineSetter__('length', function (v) {
    this.setLength(v);
});

var make_point = function() {
    var _args = arguments;
    function F() {
        return Point.apply(this, _args);
    }
    F.prototype = Point.prototype;
    return new F();
};
module.exports = make_point;