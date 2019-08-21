function t() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
    return "object" === (void 0 === t ? "undefined" : e(t)) ? t : {
        text: t
    };
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (t[r] = o[r]);
    }
    return t;
};

Component({
    properties: {
        text: String,
        color: {
            type: String,
            value: "#fff"
        },
        backgroundColor: {
            type: String,
            value: "#e64340"
        },
        duration: {
            type: Number,
            value: 3e3
        }
    },
    methods: {
        show: function() {
            var t = this, e = this.data.duration;
            clearTimeout(this.timer), this.setData({
                show: !0
            }), e > 0 && e !== 1 / 0 && (this.timer = setTimeout(function() {
                t.hide();
            }, e));
        },
        hide: function() {
            clearTimeout(this.timer), this.setData({
                show: !1
            });
        }
    }
});

var r = {
    selector: "#van-notify",
    duration: 3e3
};

module.exports = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = getCurrentPages(), i = n[n.length - 1];
    e = Object.assign({}, r, t(e));
    var a = i.selectComponent(e.selector);
    delete e.selector, a && (a.setData(o({}, e)), a.show());
};