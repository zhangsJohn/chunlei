require("../../../utils/common.js");

var t = require("../../../utils/bmob.js"), e = require("../../../utils/util.js"), a = getApp();

Page({
    data: {
        postsList: [],
        currentPage: 0,
        limitPage: 3,
        isEmpty: !1,
        totalCount: 0,
        endPage: 0,
        totalPage: 0
    },
    onLoad: function() {
        a.getAll("Contacts", "currentUser", this), this.fetchPostsData();
    },
    onSetData: function(t) {
        var e = this.data.currentPage + 1;
        t = t || [], this.setData({
            postsList: 1 === e || void 0 === e ? t : this.data.postsList.concat(t)
        });
    },
    fetchPostsData: function(a, n) {
        var i = this, s = new Array(), c = t.Object.extend("Contacts"), r = new t.Query(c);
        r.limit(i.data.limitPage), r.skip(3 * i.data.currentPage), r.equalTo("currentUser", wx.getStorageSync("user_id")), 
        r.include("event"), r.descending("createAt"), r.include("publisher"), r.find({
            success: function(t) {
                for (var a = 0; a < t.length; a++) {
                    var n, c = t[a].get("publisher").objectId, r = t[a].get("event").title, o = t[a].get("event").content, u = t[a].get("event").acttype, d = t[a].get("event").endtime, g = t[a].get("event").address, l = t[a].get("event").acttypename, p = t[a].get("event").peoplenum, m = t[a].get("event").likenum, h = (t[a].get("event").liker, 
                    t[a].get("event").commentnum), v = t[a].get("event").objectId, P = t[a].createdAt, b = e.getDateDiff(P), f = t[a].get("publisher").nickname, y = t[a].get("publisher").userPic;
                    n = t[a].get("event").actpic ? t[a].get("event").actpic.url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png";
                    var D;
                    D = {
                        title: r || "",
                        content: o || "",
                        acttype: u || "",
                        acttypename: l || "",
                        endtime: d || "",
                        address: g || "",
                        peoplenum: p || "",
                        id: v || "",
                        publisherPic: y || "",
                        publisherName: f || "",
                        publisherId: c || "",
                        pubtime: b || "",
                        actPic: n || "",
                        likenum: m,
                        commentnum: h,
                        is_liked: ""
                    }, s.push(D), console.log(s);
                }
                i.onSetData(s, i.data.currentPage), setTimeout(function() {
                    wx.hideLoading();
                }, 900);
            },
            error: function(t) {
                console.log(t);
            }
        });
    },
    loadMore: function() {
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), setTimeout(function() {
            wx.hideLoading();
        }, 1e3);
        var t = this;
        t.setData({
            currentPage: t.data.currentPage + 1
        }), console.log("当前页" + t.data.currentPage), t.data.currentPage + 1 == t.data.totalPage ? (t.setData({
            isEmpty: !0
        }), 0 != t.data.endPage && t.setData({
            limitPage: t.data.endPage
        }), this.fetchPostsData(t.data)) : this.fetchPostsData(t.data);
    },
    onShow: function() {},
    click_activity: function(t) {
        var e = t.currentTarget.dataset.actid, a = t.currentTarget.dataset.pubid;
        wx.getStorageSync("user_key");
        wx.navigateTo({
            url: "/pages/detail/detail?actid=" + e + "&pubid=" + a
        });
    }
});