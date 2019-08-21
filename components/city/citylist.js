Component({
    properties: {
        data: {
            type: Object,
            value: {},
            observer: function(t, e) {
                this.resetRight(t);
            }
        },
        myCity: {
            type: String,
            value: ""
        },
        search: {
            type: String,
            value: "",
            observer: function(t, e) {
                console.log(t), this.value = t, this.searchMt();
            }
        }
    },
    data: {
        list: [],
        rightArr: [],
        jumpNum: "",
        myCityName: "请选择"
    },
    ready: function() {
        var t = this.data.data;
        this.resetRight(t), this.data.myCity && this.getCity();
    },
    methods: {
        resetRight: function(t) {
            var e = [];
            for (var i in t) e.push(t[i].title.substr(0, 1));
            this.setData({
                list: t,
                rightArr: e
            });
        },
        getCity: function() {
            wx.getLocation({
                type: "wgs84",
                success: function(t) {
                    this.latitude = t.latitude, this.longitude = t.longitude;
                }
            });
        },
        jumpMt: function(t) {
            var e = t.currentTarget.dataset.id;
            this.setData({
                jumpNum: e
            });
        },
        detailMt: function(t) {
            var e = t.currentTarget.dataset.detail, i = {
                bubbles: !1,
                composed: !1,
                capturePhase: !1
            };
            this.triggerEvent("detail", e, i);
        },
        input: function(t) {
            this.value = t.detail.value;
        },
        searchMt: function() {
            this._search();
        },
        _search: function() {
            console.log("搜索");
            for (var t = this.data.data, e = [], i = 0; i < t.length; i++) {
                for (var a = [], s = 0; s < t[i].item.length; s++) if (t[i].item[s].name.indexOf(this.value) > -1) {
                    var r = {};
                    for (var n in t[i].item[s]) r[n] = t[i].item[s][n];
                    a.push(r);
                }
                0 !== a.length && e.push({
                    title: t[i].title,
                    type: t[i].type ? t[i].type : "",
                    item: a
                });
            }
            this.resetRight(e);
        },
        locationMt: function() {}
    }
});