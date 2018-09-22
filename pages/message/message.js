var e, t = getApp(), i = require("../template/getCode.js"), a = require("../../utils/bmob.js"), s = require("../../utils/util.js");

Page({
    data: {
        infoList: [],
        noticeList: []
    },
    deletePlyre: function(t) {
        var s = t.currentTarget.dataset.id, o = a.Object.extend("Plyre");
        new a.Query(o).get(s, {
            success: function(t) {
                t.destroy({
                    success: function(t) {
                        i.dataLoading("删除成功", "success"), console.log("删除消息成功"), e.onShow();
                    },
                    error: function(e, t) {
                        console.log(t);
                    }
                });
            },
            error: function(e, t) {
                console.log(t);
            }
        });
    },
    touchSInfo: function(e) {
        var i = t.Touches.getClientX(e);
        i && this.setData({
            startX: i
        });
    },
    touchMInfo: function(e) {
        var i = t.Touches.touchM(e, this.data.infoList, this.data.startX);
        i && this.setData({
            infoList: i
        });
    },
    touchEInfo: function(e) {
        var i = t.Touches.touchE(e, this.data.infoList, this.data.startX, 150);
        i && this.setData({
            infoList: i
        });
    },
    infoDelete: function(e) {
        var i = t.Touches.deleteItem(e, this.data.infoList);
        i && this.setData({
            infoList: i
        }), this.deletePlyre(e);
    },
    touchSNotice: function(e) {
        var i = t.Touches.getClientX(e);
        i && this.setData({
            startX: i
        });
    },
    touchMNotice: function(e) {
        var i = t.Touches.touchM(e, this.data.noticeList, this.data.startX);
        i && this.setData({
            noticeList: i
        });
    },
    touchENotice: function(e) {
        var i = t.Touches.touchE(e, this.data.noticeList, this.data.startX, 150);
        i && this.setData({
            noticeList: i
        });
    },
    noticeDelete: function(e) {
        var i = t.Touches.deleteItem(e, this.data.noticeList);
        i && this.setData({
            noticeList: i
        }), this.deletePlyre(e);
    },
    readDetail: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.id, i = e.currentTarget.dataset.wid, s = e.currentTarget.dataset.fid;
        console.log("消息通知的id" + t + ",活动的id=" + i + ",活动发布者ID=" + s);
        var o = a.Object.extend("Plyre");
        new a.Query(o).get(t, {
            success: function(e) {
                e.set("is_read", 1), e.save();
            },
            error: function(e, t) {
                console.log(t);
            }
        }), wx.navigateTo({
            url: "/pages/detail/detail?actid=" + i + "&pubid=" + s
        });
    },
    onLoad: function(t) {
        (e = this).setData({
            loading: !1
        });
    },
    onReady: function() {
        wx.hideToast();
    },
    onShow: function() {
        var t = wx.getStorageSync("user_id");
        new a.User().id = t;
        var i = a.Object.extend("Plyre"), o = new a.Query(i);
        o.equalTo("is_read", 0), o.equalTo("fid", t), o.equalTo("bigtype", 2), o.count({
            success: function(t) {
                console.log("共有 " + t + " 条未读通知"), e.setData({
                    noticeCount: t
                });
            },
            error: function(e) {}
        });
        var n = a.Object.extend("Plyre"), r = new a.Query(n);
        r.equalTo("fid", t), r.equalTo("bigtype", 2), r.limit(50), r.descending("createdAt");
        var c = new Array();
        r.find({
            success: function(t) {
                for (var i = 0; i < t.length; i++) {
                    var a = t[i].id, o = t[i].get("is_read");
                    if (0 == o) n = "未读"; else if (1 == o) var n = "已读";
                    var r = t[i].get("username"), u = t[i].get("avatar"), d = t[i].createdAt, l = s.getDateDiff(d), f = t[i].get("behavior");
                    if (5 == f) g = "加入了你的发起"; else if (6 == f) g = "取消加入了你的发起"; else if (7 == f) var g = "修改了联系信息";
                    var h, v = t[i].get("wid"), y = t[i].get("fid");
                    h = {
                        id: a || "",
                        is_read: o,
                        status: n || "",
                        username: r || "",
                        time: l || "",
                        avatar: u || "",
                        message: g || "",
                        wid: v || "",
                        fid: y || ""
                    }, c.push(h);
                }
                console.log(c), e.setData({
                    noticeList: c
                });
            }
        });
        i = a.Object.extend("Plyre");
        (o = new a.Query(i)).equalTo("is_read", 0), o.equalTo("fid", t), o.equalTo("bigtype", 1), 
        o.count({
            success: function(t) {
                console.log("共有 " + t + " 条未读消息"), e.setData({
                    infoCount: t
                });
            },
            error: function(e) {}
        });
        n = a.Object.extend("Plyre");
        (r = new a.Query(n)).equalTo("fid", t), r.equalTo("bigtype", 1), r.limit(50), r.descending("createdAt");
        var u = new Array();
        r.find({
            success: function(t) {
                for (var i = 0; i < t.length; i++) {
                    var a = t[i].id, o = t[i].get("is_read");
                    if (0 == o) n = "未读"; else if (1 == o) var n = "已读";
                    var r = t[i].get("username"), c = t[i].get("avatar"), d = t[i].createdAt, l = s.getDateDiff(d), f = t[i].get("behavior");
                    if (1 == f) g = "赞了你的发起"; else if (2 == f) g = "取消赞了你的发起"; else if (3 == f) g = "评论了你的发起"; else if (4 == f) var g = "回复了你的发起";
                    var h, v = t[i].get("wid"), y = t[i].get("fid");
                    h = {
                        id: a || "",
                        is_read: o,
                        status: n || "",
                        username: r || "",
                        time: l || "",
                        avatar: c || "",
                        message: g || "",
                        wid: v || "",
                        fid: y || ""
                    }, u.push(h);
                }
                console.log(u), e.setData({
                    infoList: u,
                    loading: !0
                });
            }
        });
    },
    onPullDownRefresh: function() {
        this.onShow();
    }
});