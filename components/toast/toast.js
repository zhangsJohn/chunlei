Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../component"));

exports.default = {
    setDefaults: function() {
        return {
            type: "success",
            timer: 1500,
            color: "#fff",
            text: "已完成",
            success: function() {}
        };
    },
    data: function() {
        return [ {
            type: "success",
            icon: "success_no_circle",
            className: "weui-toast-success"
        }, {
            type: "cancel",
            icon: "cancel",
            className: "weui-toast-cancel"
        }, {
            type: "forbidden",
            icon: "warn",
            className: "weui-toast-forbidden"
        }, {
            type: "text",
            icon: "",
            className: "weui-toast-text"
        } ];
    },
    show: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s = Object.assign({}, this.setDefaults(), t);
        this.data().forEach(function(e, c) {
            e.type === t.type && (s.type = e.icon, s.className = e.className);
        });
        var c = new e.default({
            scope: "$wux.toast",
            data: s,
            methods: {
                hide: function(e) {
                    var t = this;
                    setTimeout(function() {
                        t.setHidden(), "function" == typeof e && e();
                    }, s.timer);
                },
                show: function() {
                    this.setVisible();
                }
            }
        });
        c.show(), c.hide(t.success);
    }
};