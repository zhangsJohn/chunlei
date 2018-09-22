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
    onLoad: function() {},
    onSetData: function(t) {
        var e = this.data.currentPage + 1;
        t = t || [], this.setData({
            postsList: 1 === e || void 0 === e ? t : this.data.postsList.concat(t)
        });
    },
    fetchPostsData: function(a, n) {
        var i = this, o = new Array(), s = t.Object.extend("Favos"), c = new t.Query(s);
        c.limit(i.data.limitPage), c.skip(3 * i.data.currentPage), c.equalTo("favor", wx.getStorageSync("user_id")), 
        c.include("event"), c.descending("createAt"), c.include("favor"), c.find({
            success: function(t) {
                for (var a = 0; a < t.length; a++) {
                    var n, s = t[a].get("event").publisher.objectId, c = t[a].get("event").title, r = t[a].get("event").content, u = t[a].get("event").acttype, d = t[a].get("event").endtime, g = t[a].get("event").address, l = t[a].get("event").acttypename, v = t[a].get("event").peoplenum, m = t[a].get("event").likenum, p = (t[a].get("event").liker, 
                    t[a].get("event").commentnum), h = t[a].get("event").objectId, P = t[a].createdAt, f = e.getDateDiff(P), b = t[a].get("favor").nickname, y = t[a].get("favor").userPic;
                    n = t[a].get("event").actpic ? t[a].get("event").actpic.url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png";
                    var D;
                    D = {
                        title: c || "",
                        content: r || "",
                        acttype: u || "",
                        acttypename: l || "",
                        endtime: d || "",
                        address: g || "",
                        peoplenum: v || "",
                        id: h || "",
                        publisherPic: y || "",
                        publisherName: b || "",
                        publisherId: s || "",
                        pubtime: f || "",
                        actPic: n || "",
                        likenum: m,
                        commentnum: p,
                        is_liked: ""
                    }, o.push(D);
                }
                i.onSetData(o, i.data.currentPage), setTimeout(function() {
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
    onShow: function() {
        a.getAll("Favos", "favor", this), this.fetchPostsData();
    },
    click_activity: function(t) {
        var e = t.currentTarget.dataset.actid, a = t.currentTarget.dataset.pubid;
        wx.getStorageSync("user_key");
        wx.navigateTo({
            url: "/pages/detail/detail?actid=" + e + "&pubid=" + a
        });
    }
});