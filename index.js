var Stream = require('stream');

module.exports = function () {
    var s = new Stream;
    s.readable = true;

    var args = arguments;
    var step = 1;
    var infinite = false;

    if (args.length == 1 && typeof args[0] == 'number') {
        var i = 0, j = args[0];
    }
    else if (args.length == 1 && typeof args[0] == 'string') { // 'start[,next]..[end]'
        var arg = args[0];
        var startOpen = false, endClosed = false;
        if (arg[0] == '(' || arg[0] == '[') {
            if (arg[0] == '(') startOpen = true;
            arg = arg.slice(1);
        }
        if (arg.slice(-1) == ']') endClosed = true;

        var parts = arg.split('..');
        if (parts.length != 2)
            s.emit('error', "single argument range takes 'start..' or 'start..end' or 'start,next..end'");

        if (parts[1] == '') { // 'start..'
            var i = parts[0];
            infinite = true;
        }
        else { // 'start[,next]..end'
            var progression = parts[0].split(',');
            if (progression.length == 1) { // start..end
                var i = parts[0], j = parts[1];
            }
            else { // 'start,next..end'
                var i = progression[0], j = parts[1];
                step = Math.abs(progression[1]-i);
            }
        }

        i = parseInt(i, 10);
        j = parseInt(j, 10);

        if (startOpen) {
            if (infinite || i < j) i++;
            else i--;
        }

        if (endClosed) {
            if (i < j) j++;
            else j--;
        }
    }
    else if (args.length == 2 || args.length == 3) { // start, end[, step]
        var i = args[0], j = args[1];
        if (args.length == 3) {
            var step = args[2];
        }
    }
    else {
        s.emit('error', "range takes 1, 2 or 3 arguments");
    }
    if (infinite) {
        process.nextTick(function g () {
            s.emit('data', i++);
            process.nextTick(g);
        });
    }
    else {
        process.nextTick(function () {
            if (i < j) {
                for (; i<j; i+=step) {
                    s.emit('data', i)
                }
            }
            else {
                for (; i>j; i-=step) {
                    s.emit('data', i)
                }
            }
            s.emit('end');
        });
    }
    return s;
}
