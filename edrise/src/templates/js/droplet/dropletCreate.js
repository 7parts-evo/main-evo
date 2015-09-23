document.createEditor = (function ($, editorSelector, toggleSelector) {
    var palette = [
        {
            name: 'Self',
            color: 'blue',
            blocks: [
                {
                    block: 'self.direction = __;',
                    title: 'Set the direction'
                },
                {
                    block: 'self.direction',
                    title: 'Get the direction'
                },
                {
                    block: 'self.speed',
                    title: 'Get the speed'
                }, {
                    block: 'self.size',
                    title: 'Get the size'
                }, {
                    block: 'self.radius',
                    title: 'Get the radius'
                }
            ]
        }, {
            name: 'Around',
            color: 'blue',
            blocks: [
                {
                    block: 'obj',
                    title: 'Get the object'
                },
                {
                    block: 'obj.type === "player"',
                    title: 'is object a player'
                },
                {
                    block: 'obj.player === "food"',
                    title: 'is object a food'
                },
                {
                    block: 'obj.direction',
                    title: 'Get the direction of the obj'
                },
                {
                    block: 'obj.size',
                    title: 'Get the size of the obj'
                },
                {
                    block: 'obj.distance',
                    title: 'Get the distance to the center of obj'
                }
            ]

        }, {
            name: 'Control',
            color: 'orange',
            blocks: [
                {
                    block: 'for (var i = 0; i < 4; i++) {\n  __;\n}',
                    title: 'Do something multiple times'
                },
                {
                    block: 'if (__) {\n  __;\n}',
                    title: 'Do something only if a condition is true'
                }, {
                    block: 'if (__) {\n  __;\n} else {\n  __;\n}',
                    title: 'Do something if a condition is true, otherwise do something else'
                }, {
                    block: 'while (__) {\n  __;\n}',
                    title: 'Repeat something while a condition is true'
                },
                {
                    block: 'for (var obj in around){\n __;\n}',
                    title: 'For each around object do something'
                },
                {
                    block: '__ || __',
                    title: 'Or'
                },
                {
                    block: '__ && __',
                    title: 'And'
                }
            ]
        }, {
            name: 'Math',
            color: 'green',
            blocks: [
                {
                    block: 'var x = __;',
                    title: 'Create a variable for the first time'
                }, {
                    block: 'x = __;',
                    title: 'Reassign a variable'
                }, {
                    block: '__ + __',
                    title: 'Add two numbers'
                }, {
                    block: '__ - __',
                    title: 'Subtract two numbers'
                }, {
                    block: '__ * __',
                    title: 'Multiply two numbers'
                }, {
                    block: '__ / __',
                    title: 'Divide two numbers'
                }, {
                    block: '__ === __',
                    title: 'Compare two numbers'
                }, {
                    block: '__ > __',
                    title: 'Compare two numbers'
                }, {
                    block: '__ < __',
                    title: 'Compare two numbers'
                }, {
                    block: 'random()',
                    title: 'Get a random number in a range from 0 to 1',
                    expansion: 'Math.random();'
                }, {
                    block: 'round(__)',
                    title: 'Round to the nearest integer'
                }, {
                    block: 'abs(__)',
                    title: 'Absolute value'
                }, {
                    block: 'max(__, __)',
                    title: 'Absolute value'
                }, {
                    block: 'min(__, __)',
                    title: 'Absolute value'
                }
            ]
        }, {
            name: 'Functions',
            color: 'violet',
            blocks: [
                {
                    block: 'function myFunction() {\n  __;\n}',
                    title: 'Create a function without an argument'
                }, {
                    block: 'function myFunction(n) {\n  __;\n}',
                    title: 'Create a function with an argument'
                }, {
                    block: 'myFunction()',
                    title: 'Use a function without an argument'
                }, {
                    block: 'myFunction(n)',
                    title: 'Use a function with argument'
                }
            ]
        }
    ];
    var options = {
        mode: 'javascript',
        modeOptions: {
            functions: {
                forEachAround: {
                    command: false,
                    value: true,
                    color: 'green'
                },
                'console.log': {
                    command: true,
                    color: 'white'
                }
            },
            categories: {
                conditionals: {
                    color: 'purple'
                },
                loops: {
                    color: 'green'
                },
                functions: {
                    color: 'blue'
                }
            }
        },
        palette: palette
    };
    return function () {
        var $container = $(editorSelector);
        $container.html('');
        var editor = new droplet.Editor($container[0], options);
        editor.setEditorState(localStorage.getItem('blocks') || '');
        editor.setValue(localStorage.getItem('text') || '');
        editor.clearUndoStack();
        editor.on('change', function () {
            localStorage.setItem('text', editor.getValue());
        });
        $(toggleSelector).on('click', function () {
            editor.toggleBlocks();
        });
        return editor;
    };

})($, '#editor', '#toggle');