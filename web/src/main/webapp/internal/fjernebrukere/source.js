(function() {
    function Source(scope) {
        // Format { eventType: [ listener1, listener 2 ]}
        this.scope = scope;
        this.scopeListeners = {};
        this.listeners = {};
    }

    Source.prototype._addListener = function(type) {
        if (this.hasListener(type)) {
            throw new Error('Listener of type ' + type + ' already exists.');
        }

        var that = this;
        this.scopeListeners[type] = function(event) {
            that._handleEvent(type, event);
        };

        this.scope.addEventListener(type, this.scopeListeners[type]);
    };

    Source.prototype._removeListener = function(type) {
        if (!this.hasListener(type)) {
            throw new Error('Listener of type ' + type + ' doesnt exists on scope.');
        }

        this.scope.removeEventListener(type, this.scopeListeners[type]);
        delete this.scopeListeners[type];
    };

    Source.prototype._handleEvent = function(type, event, error) {
        (this.listeners[type] || [])
            .forEach(function(listener) {
                if (error) {
                    listener(event, error, type);
                } else {
                    listener(event, null, type);
                }
            });
    };

    Source.prototype.hasListener = function(type) {
        return !!this.listeners[type];
    };

    Source.prototype.listen = function(type, listener) {
        if (!this.hasListener(type)) {
            this._addListener(type);
            this.listeners[type] = [ listener ];
        } else {
            this.listeners[type].push(listener);
        }
    };

    Source.prototype.remove = function(type, listener) {
        const index = this.listeners[type].indexOf(listener);
        if (index >= 0) {
            this.listeners[type].splice(index, 1);

            if (this.listeners[type].length === 0) {
                this._removeListener(type);
            }
        }
    };

    Source.prototype.fromPromise = function(name, promise) {
        var that = this;

        that._handleEvent(name + '_PENDING');
        promise
            .then(function(data) {
                that._handleEvent(name + '_OK', data);
            }, function(error) {
                that._handleEvent(name + '_ERROR', null, error);
            });
    };

    function Event() {

    }

    Event.matches = function(filter, callback) {
        return function (event) {
            var target = event.target;

            target.matches = target.matches ||
                target.webkitMatchesSelector ||
                target.mozMatchesSelector ||
                target.msMatchesSelector ||
                target.oMatchesSelector;

            if (target.matches(filter)) {
                callback(event);
            }
        }
    };

    Source.Event = Event;

    window.Source = Source;
})();