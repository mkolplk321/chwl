var t = require("../../utils/util.js"), e = require("../../utils/api.js");

getApp();

Page({
    data: {
        keywrod: "",
        searchStatus: !1,
        goodsList: [],
        helpKeyword: [],
        historyKeyword: [],
        categoryFilter: !1,
        currentSort: "name",
        currentSortType: "default",
        currentSortOrder: "desc",
        filterCategory: [],
        defaultKeyword: {},
        hotKeyword: [],
        page: 1,
        size: 2e3,
        hasMore: !0,
        categoryId: 0
    },
    closeSearch: function() {
        wx.navigateBack();
    },
    clearKeyword: function() {
        this.setData({
            keyword: "",
            searchStatus: !1
        });
    },
    onLoad: function() {},
    getSearchKeyword: function() {
        var r = this;
        t.request(e.SearchIndex).then(function(t) {
            0 === t.errno && r.setData({
                historyKeyword: t.data.historyKeywordList,
                defaultKeyword: t.data.defaultKeyword,
                hotKeyword: t.data.hotKeywordList
            });
        });
    },
    inputChange: function(t) {
        this.setData({
            keyword: t.detail.value,
            searchStatus: !1
        });
    },
    getHelpKeyword: function() {},
    inputFocus: function() {
        this.setData({
            searchStatus: !1,
            goodsList: []
        }), this.data.keyword && this.getHelpKeyword();
    },
    clearHistory: function() {
        this.setData({
            historyKeyword: []
        }), t.request(e.SearchClearHistory, {}, "POST").then(function(t) {
            console.log("清除成功");
        });
    },
    getTeamList: function() {
        var t = this, e = t.data.page, r = t.data.size, a = t.data.keyword, o = wx.getStorageSync("current-city").id;
        wx.request({
            url: "https://www.dydtech.cn:8080/qianggou/teams?cityid=" + o + "&page=" + e + "&size=" + r + "&inputval=" + a,
            success: function(r) {
                wx.stopPullDownRefresh(), 1 == e && (t.data.goodsList.length = 0);
                for (var a = 0; a < r.data.length; a++) t.data.goodsList.push(r.data[a]);
                t.setData({
                    goodsList: t.data.goodsList,
                    searchStatus: !0,
                    categoryFilter: !1
                }), r.data.length < t.data.size ? t.setData({
                    hasMore: !1
                }) : t.setData({
                    hasMore: !0
                });
            }
        });
    },
    onKeywordTap: function(t) {
        this.getSearchResult(t.target.dataset.keyword);
    },
    getSearchResult: function(t) {
        "" === t && (t = this.data.defaultKeyword.keyword), this.setData({
            keyword: t,
            page: 1,
            categoryId: 0,
            goodsList: []
        }), this.getTeamList();
    },
    openSortFilter: function(t) {
        switch (t.currentTarget.id) {
          case "categoryFilter":
            this.setData({
                categoryFilter: !this.data.categoryFilter,
                currentSortType: "category",
                currentSort: "add_time",
                currentSortOrder: "desc"
            });
            break;

          case "priceSort":
            var e = "asc";
            "asc" == this.data.currentSortOrder && (e = "desc"), this.setData({
                currentSortType: "price",
                currentSort: "retail_price",
                currentSortOrder: e,
                categoryFilter: !1
            }), this.getTeamList();
            break;

          default:
            this.setData({
                currentSortType: "default",
                currentSort: "name",
                currentSortOrder: "desc",
                categoryFilter: !1,
                categoryId: 0
            }), this.getTeamList();
        }
    },
    selectCategory: function(t) {
        var e = t.target.dataset.categoryIndex, r = this.data.filterCategory, a = null;
        for (var o in r) o == e ? (r[o].selected = !0, a = r[o]) : r[o].selected = !1;
        this.setData({
            filterCategory: r,
            categoryFilter: !1,
            categoryId: a.id,
            page: 1,
            goodsList: []
        }), this.getTeamList();
    },
    onKeywordConfirm: function(t) {
        this.getSearchResult(t.detail.value);
    }
});