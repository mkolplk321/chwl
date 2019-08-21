function t() {
    return t;
}

var r, e;

require("./api.js").city.activelist(function(i, o) {
    if (console.log(1), console.log(o), console.log(2), "success" === i) {
        r = o.data.city, e = o.data.searchLetter;
        for (var a = o.data.count, c = [], n = 0; n < a; n++) c[n] = [], c[n] = e[n];
        t = c;
    }
});

var t = [ "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z" ];

module.exports = {
    searchLetter: t,
    cityList: function() {
        for (var e = [], i = 0; i < t.length; i++) {
            var o = t[i], a = [], c = {};
            c.initial = o;
            for (var n = 0; n < r.length; n++) o == r[n].initial && a.push(r[n]);
            c.cityInfo = a, e.push(c);
        }
        return e;
    }
};