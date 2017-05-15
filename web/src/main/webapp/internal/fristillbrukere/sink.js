(function () {
    function addContent(el, contents) {
        contents.forEach(function (content) {
            if (typeof content === 'string') {
                el.appendChild(document.createTextNode(content));
            } else if (Array.isArray(content)) {
                addContent(el, content);
            } else {
                el.appendChild(content);
            }
        });
    }

    function createElement(/* tag, attrs, ...contents */) {
        var args = Array.prototype.slice.call(arguments);
        var tag = args.splice(0, 1)[0];
        var attrs = args.splice(0, 1)[0];
        var contents = args;

        var el = document.createElement(tag);

        Object.keys(attrs)
            .forEach(function (attrKey) {
                el.setAttribute(attrKey, attrs[attrKey]);
            });

        addContent(el, contents);

        return el;
    }

    function Sink(el, container) {
        this.el = el;
        this.container = container;
    }

    Sink.of = function(el) {
        return new Sink(el);
    };

    Sink.createElement = createElement;

    Sink.prototype.place = function() {
        if (!this.el || !this.container) {
            throw new Error('Both `el` and `container` must be defined.');
        }

        this.container.innerHTML = '';
        var that = this;
        if (Array.isArray(this.el)) {
            this.el.forEach(function(e) {
                that.container.appendChild(e);
            })
        } else {
            this.container.appendChild(this.el);
        }
    };

    Sink.prototype.into = function(container) {
        this.container = container;
        this.place();
    };

    window.Sink = Sink;
})();