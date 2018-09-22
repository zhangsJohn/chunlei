function t(t) {
    var e = "";
    switch (t) {
      case 0:
        e = "校园服务";
        break;

      case 1:
        e = "青春伴夕阳";
        break;

      case 2:
        e = "未来梦工程";
        break;

      case 3:
        e = "助残阳光行动";
        break;

      case 4:
        e = "社区公益";
        break;

      case 5:
        e = "文化宣传";
        break;

      case 6:
        e = "医疗保健";
        break;

      case 7:
        e = "应急救护";
        break;

      case 8:
        e = "地球卫士";
        break;

      case 9:
        e = "校院赛会";
        break;

      default:
        e = "志愿活动";
    }
    return e;
}

require("../../utils/common.js");

var e = require("../../utils/bmob.js"), a = require("../../utils/util.js"), i = getApp(), s = wx.getStorageSync("my_nick"), n = wx.getStorageSync("my_sex"), o = wx.getStorageSync("my_avatar");

Page({
    data: {
        my_nick: s,
        my_sex: n,
        my_avatar: o,
        userInfo: [],
        dialog: !1,
        autoplay: !1,
        postsList: [],
        countMy: 0,
        currentPage: 0,
        limitPage: 3,
        isEmpty: !1,
        totalCount: 0,
        endPage: 0,
        totalPage: 0,
        curIndex: 0
    },
    onLoad: function(t) {
        this.getAll();
    },
    onShow: function(t) {
        this.getAll(), this.fetchPostsData(this.data), this.onLoad(), console.log("加载头像");
        var e = this;
        i.getUserInfo(function(t) {
            e.setData({
                userInfo: t
            });
        });
    },
    onSetData: function(t) {
        console.log(t.length);
        var e = this.data.currentPage + 1;
        t = t || [], this.setData({
            postsList: 1 === e || void 0 === e ? t : this.data.postsList.concat(t)
        }), console.log(this.data.postsList, e);
    },
    getAll: function() {
        self = this;
        var t = e.Object.extend("Events"), a = new e.Query(t);
        a.equalTo("isShow", 1), a.count({
            success: function(t) {
                var e = 0, a = 0;
                if (t % self.data.limitPage == 0) e = parseInt(t / self.data.limitPage); else {
                    var i = parseInt(t / self.data.limitPage);
                    a = t - i * self.data.limitPage, e = i + 1;
                }
                self.setData({
                    totalCount: t,
                    endPage: a,
                    totalPage: e
                }), console.log("共有" + t + " 条记录"), console.log("共有" + e + "页"), console.log("最后一页加载" + a + "条");
            }
        });
    },
    fetchPostsData: function(i) {
        var s = this, n = new Array(), o = e.Object.extend("Events"), c = new e.Query(o);
        c.equalTo("isShow", 1), c.limit(s.data.limitPage), console.log(s.data.limitPage), 
        c.skip(3 * s.data.currentPage), c.descending("createdAt"), c.include("publisher"), 
        c.find({
            success: function(e) {
                for (var i = 0; i < e.length; i++) {
                    var o, c = e[i].get("publisher").objectId, r = e[i].get("title"), l = e[i].get("content"), u = e[i].get("acttype"), g = e[i].get("endtime"), d = e[i].get("address"), h = t(parseInt(u)), m = e[i].get("isShow"), p = e[i].get("peoplenum"), f = e[i].get("likenum"), P = (e[i].get("liker"), 
                    e[i].get("commentnum")), b = e[i].id, y = e[i].createdAt, k = a.getDateDiff(y);
                    o = e[i].get("actpic") ? e[i].get("actpic")._url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png";
                    var v, w = e[i].get("publisher").nickname, S = e[i].get("publisher").userPic;
                    v = {
                        title: r || "",
                        content: l || "",
                        acttype: u || "",
                        acttypename: h || "",
                        isShow: m,
                        endtime: g || "",
                        address: d || "",
                        peoplenum: p || "",
                        id: b || "",
                        publisherPic: S || "",
                        publisherName: w || "",
                        publisherId: c || "",
                        pubtime: k || "",
                        actPic: o || "",
                        likenum: f,
                        commentnum: P,
                        is_liked: ""
                    }, n.push(v);
                }
                s.onSetData(n, s.data.currentPage), setTimeout(function() {
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
    refresh: function() {
        this.setData({
            postsList: [],
            currentPage: 0,
            limitPage: 3,
            isEmpty: !1,
            totalCount: 0,
            endPage: 0,
            totalPage: 0,
            curIndex: 0
        }), this.onShow();
    },
    click_activity: function(t) {
        if (!this.buttonClicked) {
            a.buttonClicked(this);
            var e = t.currentTarget.dataset.actid, i = t.currentTarget.dataset.pubid;
            wx.getStorageSync("user_key");
            wx.navigateTo({
                url: "/pages/detail/detail?actid=" + e + "&pubid=" + i
            });
        }
    }
});