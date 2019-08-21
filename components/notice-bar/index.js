var t = [ "closeable", "link" ];

Component({
    externalClasses: [ "custom-class" ],
    properties: {
        text: {
            type: String,
            value: "",
            observer: function() {
                this.setData({}, this._init);
            }
        },
        mode: {
            type: String,
            value: ""
        },
        url: {
            type: String,
            value: ""
        },
        openType: {
            type: String,
            value: "navigate"
        },
        delay: {
            type: Number,
            value: 0
        },
        speed: {
            type: Number,
            value: 50
        },
        scrollable: {
            type: Boolean,
            value: !0
        },
        leftIcon: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: "#f60"
        },
        backgroundColor: {
            type: String,
            value: "#fff7cc"
        }
    },
    data: {
        show: !0,
        hasRightIcon: !1,
        width: void 0,
        wrapWidth: void 0,
        elapse: void 0,
        animation: null,
        resetAnimation: null,
        timer: null
    },
    attached: function() {
        var t = this.data.mode;
        t && this._checkMode(t) && this.setData({
            hasRightIcon: !0
        });
    },
    detached: function() {
        var t = this.data.timer;
        t && clearTimeout(t);
    },
    methods: {
        _checkMode: function(e) {
            var a = ~t.indexOf(e);
            return a || console.warn("mode only accept value of " + t + ", now get " + e + "."), 
            a;
        },
        _init: function() {
            var t = this;
            wx.createSelectorQuery().in(this).select(".van-notice-bar__content").boundingClientRect(function(e) {
                e && e.width && (t.setData({
                    width: e.width
                }), wx.createSelectorQuery().in(t).select(".van-notice-bar__content-wrap").boundingClientRect(function(e) {
                    if (e && e.width) {
                        var a = e.width, i = t.data, n = i.width, o = i.speed, r = i.scrollable, l = i.delay;
                        if (r && a < n) {
                            var c = n / o * 1e3, s = wx.createAnimation({
                                duration: c,
                                timeingFunction: "linear",
                                delay: l
                            }), u = wx.createAnimation({
                                duration: 0,
                                timeingFunction: "linear"
                            });
                            t.setData({
                                elapse: c,
                                wrapWidth: a,
                                animation: s,
                                resetAnimation: u
                            }, function() {
                                t._scroll();
                            });
                        }
                    }
                }).exec());
            }).exec();
        },
        _scroll: function() {
            var t = this, e = this.data, a = e.animation, i = e.resetAnimation, n = e.wrapWidth, o = e.elapse, r = e.speed;
            i.translateX(n).step();
            var l = a.translateX(-o * r / 1e3).step();
            this.setData({
                animationData: i.export()
            }), setTimeout(function() {
                t.setData({
                    animationData: l.export()
                });
            }, 100);
            var c = setTimeout(function() {
                t._scroll();
            }, o);
            this.setData({
                timer: c
            });
        },
        _handleButtonClick: function() {
            var t = this.data.timer;
            t && clearTimeout(t), this.setData({
                show: !1,
                timer: null
            });
        },
        onClick: function(t) {
            this.triggerEvent("click", t);
        }
    }
});