var e = "https://www.huayupiaowu.com", i = {
    teamlist: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php?do=teams&cityid=" + i.cityid + "&page=" + i.page + "&size=10&inputval=" + i.inputVal,
            method: "GET",
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    activelist: function(i, t) {
        wx.request({
            url: e + "/active/api.php?do=teams&cityid=" + i.cityid + "&page=" + i.page + "&size=10&inputval=" + i.inputVal,
            method: "GET",
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    groupList: function(i) {
        wx.request({
            // url: e + "/qianggou/api.php?do=group",
          // url: "https://122.152.209.5:8080" + "/groups",
          url: "https://localhost:8080" + "/groups",
            method: "GET",
            success: function(e) {
                i("success", e);
            },
            fail: function(e) {
                i("fail", e);
            },
            complete: function(e) {
                i("complete", e);
            }
        });
    },
    myfxcoupon: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php?do=myfxcoupon&user_id=" + i.userid + "&page=" + i.page + "&size=10",
            method: "GET",
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    teamdetail: function(i, t, n, c) {
        wx.request({
            // url: e + "/qianggou/api.php?do=detail&id=" + i + "&user_id=" + t + "&agentid=" + n,
          //  url: "https://122.152.209.5:8080" + "/qianggou/teamsdetail?id=" + i + "&user_id=" + t + "&agentid=" + n,
          url: "https://localhost:8080" + "/qianggou/teamsdetail?id=" + i + "&user_id=" + t + "&agentid=" + n,
            method: "GET",
            success: function(e) {
                c("success", e);
            },
            fail: function(e) {
                c("fail", e);
            },
            complete: function(e) {
                c("complete", e);
            }
        });
    },
  marketWenan: function (i, t, nickname,n) {
        wx.request({
          // url: e + "/qianggou/api.php?do=market_wenan&id=" + i + "&user_id=" + t + "&nickname=" + nickname,
          url: "https://localhost:8080/market_wenan?"+"id=" + i + "&user_id=" + t + "&nickname=" + nickname,
            method: "GET",
            success: function(e) {
                n("success", e);
            },
            fail: function(e) {
                n("fail", e);
            },
            complete: function(e) {
                n("complete", e);
            }
        });
    },
    haibao: function(i, t, n) {
        wx.request({
            // url: e + "/qianggou/api.php?do=createhb&teamid=" + i + "&agentid=" + t,
          url: "https://localhost:8080/getXCXQRCode?" + "teamid=" + i + "&agentid=" + t,
            method: "GET",
            success: function(e) {
                n("success", e);
            },
            fail: function(e) {
                n("fail", e);
            },
            complete: function(e) {
                n("complete", e);
            }
        });
    },
    activeteamdetail: function(i, t, n, c) {
        wx.request({
            url: e + "/active/api.php?do=detail&id=" + i + "&user_id=" + t + "&agentid=" + n,
            method: "GET",
            success: function(e) {
                c("success", e);
            },
            fail: function(e) {
                c("fail", e);
            },
            complete: function(e) {
                c("complete", e);
            }
        });
    },
    guanzhu: function(i, t, n, c, o) {
        wx.request({
            url: e + "/qianggou/api.php?do=guanzhu&teamid=" + i + "&user_id=" + t + "&agentid=" + n + "&formid=" + c,
            method: "GET",
            success: function(e) {
                o("success", e);
            },
            fail: function(e) {
                o("fail", e);
            },
            complete: function(e) {
                o("complete", e);
            }
        });
    },
    share: function(i, t, n) {
        wx.request({
            // url: e + "/qianggou/api.php?do=share&teamid=" + i + "&user_id=" + t,
          url: "https://localhost:8080/share?teamid=" + i + "&user_id=" + t,
            method: "GET",
            success: function(e) {
                n("success", e);
            },
            fail: function(e) {
                n("fail", e);
            },
            complete: function(e) {
                n("complete", e);
            }
        });
    }
}, t = {
    list: function(i) {
        wx.request({
            url: e + "/qianggou/api.php?do=city",
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                i("success", e);
            },
            fail: function(e) {
                i("fail", e);
            },
            complete: function(e) {
                i("complete", e);
            }
        });
    },
    pintuanlist: function(i) {
        wx.request({
            url: e + "/pintuan/api.php?do=city",
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                i("success", e);
            },
            fail: function(e) {
                i("fail", e);
            },
            complete: function(e) {
                i("complete", e);
            }
        });
    },
    activelist: function(i) {
        wx.request({
            url: e + "/active/api.php?do=city",
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                i("success", e);
            },
            fail: function(e) {
                i("fail", e);
            },
            complete: function(e) {
                i("complete", e);
            }
        });
    }
}, n = {
    getUserId: function(i, t, n, c) {
        wx.request({
            // url: e + "/qianggou/api.php?do=getUserId&code=" + i + "&fa_userid=" + t + "&fa_orderid=" + n,
          url: "https://localhost:8080" + "/getUserID?code=" + i + "&fa_userid=" + t + "&fa_orderid=" + n ,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                c("success", e);
            },
            fail: function(e) {
                c("fail", e);
            },
            complete: function(o) {
              c("complete", "https://localhost:8080" + "/getUserID?code=" + i + "&fa_userid=" + t + "&fa_orderid=" + n);
            }
        });
    },
    registerMaster: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php",
            method: "GET",
            data: {
                do: "signqunzhu",
                user_id: i.userid,
                mobile: i.mobile,
                realname: i.realname,
                code: i.code
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    makesub: function(i, t) {
        wx.request({
            url: e + "/pintuan/api.php?do=makesub&userid=" + i,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(i) {
                t("complete", e + "/qianggou/api.php?do=getUserId&code=" + vcode + "&fa_userid=" + fa_userid + "&fa_orderid=" + fa_orderid);
            }
        });
    },
    sendzfhb: function(i, t, n) {
        wx.request({
            url: e + "/qianggou/api.php?do=sendzfhb&orderid=" + i + "&userid=" + t,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                n("success", e);
            },
            fail: function(e) {
                n("fail", e);
            },
            complete: function(i) {
                n("complete", e + "/qianggou/api.php?do=getUserId&code=" + vcode + "&fa_userid=" + fa_userid);
            }
        });
    },
    sendxs_coupon: function(i, t, n, c) {
        wx.request({
            url: e + "/qianggou/api.php?do=sendxs_coupon&userid=" + i + "&fa_userid=" + t + "&fa_orderid=" + n,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                c("success", e);
            },
            fail: function(e) {
                c("fail", e);
            },
            complete: function(o) {
                c("complete", e + "/qianggou/api.php?do=sendxs_coupon&userid=" + i + "&fa_userid=" + t + "&fa_orderid=" + n);
            }
        });
    },
    withdrawals: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php?do=withdrawals&userid=" + i,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(n) {
                t("complete", e + "/qianggou/api.php?do=withdrawals&userid=" + i);
            }
        });
    },
    withdrawlog: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php?do=withdrawlog&userid=" + i.userid + "&page=" + i.page + "&size=15",
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(n) {
                t("complete", e + "/qianggou/api.php?do=withdrawals&userid=" + i.userid);
            }
        });
    },
    withdraw: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php?do=withdraw&userid=" + i,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(n) {
                t("complete", e + "/qianggou/api.php?do=withdraw&userid=" + i);
            }
        });
    },
    uploadavatarUrl: function(i, t, n, c) {
        wx.request({
            url: e + "/qianggou/api.php",
            method: "GET",
            data: {
                do: "uploadUserAvatar",
                avatarurl: "" + i,
                userid: "" + n,
                realname: "" + t
            },
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                c("success", e);
            },
            fail: function(e) {
                c("fail", e);
            },
            complete: function(e) {
                c("complete", e);
            }
        });
    },
    getCityInfo: function(i, t, n, c, o) {
        wx.request({
            url: e + "/qianggou/api.php?do=getcityinfo&lat=" + t + "&long=" + n + "&user_id=" + c + "&types=" + i,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                o("success", e);
            },
            fail: function(e) {
                o("fail", e);
            },
            complete: function(e) {
                o("complete", e);
            }
        });
    },
    getuserxs_coupon: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php?do=getuserxs_coupon&userid=" + i,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    mymember: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php?do=mymember&user_id=" + i.userid + "&page=" + i.page + "&size=" + i.size,
            method: "GET",
            success: function(n) {
                t("success", n), console.log(e + "/qianggou/api.php?do=mymember&user_id=" + i.userid + "&page=" + i.page + "&size=10");
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    }
}, c = {
    submit: function(i, t) {
        wx.request({
            // url: e + "/qianggou/api.php?do=submitOrder",
            url: "https://localhost:8080/submitOrder",
            method: "POST",
            data: i,
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    pintuansubmit: function(i, t) {
        wx.request({
            url: e + "/pintuan/api.php?do=submitOrder",
            method: "POST",
            data: i,
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    activesubmit: function(i, t) {
        wx.request({
            url: e + "/active/api.php?do=submitOrder",
            method: "POST",
            data: i,
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    orderList: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php?do=myorder&user_id=" + i.userid + "&page=" + i.page + "&size=10&current=" + i.current,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(n) {
                console.log(e + "/qianggou/api.php?do=myorder&user_id=" + i.userid + "&page=" + i.page + "&size=10&current=" + i.current), 
                t("success", n);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    orderDetail: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php?do=orderDetail&order_id=" + i,
            method: "GET",
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    }
}, o = {
    generateImg: function(i, t) {
        wx.request({
            url: e + "/qianggou/api.php?do=shareHb",
            method: "POST",
            data: i,
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    pintuangenerateImg: function(i, t) {
        wx.request({
            url: e + "/pintuan/api.php?do=shareHb",
            method: "POST",
            data: i,
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(e) {
                t("complete", e);
            }
        });
    },
    hbsharedetail: function(i, t, n, c) {
        wx.request({
            url: e + "/qianggou/api.php?do=hbshare&id=" + i + "&userid=" + t + "&hb_userid=" + n,
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                c("success", e);
            },
            fail: function(e) {
                c("fail", e);
            },
            complete: function(e) {
                c("complete", e);
            }
        });
    },
    helpshare: function(i, t, n, c) {
        wx.request({
            url: e + "/qianggou/api.php?do=helpshare&id=" + i + "&userid=" + t + "&hb_userid=" + n,
            method: "GET",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                c("success", e);
            },
            fail: function(e) {
                c("fail", e);
            },
            complete: function(e) {
                c("complete", e);
            }
        });
    }
}, u = {
    teamlist: function(i, t) {
        wx.request({
            url: e + "/pintuan/api.php?do=teams&cityid=" + i.cityid + "&page=" + i.page + "&size=10&inputval=" + i.inputVal + "&current=" + i.current,
            method: "GET",
            success: function(n) {
                console.log(e + "/pintuan/api.php?do=teams&cityid=" + i.cityid + "&page=" + i.page + "&size=10&inputval=" + i.inputVal + "&current=" + i.current), 
                t("success", n);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(n) {
                t("complete", e + "/pintuan/api.php?do=teams&cityid=" + i.cityid + "&page=" + i.page + "&size=10&inputval=" + i.inputVal);
            }
        });
    },
    teamlists: function(i, t) {
        wx.request({
            url: e + "/pintuan/api.php?do=teams_shouye&cityid=" + i.cityid + "&page=" + i.page + "&size=2&inputval=" + i.inputVal + "&current=" + i.current,
            method: "GET",
            success: function(n) {
                console.log(e + "/pintuan/api.php?do=teams_shouye&cityid=" + i.cityid + "&page=" + i.page + "&size=2&inputval=" + i.inputVal + "&current=" + i.current), 
                t("success", n);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(n) {
                t("complete", e + "/pintuan/api.php?do=teams&cityid=" + i.cityid + "&page=" + i.page + "&size=10&inputval=" + i.inputVal);
            }
        });
    },
    getcollage_type: function(i) {
        wx.request({
            url: e + "/pintuan/api.php?do=getcollage_type",
            method: "GET",
            success: function(e) {
                i("success", e);
            },
            fail: function(e) {
                i("fail", e);
            },
            complete: function(e) {
                i("complete", e);
            }
        });
    },
    teamdetail: function(i, t, n, c) {
        wx.request({
            url: e + "/pintuan/api.php?do=detail&id=" + i + "&user_id=" + t + "&agentid=" + n,
            method: "GET",
            success: function(e) {
                c("success", e);
            },
            fail: function(e) {
                c("fail", e);
            },
            complete: function(e) {
                c("complete", e);
            }
        });
    },
    gettuandetail: function(i, t, n) {
        wx.request({
            url: e + "/pintuan/api.php?do=gettuandetail&tuan_id=" + i + "&userid=" + t,
            method: "GET",
            success: function(e) {
                n("success", e);
            },
            fail: function(e) {
                n("fail", e);
            },
            complete: function(e) {
                n("complete", e);
            }
        });
    },
    mypintuan: function(i, t) {
        wx.request({
            url: e + "/pintuan/api.php?do=mypintuan&user_id=" + i.userid + "&page=" + i.page + "&size=10",
            method: "GET",
            success: function(e) {
                t("success", e);
            },
            fail: function(e) {
                t("fail", e);
            },
            complete: function(n) {
                t("complete", e + "/pintuan/api.php?do=mypintuan&user_id=" + i.userid + "&page=" + i.page + "&size=10");
            }
        });
    },
    refund: function(i, t, n) {
        wx.request({
            url: e + "/pintuan/api.php?do=refund&order_id=" + i + "&num=" + t,
            method: "GET",
            success: function(e) {
                n("success", e);
            },
            fail: function(e) {
                n("fail", e);
            },
            complete: function(e) {
                n("complete", e);
            }
        });
    }
};

module.exports = {
    ticket: i,
    city: t,
    user: n,
    order: c,
    share: o,
    pintuan: u
};