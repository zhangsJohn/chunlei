Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../component"));

exports.default = {
    setDefaults: function() {
        return {
            icon: "cancel",
            hidden: !1,
            text: "",
            timer: 3e3,
            className: "",
            success: function() {}
        };
    },
    show: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = Object.assign({}, this.setDefaults(), e);
        this._toptips && (clearTimeout(this._toptips.timeout), this._toptips = null);
        var s = new t.default({
            scope: "$wux.toptips",
            data: i,
            methods: {
                hide: function() {
                    if (this.removed) return !1;
                    this.removed = !0, this.setHidden("weui-animate-notify-upout"), "function" == typeof i.success && i.success();
                },
                show: function() {
                    if (this.removed) return !1;
                    this.setVisible("weui-animate-notify-downin");
                }
            }
        });
        return this._toptips = {
            hide: s.hide
        }, this._toptips.timeout = setTimeout(s.hide, i.timer), s.show(), this._toptips.hide;
    },
    success: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return this.show(Object.assign({
            icon: "success"
        }, t));
    },
    info: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return this.show(Object.assign({
            icon: "info"
        }, t));
    },
    warn: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return this.show(Object.assign({
            icon: "warn"
        }, t));
    },
    error: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return this.show(Object.assign({
            icon: "cancel"
        }, t));
    }
};