var e, t = require("../../../utils/common.js"), s = require("../../../utils/bmob.js"), i = require("../../../utils/util.js"), t = require("../../template/getCode.js"), n = getApp(), a = wx.getStorageSync("my_nick"), o = (wx.getStorageSync("user_openid"), 
wx.getStorageSync("user_id"));

Page({
    data: {
        list_remind: "加载中",
        status: !1,
        itemopen: !1,
        feednum: 0,
        hasFeed: !1,
        title: "",
        content: "",
        info: "",
        showTopTips: !1,
        TopTips: ""
    },
    onLoad: function() {
        (e = this).setData({
            src: "",
            isSrc: !1,
            ishide: "0",
            autoFocus: !0,
            isLoading: !1,
            loading: !0,
            isdisabled: !1
        }), wx.getSystemInfo({
            success: function(t) {
                var s = "---\r\n**用户信息**\r\n";
                s += "用户名：" + a, s += "\r\n手机型号：" + t.model, s += "（" + t.platform + " - " + t.windowWidth + "x" + t.windowHeight + "）", 
                s += "\r\n微信版本号：" + t.version, s += "\r\nTogether版本号：" + n.version, e.setData({
                    info: s
                }), console.log(s);
            }
        });
    },
    onReady: function() {
        wx.hideToast();
    },
    onShow: function() {
        console.log("调用onShow"), this.getIssue();
    },
    getIssue: function() {
        var t = new s.Query(s.User);
        t.equalTo("objectId", o), t.find({
            success: function(t) {
                var s = t[0].get("feednum");
                console.log("feednum=" + s), 0 != s && e.setData({
                    feednum: s,
                    hasFeed: !0
                });
            }
        });
        var n = new Array(), a = s.Object.extend("Feedback"), c = new s.Query(a), r = new s.User();
        r.id = wx.getStorageSync("user_id"), c.equalTo("feedUser", r), c.include("feedUser"), 
        c.descending("createAt"), c.find({
            success: function(t) {
                for (var s = 0; s < t.length; s++) {
                    var a, o = t[s].get("feedUser").objectId, c = t[s].get("title"), r = t[s].get("content"), d = t[s].id, u = t[s].createdAt, f = i.getDateDiff(u);
                    a = t[s].get("feedpic") ? t[s].get("feedpic")._url : "http://ovasw3yf9.bkt.clouddn.com/blog/171126/31GdaHlkh4.jpg?imageslim";
                    var l, g = t[s].get("feedUser").nickname, p = t[s].get("feedUser").userPic;
                    l = {
                        title: c || "",
                        content: r || "",
                        publisherPic: p || "",
                        publisherName: g || "",
                        pubtime: f || "",
                        feedpic: a || "",
                        feedUserId: o || "",
                        id: d || ""
                    }, n.push(l), e.setData({
                        feedList: n
                    });
                }
            }
        });
    },
    openList: function(t) {
        e.setData({
            status: !e.data.status
        });
    },
    openItem: function(t) {
        var s = t.currentTarget.dataset.index;
        s != e.data.itemopen && e.setData({
            itemopen: s
        });
    },
    uploadPic: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "上传图片需要消耗流量，是否继续？",
            confirmText: "继续",
            success: function(t) {
                t.confirm && wx.chooseImage({
                    count: 1,
                    sizeType: [ "compressed" ],
                    sourceType: [ "album", "camera" ],
                    success: function(t) {
                        var s = t.tempFilePaths;
                        e.setData({
                            isSrc: !0,
                            src: s
                        });
                    }
                });
            }
        });
    },
    clearPic: function() {
        e.setData({
            isSrc: !1,
            src: ""
        });
    },
    showTopTips: function() {
        var e = this;
        this.setData({
            showTopTips: !0
        }), setTimeout(function() {
            e.setData({
                showTopTips: !1
            });
        }, 3e3);
    },
    submitForm: function(i) {
        var n = i.detail.value.title, a = i.detail.value.content;
        "" == n ? this.setData({
            showTopTips: !0,
            TopTips: "请输入反馈标题"
        }) : "" == a ? this.setData({
            showTopTips: !0,
            TopTips: "请输入反馈内容"
        }) : (e.setData({
            isLoading: !0,
            isdisabled: !0
        }), wx.showModal({
            title: "提示",
            content: "是否确认提交反馈",
            success: function(i) {
                i.confirm && wx.getStorage({
                    key: "user_id",
                    success: function(i) {
                        var o = new (s.Object.extend("Feedback"))(), c = new s.User();
                        if (c.id = i.data, o.set("feedUser", c), o.set("title", n), o.set("content", a), 
                        o.set("feedinfo", e.data.info), 1 == e.data.isSrc) {
                            var r = e.data.src, d = new s.File(r, e.data.src);
                            d.save(), o.set("feedpic", d);
                        }
                        o.save(null, {
                            success: function(i) {
                                wx.getStorage({
                                    key: "my_username",
                                    success: function(e) {
                                        var t = e.data;
                                        wx.getStorage({
                                            key: "user_openid",
                                            success: function(e) {
                                                var i = e.data;
                                                s.User.logIn(t, i, {
                                                    success: function(e) {
                                                        var t = e.get("feednum");
                                                        e.set("feednum", t + 1), e.save();
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }), console.log("反馈成功"), e.setData({
                                    isLoading: !1,
                                    isdisabled: !1,
                                    eventId: i.id,
                                    feednum: e.data.feednum + 1
                                }), t.dataLoading("反馈成功", "success", function() {
                                    e.setData({
                                        title: "",
                                        content: "",
                                        src: "",
                                        isSrc: !1
                                    });
                                });
                            },
                            error: function(t, s) {
                                console.log("反馈失败=" + s), e.setData({
                                    isLoading: !1,
                                    isdisabled: !1
                                });
                            }
                        });
                    }
                });
            }
        })), setTimeout(function() {
            e.setData({
                showTopTips: !1
            });
        }, 1e3);
    }
});