function t() {
    return t;
}

var r, i;

require("./api.js").city.list(function(a, e) {
    if ("success" === a) {
        r = e.data.city, i = e.data.searchLetter;
        for (var n = e.data.count, c = [], s = 0; s < n; s++) c[s] = [], c[s] = i[s];
        t = c;
    }
});

var t = [ "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z" ];

module.exports = {
    searchLetter: t,
    cityList: function() {
        for (var i = [], a = 0; a < t.length; a++) {
            var e = t[a], n = [], c = {};
            c.initial = e;
            for (var s = 0; s < r.length; s++) e == r[s].initial && n.push(r[s]);
            c.cityInfo = n, i.push(c);
        }
        return i;
    }
};