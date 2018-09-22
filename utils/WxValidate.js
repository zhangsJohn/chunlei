function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), i = function() {
    function i() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        t(this, i), Object.assign(this, {
            rules: e,
            messages: n
        }), this.__init();
    }
    return n(i, [ {
        key: "__init",
        value: function() {
            this.__initMethods(), this.__initDefaults(), this.__initData();
        }
    }, {
        key: "__initData",
        value: function() {
            this.form = {}, this.errorList = [];
        }
    }, {
        key: "__initDefaults",
        value: function() {
            this.defaults = {
                messages: {
                    required: "这是必填字段。",
                    email: "请输入有效的电子邮件地址。",
                    tel: "请输入11位的手机号码。",
                    url: "请输入有效的网址。",
                    date: "请输入有效的日期。",
                    dateISO: "请输入有效的日期（ISO），例如：2009-06-23，1998/01/22。",
                    number: "请输入有效的数字。",
                    digits: "只能输入数字。",
                    idcard: "请输入18位的有效身份证。",
                    equalTo: this.formatTpl("输入值必须和 {0} 相同。"),
                    contains: this.formatTpl("输入值必须包含 {0}。"),
                    minlength: this.formatTpl("最少要输入 {0} 个字符。"),
                    maxlength: this.formatTpl("最多可以输入 {0} 个字符。"),
                    rangelength: this.formatTpl("请输入长度在 {0} 到 {1} 之间的字符。"),
                    min: this.formatTpl("请输入不小于 {0} 的数值。"),
                    max: this.formatTpl("请输入不大于 {0} 的数值。"),
                    range: this.formatTpl("请输入范围在 {0} 到 {1} 之间的数值。")
                }
            };
        }
    }, {
        key: "__initMethods",
        value: function() {
            var t = this;
            t.methods = {
                required: function(e, n) {
                    if (!t.depend(n)) return "dependency-mismatch";
                    if ("number" == typeof e) e = e.toString(); else if ("boolean" == typeof e) return !0;
                    return e.length > 0;
                },
                email: function(e) {
                    return t.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e);
                },
                tel: function(e) {
                    return t.optional(e) || /^1[34578]\d{9}$/.test(e);
                },
                url: function(e) {
                    return t.optional(e) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e);
                },
                date: function(e) {
                    return t.optional(e) || !/Invalid|NaN/.test(new Date(e).toString());
                },
                dateISO: function(e) {
                    return t.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e);
                },
                number: function(e) {
                    return t.optional(e) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e);
                },
                digits: function(e) {
                    return t.optional(e) || /^\d+$/.test(e);
                },
                idcard: function(e) {
                    return t.optional(e) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e);
                },
                equalTo: function(e, n) {
                    return t.optional(e) || e === t.scope.detail.value[n];
                },
                contains: function(e, n) {
                    return t.optional(e) || e.indexOf(n) >= 0;
                },
                minlength: function(e, n) {
                    return t.optional(e) || e.length >= n;
                },
                maxlength: function(e, n) {
                    return t.optional(e) || e.length <= n;
                },
                rangelength: function(e, n) {
                    return t.optional(e) || e.length >= n[0] && e.length <= n[1];
                },
                min: function(e, n) {
                    return t.optional(e) || e >= n;
                },
                max: function(e, n) {
                    return t.optional(e) || e <= n;
                },
                range: function(e, n) {
                    return t.optional(e) || e >= n[0] && e <= n[1];
                }
            };
        }
    }, {
        key: "addMethod",
        value: function(t, e, n) {
            this.methods[t] = e, this.defaults.messages[t] = void 0 !== n ? n : this.defaults.messages[t];
        }
    }, {
        key: "isValidMethod",
        value: function(t) {
            var e = [];
            for (var n in this.methods) n && "function" == typeof this.methods[n] && e.push(n);
            return -1 !== e.indexOf(t);
        }
    }, {
        key: "formatTpl",
        value: function(t, e) {
            var n = this;
            return 1 === arguments.length ? function() {
                var e = Array.from(arguments);
                return e.unshift(t), n.formatTpl.apply(this, e);
            } : void 0 === e ? t : (arguments.length > 2 && e.constructor !== Array && (e = Array.from(arguments).slice(1)), 
            e.constructor !== Array && (e = [ e ]), e.forEach(function(e, n) {
                t = t.replace(new RegExp("\\{" + n + "\\}", "g"), function() {
                    return e;
                });
            }), t);
        }
    }, {
        key: "depend",
        value: function(t) {
            switch (void 0 === t ? "undefined" : e(t)) {
              case "boolean":
                t = t;
                break;

              case "string":
                t = !!t.length;
                break;

              case "function":
                t = t();

              default:
                t = !0;
            }
            return t;
        }
    }, {
        key: "optional",
        value: function(t) {
            return !this.methods.required(t) && "dependency-mismatch";
        }
    }, {
        key: "customMessage",
        value: function(t, n) {
            var i = this.messages[t], r = "object" === (void 0 === i ? "undefined" : e(i));
            if (i && r) return i[n.method];
        }
    }, {
        key: "defaultMessage",
        value: function(t, n) {
            var i = this.customMessage(t, n) || this.defaults.messages[n.method], r = void 0 === i ? "undefined" : e(i);
            return "undefined" === r ? i = "Warning: No message defined for " + n.method + "." : "function" === r && (i = i.call(this, n.parameters)), 
            i;
        }
    }, {
        key: "formatTplAndAdd",
        value: function(t, e, n) {
            var i = this.defaultMessage(t, e);
            this.errorList.push({
                param: t,
                msg: i,
                value: n
            });
        }
    }, {
        key: "checkParam",
        value: function(t, e, n) {
            this.scope = n;
            var i = n.detail.value[t] || "";
            for (var r in e) if (this.isValidMethod(r)) {
                var a = {
                    method: r,
                    parameters: e[r]
                }, o = this.methods[r](i, a.parameters);
                if ("dependency-mismatch" === o) continue;
                if (this.setValue(t, r, o, i), !o) {
                    this.formatTplAndAdd(t, a, i);
                    break;
                }
            }
        }
    }, {
        key: "setView",
        value: function(t) {
            this.form[t] = {
                $name: t,
                $valid: !0,
                $invalid: !1,
                $error: {},
                $success: {},
                $viewValue: ""
            };
        }
    }, {
        key: "setValue",
        value: function(t, e, n, i) {
            var r = this.form[t];
            r.$valid = n, r.$invalid = !n, r.$error[e] = !n, r.$success[e] = n, r.$viewValue = i;
        }
    }, {
        key: "checkForm",
        value: function(t) {
            this.__initData();
            for (var e in this.rules) this.setView(e), this.checkParam(e, this.rules[e], t);
            return this.valid();
        }
    }, {
        key: "valid",
        value: function() {
            return 0 === this.size();
        }
    }, {
        key: "size",
        value: function() {
            return this.errorList.length;
        }
    }, {
        key: "validationErrors",
        value: function() {
            return this.errorList;
        }
    } ]), i;
}();

exports.default = i;