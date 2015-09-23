module.exports = function () {

    var isolator = function () {
        var args = Array.prototype.slice.apply(arguments);
        var tmp = Function.apply(Object.create(null), args);
        return function () {
            return tmp.apply(Object.create(null), Array.prototype.slice.apply(arguments));
        };
    };

    var move = function () {};
    var emit = function (event, data) {
        postMessage({
            type: event,
            data: data
        })
    };

    var handlers = {
        code: function (data) {
            move = function (scope) {
                emit('start', scope);
                try {
                    isolator('self', 'around', data.code)(scope.self_arg, scope.around);
                    emit('finish', scope);
                } catch (err) {
                    emit('error', err.message);
                }
            }
        },
        run: function (data) {
            move(data.scope);
        }
    };

    this.onmessage = function (event) {
        if (handlers[event.data.type]) {
            handlers[event.data.type](event.data);
        }
    };
};