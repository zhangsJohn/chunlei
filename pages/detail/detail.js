function e(e) {
    var t = "";
    switch (e) {
      case 0:
        t = "校园服务";
        break;

      case 1:
        t = "青春伴夕阳";
        break;

      case 2:
        t = "未来梦工程";
        break;

      case 3:
        t = "助残阳光行动";
        break;

      case 4:
        t = "社区公益";
        break;

      case 5:
        t = "文化宣传";
        break;

      case 6:
        t = "医疗保健";
        break;

      case 7:
        t = "应急救护";
        break;

      case 8:
        t = "地球卫士";
        break;

      case 9:
        t = "校院赛会";
        break;

      default:
        t = "志愿活动";
    }
    return t;
}

function t(e) {
    var t = 0;
    return "微信号" == e ? t = 0 : "QQ号" == e ? t = 1 : "手机号" == e && (t = 2), t;
}

var a, n, s, o, i, c, r, u, l = require("../../components/wux"), d = require("../template/getCode.js"), g = require("../../utils/bmob.js"), f = require("../../utils/util.js"), m = (getApp(), 
void 0);

Page({
    data: {
        accounts: [ "微信号", "QQ号", "手机号" ],
        accountIndex: 0,
        actStatusArray: [ "准备中", "进行中", "已结束" ],
        statusIndex: 0,
        realname: "",
        contactValue: "",
        showTopTips: !1,
        TopTips: "",
        timelong: "0",
        linkmainHe: !1,
        linkjoinHe: !1,
        tag_select: 0,
        limit: 5,
        showImage: !1,
        loading: !1,
        isdisabled: !1,
        commentLoading: !1,
        isdisabled1: !1,
        recommentLoading: !1,
        commentList: [],
        joinList: [],
        likerList: [],
        agree: 0,
        favo: 0,
        join: 0,
        isMe: !1,
        isToResponse: !1,
        status: 0,
        adminId: "",
        adminname: "",
        adcontactWay: "",
        adcontactValue: "",
        adminschoolnums: "",
        showCommentDialog: !1,
        commentInputHolder: "请输入评论内容",
        index: 2,
        opened: !1,
        style_img: ""
    },
    showQrcode: function() {
        var e = "/pages/detail/detail?actid=" + n + "&pubid=" + s, t = this;
        g.generateCode({
            path: e,
            width: 40
        }).then(function(e) {
            console.log(e), t.setData({
                imageBytes: e.imageBytes,
                codeHehe: !0
            });
        }, function(e) {
            d.showTip("生成二维码失败" + e);
        });
    },
    closeCode: function() {
        this.setData({
            codeHehe: !1
        });
    },
    showqrcode: function() {
        this.setData({
            qrcodeHe: !0
        });
    },
    closeqrcode: function() {
        this.setData({
            qrcodeHe: !1
        });
    },
    showmainLink: function() {
        this.setData({
            linkmainHe: !0
        });
    },
    closemainLink: function() {
        this.setData({
            linkmainHe: !1
        });
    },
    showjoinLink: function(e) {
        var t = e.currentTarget.dataset.id;
        a.setData({
            currJoinId: t
        });
        var n = a.data.joinList;
        n.forEach(function(e) {
            e.id === t && (e.linkjoinHe = !0);
        }), this.setData({
            joinList: n
        });
    },
    closejoinLink: function() {
        var e = a.data.currJoinId, t = a.data.joinList;
        t.forEach(function(t) {
            t.id === e && (t.linkjoinHe = !1);
        }), this.setData({
            joinList: t
        });
    },
    copyLink: function(e) {
        var t = e.target.dataset.value;
        wx.setClipboardData({
            data: t,
            success: function() {
                d.dataLoading("复制成功", "success"), console.log("复制成功");
            }
        });
    },
    changePage: function(e) {
        var t = e.target.id;
        this.setData({
            status: t
        });
    },
    onLoad: function(e) {
        this.initButton(), a = this;
        wx.getStorageSync("user_openid");
        n = e.actid, s = e.pubid;
        new Array();
        wx.getStorage({
            key: "user_id",
            success: function(e) {
                s == e.data && (a.setData({
                    favo: 3,
                    join: 3,
                    isMe: !0
                }), console.log("这是我的发起"));
            }
        }), console.log("this is options.actid=" + e.actid), console.log("this is options.pubid=" + e.pubid);
    },
    onReady: function() {
        wx.hideToast();
    },
    onShow: function() {
        var t = setInterval(function() {
            wx.getStorage({
                key: "user_id",
                success: function(s) {
                    if (s.data) {
                        if (clearInterval(t), 0 == a.data.isMe) {
                            var o = new g.Query(g.User);
                            o.equalTo("objectId", s.data), o.find({
                                success: function(e) {
                                    var t = e[0].get("eventFavo"), s = e[0].get("eventJoin"), o = !1, i = !1;
                                    if (null != t && t.length > 0) for (c = 0; c < t.length; c++) if (t[c] == n) {
                                        t.splice(c, 1), o = !0;
                                        break;
                                    }
                                    if (null != s && s.length > 0) for (var c = 0; c < s.length; c++) if (s[c] == n) {
                                        s.splice(c, 1), i = !0;
                                        break;
                                    }
                                    "1" == o ? a.setData({
                                        favo: 1
                                    }) : "0" == o && a.setData({
                                        favo: 0
                                    }), "1" == i ? a.setData({
                                        join: 1
                                    }) : "0" == i && a.setData({
                                        join: 0
                                    });
                                },
                                error: function(e) {
                                    console.log(e);
                                }
                            });
                        }
                        var i = g.Object.extend("Events"), c = new g.Query(i);
                        c.equalTo("objectId", n), c.include("publisher"), c.find({
                            success: function(t) {
                                var n, o, i = t[0].get("title"), c = t[0].get("content"), r = t[0].get("publisher"), u = t[0].get("acttype"), l = e(parseInt(u)), d = t[0].get("timelong"), g = t[0].get("isShow"), m = t[0].get("endtime"), v = t[0].createdAt, h = f.getDateDiff(v), p = t[0].get("address"), w = t[0].get("longitude"), b = t[0].get("latitude"), y = t[0].get("peoplenum"), T = t[0].get("joinnumber"), x = t[0].get("likenum"), D = t[0].get("liker"), j = t[0].get("commentnum"), k = r.nickname, S = r.id;
                                n = r.userPic ? r.userPic : "/static/images/icon/user_defaulthead@2x.png", o = t[0].get("actpic") ? t[0].get("actpic")._url : "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/01/89a6eba340008dce801381c4550787e4.png", 
                                r.id == s.data && a.setData({
                                    isMine: !0
                                }), a.setData({
                                    listTitle: i,
                                    listContent: c,
                                    publishTime: h,
                                    listPic: o,
                                    agreeNum: x,
                                    commNum: j,
                                    acttype: u,
                                    acttypename: l,
                                    isShow: g,
                                    timelong: d,
                                    endtime: m,
                                    address: p,
                                    longitude: w,
                                    latitude: b,
                                    peoplenum: y,
                                    joinnumber: T,
                                    publisherPic: n,
                                    publisherName: k,
                                    objectIds: S,
                                    loading: !0
                                });
                                for (var L = 0; L < D.length; L++) {
                                    var _ = 0;
                                    if (D[L] == s.data) {
                                        _ = 1, a.setData({
                                            agree: _
                                        });
                                        break;
                                    }
                                }
                                a.commentQuery(t[0]), a.joinDetail(t[0]), a.likerDetail(t[0]), a.eventMore(t[0]);
                            },
                            error: function(e) {
                                a.setData({
                                    loading: !0
                                }), console.log(e);
                            }
                        });
                    }
                }
            });
        }, 500);
    },
    eventMore: function(e) {
        var t = g.Object.extend("EventMore"), n = new g.Query(t);
        n.equalTo("event", e), n.find({
            success: function(e) {
                var t = e[0].id;
                i = t;
                var n, s = e[0].get("Statusname"), o = e[0].get("Status");
                n = e[0].get("qrcode") ? e[0].get("qrcode")._url : null, a.setData({
                    eventMoreId: t,
                    statusname: s,
                    actstatus: o,
                    statusIndex: o,
                    qrcode: n
                });
            }
        });
    },
    commentQuery: function(e) {
        var t = this;
        c = new Array();
        var n = g.Object.extend("Comments"), s = new g.Query(n);
        s.equalTo("event", e), s.limit(t.data.comPage), s.skip(t.data.comPage * t.data.comCurPage), 
        s.descending("createAt"), s.include("publisher"), s.find({
            success: function(e) {
                for (var t = 0; t < e.length; t++) {
                    var n, s = e[t].id, o = e[t].get("olderComment"), i = e[t].get("publisher").objectId, r = e[t].get("content"), u = e[t].createdAt, l = f.getDateDiff(u), d = e[t].get("publisher").userPic, g = e[t].get("publisher").nickname;
                    o ? (o = o.id, n = e[t].get("olderUserName")) : (o = 0, n = "");
                    var m;
                    m = {
                        id: s || "",
                        content: r || "",
                        pid: o || "",
                        uid: i || "",
                        created_at: l || "",
                        pusername: n || "",
                        username: g || "",
                        avatar: d || ""
                    }, c.push(m), a.setData({
                        commentList: c,
                        loading: !0
                    });
                }
            },
            error: function(e) {
                d.dataLoadin(e, "loading"), console.log(e);
            }
        });
    },
    joinDetail: function(e) {
        r = new Array();
        var n = g.Object.extend("Contacts"), s = new g.Query(n);
        s.equalTo("event", e), s.include("currentUser"), s.include("publisher"), s.descending("createAt"), 
        s.find({
            success: function(e) {
                for (var n = 0; n < e.length; n++) {
                    var s = e[n].get("currentUser").objectId;
                    if (s == e[n].get("publisher").objectId) {
                        console.log("获取发起者信息成功");
                        var i = e[n].id, c = e[n].get("realname"), u = e[n].get("schoolNums"), l = e[n].get("contactWay"), d = e[n].get("contactValue");
                        a.setData({
                            adminId: s,
                            adminname: c,
                            adminschoolnums: u,
                            adcontactWay: l,
                            adcontactValue: d,
                            loading: !0
                        });
                    } else {
                        if (s == wx.getStorageSync("user_id")) {
                            console.log("获取加入者信息成功");
                            i = e[n].id;
                            o = i;
                            var g = e[n].get("realname"), u = e[n].get("schoolNums"), m = e[n].get("contactWay"), v = e[n].get("contactValue");
                            a.setData({
                                joinId: i,
                                joinname: g,
                                meschoolnums: u,
                                jocountIndex: t(m),
                                jocontactValue: v,
                                loading: !0
                            });
                        }
                        var h, i = e[n].id, p = e[n].get("realname"), u = e[n].get("schoolNums"), w = e[n].get("contactWay"), b = e[n].get("contactValue"), y = e[n].get("currentUser").username, T = e[n].get("currentUser").userPic, x = e[n].createdAt;
                        h = {
                            id: i,
                            realname: p,
                            schoolnums: u,
                            joinuserid: s,
                            joinusername: y,
                            joinuserpic: T,
                            contactWay: w,
                            contactValue: b,
                            jointime: f.getDateDiff(x),
                            linkjoinHe: !1
                        }, r.push(h), a.setData({
                            joinList: r,
                            loading: !0
                        });
                    }
                }
            },
            error: function(e) {
                d.dataLoadin(e, "loading"), console.log(e);
            }
        });
    },
    likerDetail: function(e) {
        u = new Array();
        var t = g.Object.extend("Likes"), n = new g.Query(t);
        n.equalTo("event", e), n.include("liker"), n.descending("createAt"), n.find({
            success: function(e) {
                for (var t = 0; t < e.length; t++) {
                    var n, s = e[t].id, o = e[t].get("liker").objectId, i = e[t].get("liker").username, c = e[t].get("liker").userPic, r = e[t].createdAt;
                    n = '{"id":"' + s + '","likerid":"' + o + '","likername":"' + i + '","likerpic":"' + c + '","liketime":"' + f.getDateDiff(r) + '"}';
                    var l = JSON.parse(n);
                    u.push(l), a.setData({
                        likerList: u,
                        loading: !0
                    });
                }
            },
            error: function(e) {
                d.dataLoadin(e, "loading"), console.log(e);
            }
        });
    },
    changeLike: function(e) {
        a.setData({
            style_img: "transform:scale(1.5);"
        }), setTimeout(function() {
            a.setData({
                style_img: "transform:scale(1);"
            });
        }, 500);
        var t = !1, o = a.data.agree, i = parseInt(this.data.agreeNum);
        "0" == o ? (i += 1, a.setData({
            agree: 1,
            agreeNum: i
        })) : "1" == o && (i -= 1, a.setData({
            agree: 0,
            agreeNum: i
        })), wx.getStorage({
            key: "user_id",
            success: function(e) {
                var o = g.Object.extend("Events"), i = new g.Query(o);
                i.equalTo("objectId", n), i.find({
                    success: function(o) {
                        var i = o[0].get("liker"), c = !1;
                        if (i.length > 0) {
                            for (var r = 0; r < i.length; r++) if (i[r] == e.data) {
                                i.splice(r, 1), c = !0, t = !0, a.downLike(e), o[0].set("likenum", o[0].get("likenum") - 1);
                                break;
                            }
                            0 == c && (i.push(e.data), a.upLike(e), o[0].set("likenum", o[0].get("likenum") + 1));
                        } else i.push(e.data), a.upLike(e), o[0].set("likenum", o[0].get("likenum") + 1);
                        o[0].save();
                        var u = g.Object.extend("Plyre"), u = new g.Query(u), l = new g.User();
                        l.id = e.data, t ? (u.equalTo("uid", l), u.equalTo("wid", n), u.equalTo("behavior", 2), 
                        u.find({
                            success: function(e) {
                                if (console.log(e), 0 == e.length) {
                                    var t = wx.getStorageSync("my_avatar"), a = wx.getStorageSync("my_username"), o = new (g.Object.extend("Plyre"))();
                                    o.set("behavior", 2), o.set("noticetype", "取消赞"), o.set("bigtype", 1), o.set("avatar", t), 
                                    o.set("username", a), o.set("uid", l), o.set("wid", n), o.set("fid", s), o.set("is_read", 0), 
                                    o.save();
                                }
                            }
                        })) : (u.equalTo("uid", l), u.equalTo("wid", n), u.equalTo("behavior", 1), u.find({
                            success: function(e) {
                                if (console.log(e), 0 == e.length) {
                                    var t = wx.getStorageSync("my_avatar"), a = wx.getStorageSync("my_username"), o = new (g.Object.extend("Plyre"))();
                                    o.set("behavior", 1), o.set("noticetype", "点赞"), o.set("bigtype", 1), o.set("avatar", t), 
                                    o.set("username", a), o.set("uid", l), o.set("wid", n), o.set("fid", s), o.set("is_read", 0), 
                                    o.save();
                                }
                            }
                        }));
                    },
                    error: function(e) {
                        console.log("赞/取消赞失败"), console.log(e);
                    }
                }), a.onShow();
            }
        });
    },
    upLike: function(e) {
        var t = new (g.Object.extend("Likes"))(), a = new g.User();
        a.id = e.data;
        var s = new (g.Object.extend("Events"))();
        s.id = n, t.set("liker", a), t.set("event", s), t.save(null, {
            success: function() {
                console.log("写入点赞表成功");
            },
            error: function(e) {
                console.log("写入点赞表失败"), console.log(e);
            }
        });
    },
    downLike: function(e) {
        var t = new g.User();
        t.id = e.data;
        var a = new (g.Object.extend("Events"))();
        a.id = n;
        var s = g.Object.extend("Likes"), o = new g.Query(s);
        o.equalTo("liker", t), o.equalTo("event", a), o.destroyAll({
            success: function() {
                console.log("删除点赞表中的数据成功");
            },
            error: function(e) {
                console.log("删除点赞表的数据失败"), console.log(e);
            }
        });
    },
    showCommentDialog: function(e) {
        this.setData({
            showCommentDialog: !0,
            commentInputHolder: "string" == typeof e ? e : "请输入评论内容"
        });
    },
    hideCommentDialog: function() {
        this.setData({
            showCommentDialog: !1,
            isToResponse: !1
        });
    },
    commentText: function(e) {
        m = e.detail.value;
    },
    commentTap: function(e) {
        var t = this, a = e.currentTarget.dataset.item, s = void 0;
        s = a.uid == wx.getStorageSync("user_id") ? [ "删除" ] : [ "回复" ], wx.showActionSheet({
            itemList: s,
            success: function(e) {
                var o = s[e.tapIndex];
                if ("回复" == o) t.setData({
                    pid: a.uid,
                    isToResponse: !0,
                    responseName: a.username
                }), t.showCommentDialog("回复" + a.username + "："); else if ("删除" == o) {
                    var i = g.Object.extend("Comments");
                    new g.Query(i).get(a.id, {
                        success: function(e) {
                            e.destroy({
                                success: function(e) {
                                    d.dataLoading("删除成功", "success"), console.log("删除成功");
                                },
                                error: function(e) {
                                    console.log("删除评论错误");
                                }
                            });
                        }
                    });
                    var c = g.Object.extend("Events");
                    new g.Query(c).get(n, {
                        success: function(e) {
                            e.set("commentnum", e.get("commentnum") - 1), e.save();
                        }
                    }), t.onShow();
                }
            }
        });
    },
    publishComment: function(e) {
        var t = this, a = !1;
        m && 0 != m.length ? (t.setData({
            isdisabled: !0,
            commentLoading: !0
        }), wx.getStorage({
            key: "user_id",
            success: function(e) {
                t.setData({
                    commentLoading: !1
                }), new g.Query(g.User).get(e.data, {
                    success: function(o) {
                        var i = new (g.Object.extend("Comments"))(), c = g.Object.extend("Events"), r = new c();
                        r.id = n;
                        var u = new g.User();
                        if (u.id = e.data, i.set("publisher", u), i.set("event", r), i.set("content", m), 
                        console.log("commentText=" + m), t.data.isToResponse) {
                            a = !0;
                            var l = t.data.responseName, f = new (g.Object.extend("Comments"))();
                            f.id = t.data.pid, i.set("olderUserName", l), i.set("olderComment", f);
                        }
                        i.save(null, {
                            success: function(o) {
                                new g.Query(c).get(n, {
                                    success: function(o) {
                                        o.set("commentnum", o.get("commentnum") + 1), o.save();
                                        var i = new g.User();
                                        i.id = e.data;
                                        var c = wx.getStorageSync("my_avatar"), r = wx.getStorageSync("my_username"), u = new (g.Object.extend("Plyre"))();
                                        console.log("isReply=" + a), a ? (u.set("behavior", 4), u.set("noticetype", "回复")) : (u.set("behavior", 3), 
                                        u.set("noticetype", "评论")), u.set("bigtype", 1), u.set("avatar", c), u.set("username", r), 
                                        u.set("uid", i), u.set("wid", n), u.set("fid", s), u.set("is_read", 0), u.save(null, {
                                            success: function(e) {
                                                console.log("isReply3=" + a), a ? (d.dataLoading("回复成功", "success"), console.log("回复成功")) : (d.dataLoading("评论成功", "success"), 
                                                console.log("评论成功"));
                                            },
                                            error: function(e, t) {
                                                console.log("评论失败");
                                            }
                                        }), t.setData({
                                            commentText: ""
                                        }), t.hideCommentDialog(), t.onShow();
                                    },
                                    error: function(e, t) {
                                        console.log(t);
                                    }
                                }), t.setData({
                                    publishContent: "",
                                    isToResponse: !1,
                                    responeContent: "",
                                    isdisabled: !1,
                                    commentLoading: !1
                                });
                            },
                            error: function(e, a) {
                                d.dataLoading(a, "loading"), t.setData({
                                    publishContent: "",
                                    isToResponse: !1,
                                    responeContent: "",
                                    isdisabled: !1,
                                    commentLoading: !1
                                });
                            }
                        });
                    },
                    error: function(e, t) {
                        console.log(t);
                    }
                });
            }
        })) : (this.setData({
            showTopTips: !0,
            TopTips: "请输入评论内容"
        }), setTimeout(function() {
            t.setData({
                showTopTips: !1
            });
        }, 3e3)), setTimeout(function() {
            t.setData({
                showTopTips: !1
            });
        }, 1e3);
    },
    bindKeyInput: function(e) {
        this.setData({
            publishContent: e.detail.value
        });
    },
    seeActBig: function(e) {
        wx.previewImage({
            current: a.data.listPic,
            urls: [ a.data.listPic ]
        });
    },
    seeqrCodeBig: function(e) {
        wx.previewImage({
            current: a.data.qrcode,
            urls: [ a.data.qrcode ]
        });
    },
    viewActAddress: function() {
        var e = this.data.latitude, t = this.data.longitude;
        wx.openLocation({
            latitude: e,
            longitude: t
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log(this.data.listTitle), {
            title: this.data.listTitle,
            path: "/pages/detail/detail?actid=" + n + "&pubid" + s,
            imageUrl: this.data.istPic,
            success: function(e) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success"
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "转发失败",
                    icon: "fail"
                });
            }
        };
    },
    click_join: function(e) {
        var t = a.data.join;
        a.data.peoplenum > 0 && a.data.peoplenum - a.data.joinnumber <= 0 ? wx.showModal({
            title: "温馨提示",
            content: "此活动参加人数已满",
            showCancel: !0
        }) : "3" == t ? this.setData({
            showStuDialog: !0
        }) : "0" == t ? this.setData({
            showDialog: !this.data.showDialog
        }) : "1" == t && (wx, wx.showModal({
            title: "温馨提示",
            content: "确定取消加入吗？",
            showCancel: !0,
            success: function(e) {
                e.confirm && (a.setData({
                    status: 0
                }), wx.getStorage({
                    key: "user_id",
                    success: function(e) {
                        var t = new g.User();
                        t.id = e.data;
                        var o = new (g.Object.extend("Events"))();
                        o.id = n;
                        var i = g.Object.extend("Contacts"), c = new g.Query(i);
                        c.equalTo("currentUser", t), c.equalTo("event", o), c.destroyAll({
                            success: function() {
                                console.log("删除联系表中的数据成功"), a.setData({
                                    join: 0
                                });
                            },
                            error: function(e) {
                                console.log("删除联系表中的数据失败");
                            }
                        });
                        var r = new g.User();
                        r.id = e.data;
                        var u = wx.getStorageSync("my_avatar"), l = wx.getStorageSync("my_username"), d = new (g.Object.extend("Plyre"))();
                        d.set("behavior", 6), d.set("noticetype", "取消参加"), d.set("bigtype", 2), d.set("avatar", u), 
                        d.set("username", l), d.set("uid", r), d.set("wid", n), d.set("fid", s), d.set("is_read", 0), 
                        d.save();
                        var i = g.Object.extend("Events"), f = new g.Query(i);
                        f.equalTo("objectId", n), f.find({
                            success: function(t) {
                                for (var a = t[0].get("joinArray"), n = 0; n < a.length; n++) if (a[n] == e.data) {
                                    a.splice(n, 1), t[0].set("joinnumber", t[0].get("joinnumber") - 1);
                                    break;
                                }
                                t[0].save();
                            }
                        });
                    }
                }), wx.getStorage({
                    key: "my_username",
                    success: function(e) {
                        var t = e.data;
                        wx.getStorage({
                            key: "user_openid",
                            success: function(e) {
                                var s = e.data;
                                g.User.logIn(t, s, {
                                    success: function(e) {
                                        var t = e.get("eventJoin");
                                        if (t.length > 0) for (var s = 0; s < t.length; s++) if (t[s] == n) {
                                            t.splice(s, 1);
                                            break;
                                        }
                                        e.set("eventJoin", t), e.save(null, {
                                            success: function() {
                                                d.dataLoading("取消参加成功", "success");
                                            },
                                            error: function(e) {
                                                console.log("取消参加失败");
                                            }
                                        }), a.onShow();
                                    }
                                });
                            }
                        });
                    }
                }));
            },
            fail: function(e) {},
            complete: function(e) {}
        }));
    },
    closeJoin: function() {
        this.setData({
            showDialog: !this.data.showDialog
        });
    },
    closeUpdJoin: function() {
        this.setData({
            showUpdDialog: !1
        });
    },
    closeChange: function() {
        this.setData({
            showStuDialog: !1
        });
    },
    changeStatus: function(e) {
        this.setData({
            statusIndex: e.detail.value
        });
    },
    bindAccountChange: function(e) {
        this.setData({
            accountIndex: e.detail.value
        });
    },
    updjoinChange: function(e) {
        this.setData({
            jocountIndex: e.detail.value
        });
    },
    stuSubmit: function(e) {
        var t = a.data.statusIndex;
        if (0 == t) s = "准备中"; else if (1 == t) s = "进行中"; else if (2 == t) var s = "已结束";
        var o = g.Object.extend("EventMore");
        new g.Query(o).get(i, {
            success: function(e) {
                if (e.set("Status", Number(t)), e.set("Statusname", s), e.save(), "已结束" == s) {
                    var o = g.Object.extend("Events");
                    new g.Query(o).get(n, {
                        success: function(e) {
                            e.set("isShow", 0), e.save(), console.log("撤离成功");
                        },
                        error: function(e, t) {
                            console.log("撤离失败" + t);
                        }
                    });
                }
                a.setData({
                    showStuDialog: !1
                }), console.log("改变状态成功"), d.dataLoading("改变成功", "success");
            },
            error: function(e, t) {
                console.log("改变状态失败" + t);
            }
        }), a.onShow();
    },
    joinSubmit: function(e) {
        var t = a.data.join, o = a.data.accountIndex;
        if ("0" == t ? a.setData({
            join: 1
        }) : "1" == t && a.setData({
            join: 0
        }), 0 == o) i = "微信号"; else if (1 == o) i = "QQ号"; else if (2 == o) var i = "手机号";
        var c = e.detail.value.realname, r = e.detail.value.schoolnums, u = e.detail.value.contactValue, l = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$"), f = new RegExp("[1-9][0-9]{4,}"), m = new RegExp("0?(13|14|15|17|18|19)[0-9]{9}"), v = new RegExp("^[一-龥]{2,4}$");
        "" == c ? this.setData({
            showTopTips: !0,
            TopTips: "请输入真实姓名"
        }) : "" == c || v.test(c) ? "" == r ? this.setData({
            showTopTips: !0,
            TopTips: "请输入你的学号"
        }) : "" == u ? this.setData({
            showTopTips: !0,
            TopTips: "请输入联系方式"
        }) : "微信号" != i || l.test(u) ? "手机号" != i || m.test(u) ? "QQ号" != i || f.test(u) ? (wx.getStorage({
            key: "user_id",
            success: function(e) {
                var t = new (g.Object.extend("Contacts"))(), o = new (g.Object.extend("Events"))();
                o.id = n;
                var l = new g.User();
                l.id = e.data;
                var d = new g.User();
                d.id = s, t.set("publisher", d), t.set("currentUser", l), t.set("event", o), t.set("realname", c), 
                t.set("schoolNums", r), t.set("contactWay", i), t.set("contactValue", u), console.log(t), 
                t.save(null, {
                    success: function() {
                        a.setData({
                            showDialog: !a.data.showDialog
                        }), console.log("写入联系表成功"), a.setData({
                            accountIndex: 0,
                            contactValue: "",
                            realname: "",
                            mscloolnums: ""
                        });
                    },
                    error: function(e) {
                        console.log(e);
                    }
                }), a.onShow();
                var f = new g.User();
                f.id = e.data;
                var m = wx.getStorageSync("my_avatar"), v = wx.getStorageSync("my_username"), h = new (g.Object.extend("Plyre"))();
                h.set("behavior", 5), h.set("noticetype", "参加活动"), h.set("bigtype", 2), h.set("avatar", m), 
                h.set("username", v), h.set("uid", f), h.set("wid", n), h.set("fid", s), console.log("fid=" + s), 
                h.set("is_read", 0), h.save();
                var p = g.Object.extend("Events"), w = new g.Query(p);
                w.equalTo("objectId", n), w.find({
                    success: function(t) {
                        t[0].get("joinArray").push(e.data), t[0].set("joinnumber", t[0].get("joinnumber") + 1), 
                        t[0].save();
                    }
                });
            }
        }), wx.getStorage({
            key: "user_openid",
            success: function(t) {
                var o = t.data, i = e.detail.formId, c = a.data.listTitle, r = a.data.address, u = a.data.adminname, l = a.data.adcontactWay + " : " + a.data.adcontactValue;
                console.log("actid=" + n + ",pubid" + s + ",title" + a.data.listTitle + ",adminname=" + a.data.adminname + ",address" + a.data.address + ",adcontactWay=" + a.data.adcontactWay + ",adcontactValue=" + a.data.adcontactValue);
                var f = {
                    touser: o,
                    template_id: "NY0sFhJfxkA49EaRPhBYr17xiLqHKJ_XRAHMBQ52Y1c",
                    page: "",
                    form_id: i,
                    data: {
                        keyword1: {
                            value: c
                        },
                        keyword2: {
                            value: r
                        },
                        keyword3: {
                            value: u
                        },
                        keyword4: {
                            value: l
                        },
                        keyword5: {
                            value: "您已成功加入发起,请及时与发起人联系"
                        }
                    },
                    emphasis_keyword: ""
                };
                g.sendMessage(f).then(function(e) {
                    console.log("发送成功");
                }, function(e) {
                    d.showTip("失败" + e);
                });
            }
        }), wx.getStorage({
            key: "my_username",
            success: function(e) {
                var t = e.data;
                wx.getStorage({
                    key: "user_openid",
                    success: function(e) {
                        var s = e.data;
                        g.User.logIn(t, s, {
                            success: function(e) {
                                var t = e.get("eventJoin"), s = !1;
                                if (null == t && (t = []), t.length > 0) {
                                    for (var o = 0; o < t.length; o++) if (t[o] == n) {
                                        t.splice(o, 1), s = !0;
                                        break;
                                    }
                                    0 == s && t.push(n);
                                } else t.push(n);
                                e.set("eventJoin", t), e.save(null, {
                                    success: function() {
                                        0 == s ? d.dataLoading("参加成功", "success") : 1 == s && d.dataLoading("取消参加成功", "success");
                                    },
                                    error: function(e) {
                                        console.log("参加失败");
                                    }
                                }), a.onShow();
                            }
                        });
                    }
                });
            }
        })) : this.setData({
            showTopTips: !0,
            TopTips: "QQ号格式不正确"
        }) : this.setData({
            showTopTips: !0,
            TopTips: "手机号格式不正确"
        }) : this.setData({
            showTopTips: !0,
            TopTips: "微信号格式不正确"
        }) : this.setData({
            showTopTips: !0,
            TopTips: "真实姓名一般为2-4位汉字"
        }), setTimeout(function() {
            a.setData({
                showTopTips: !1
            });
        }, 1e3);
    },
    updSubmit: function(e) {
        var t = a.data.jocountIndex;
        if (0 == t) i = "微信号"; else if (1 == t) i = "QQ号"; else if (2 == t) var i = "手机号";
        var c = e.detail.value.joinname, r = e.detail.value.schoolnums, u = e.detail.value.jocontactValue, l = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$"), f = new RegExp("[1-9][0-9]{4,}"), m = new RegExp("0?(13|14|15|17|18|19)[0-9]{9}"), v = new RegExp("^[一-龥]{2,4}$");
        if ("" == c) this.setData({
            showTopTips: !0,
            TopTips: "请输入真实姓名"
        }); else if ("" == c || v.test(c)) if ("" == r) this.setData({
            showTopTips: !0,
            TopTips: "请输入学号"
        }); else if ("" == u) this.setData({
            showTopTips: !0,
            TopTips: "请输入联系方式"
        }); else if ("微信号" != i || l.test(u)) if ("手机号" != i || m.test(u)) if ("QQ号" != i || f.test(u)) {
            g.Object.extend("Contacts");
            new g.Query("Contacts").get(o, {
                success: function(e) {
                    e.set("realname", c), e.set("schoolNums", r), e.set("contactWay", i), e.set("contactValue", u), 
                    e.save({
                        success: function() {
                            var e = new g.User();
                            e.id = wx.getStorageSync("user_id");
                            var t = wx.getStorageSync("my_avatar"), a = wx.getStorageSync("my_username"), o = new (g.Object.extend("Plyre"))();
                            o.set("behavior", 7), o.set("noticetype", "修改信息"), o.set("bigtype", 1), o.set("avatar", t), 
                            o.set("username", a), o.set("uid", e), o.set("wid", n), o.set("fid", s), console.log("fid=" + s), 
                            o.set("is_read", 0), o.save(), console.log("修改成功"), d.dataLoading("修改成功", "success");
                        },
                        error: function(e) {
                            console.log("修改失败");
                        }
                    }), a.onShow();
                }
            }), a.setData({
                showUpdDialog: !1
            });
        } else this.setData({
            showTopTips: !0,
            TopTips: "QQ号格式不正确"
        }); else this.setData({
            showTopTips: !0,
            TopTips: "手机号格式不正确"
        }); else this.setData({
            showTopTips: !0,
            TopTips: "微信号格式不正确"
        }); else this.setData({
            showTopTips: !0,
            TopTips: "真实姓名一般为2-4位汉字"
        });
        setTimeout(function() {
            a.setData({
                showTopTips: !1
            });
        }, 1e3);
    },
    click_favo: function(e) {
        var t = a.data.favo;
        if ("3" == t) {
            var s = g.Object.extend("Events"), o = new g.Query(s);
            if (2 != a.data.actstatus && 1 == a.data.isShow) wx.showModal({
                title: "是否撤离首页?",
                content: "撤离后您的发起将不会在首页展示",
                showCancel: !0,
                success: function(e) {
                    e.confirm && (o.get(n, {
                        success: function(e) {
                            e.set("isShow", 0), e.save(), console.log("撤离成功"), d.dataLoading("撤离成功", "success");
                        },
                        error: function(e, t) {
                            console.log("撤离失败" + t);
                        }
                    }), a.onShow());
                }
            }); else if (2 != a.data.actstatus && 0 == a.data.isShow) wx.showModal({
                title: "是否公开发起?",
                content: "公开后您的发起将会在首页展示",
                showCancel: !0,
                success: function(e) {
                    e.confirm && (o.get(n, {
                        success: function(e) {
                            e.set("isShow", 1), e.save(), console.log("公开成功"), d.dataLoading("公开成功", "success");
                        },
                        error: function(e, t) {
                            console.log("公开失败" + t);
                        }
                    }), a.onShow());
                }
            }); else if (2 == a.data.actstatus) return void wx.showModal({
                title: "温馨提示",
                content: "已结束的发起不能公开到首页"
            });
        } else "0" == t ? a.setData({
            favo: 1
        }) : "1" == t && a.setData({
            favo: 0
        });
        "3" != t && wx.getStorage({
            key: "my_username",
            success: function(e) {
                var t = e.data;
                wx.getStorage({
                    key: "user_openid",
                    success: function(e) {
                        var s = e.data;
                        g.User.logIn(t, s, {
                            success: function(e) {
                                var t = wx.getStorageSync("user_id"), s = e.get("eventFavo"), o = !1;
                                if (null == s && (s = []), s.length > 0) {
                                    for (var i = 0; i < s.length; i++) if (s[i] == n) {
                                        s.splice(i, 1), o = !0, a.downFavo(t);
                                        break;
                                    }
                                    0 == o && (s.push(n), a.upFavo(t));
                                } else s.push(n), a.upFavo(t);
                                e.set("eventFavo", s), e.save(null, {
                                    success: function() {
                                        0 == o ? d.dataLoading("收藏成功", "success") : 1 == o && d.dataLoading("取消收藏成功", "success");
                                    },
                                    error: function(e) {
                                        console.log("失败");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    upFavo: function(e) {
        var t = new (g.Object.extend("Favos"))(), a = new g.User();
        a.id = e;
        var s = new (g.Object.extend("Events"))();
        s.id = n, t.set("favor", a), t.set("event", s), t.save(null, {
            success: function() {
                console.log("写入收藏表成功");
            },
            error: function(e) {
                console.log("写入收藏表失败"), console.log(e);
            }
        });
    },
    downFavo: function(e) {
        var t = new g.User();
        t.id = e;
        var a = new (g.Object.extend("Events"))();
        a.id = n;
        var s = g.Object.extend("Favos"), o = new g.Query(s);
        o.equalTo("favor", t), o.equalTo("event", a), o.destroyAll({
            success: function() {
                console.log("删除收藏表中的数据成功");
            },
            error: function(e) {
                console.log("删除收藏表的数据失败"), console.log(e);
            }
        });
    },
    deleteEvent: function() {
        wx.showModal({
            title: "是否删除该活动?",
            content: "删除后将不能恢复",
            showCancel: !0,
            confirmColor: "#a07c52",
            cancelColor: "#646464",
            success: function(e) {
                if (e.confirm) {
                    var t = g.Object.extend("Events");
                    new g.Query(t).get(n, {
                        success: function(e) {
                            e.destroy({
                                success: function(e) {
                                    d.dataLoading("删除成功", "success", function() {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    });
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
                }
            }
        });
    },
    initButton: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "bottomRight";
        this.setData({
            opened: !1
        }), this.button = l.$wuxButton.init("br", {
            position: e,
            buttons: [ {
                label: "群二维码",
                icon: "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/02/e049248040b452cd805877235b8b9e0c.png"
            }, {
                label: "修改信息",
                icon: "http://bmob-cdn-14867.b0.upaiyun.com/2017/12/02/9134d4a24058705f80a61ec82455fe47.png"
            } ],
            buttonClicked: function(e, t) {
                if (0 === e) null == a.data.qrcode ? a.data.isMe ? wx.showModal({
                    title: "温馨提示",
                    content: "您还未上传群二维码，如需上传，请点击修改信息"
                }) : wx.showModal({
                    title: "温馨提示",
                    content: "该活动暂未上传群二维码，您可联系发起者建群上传"
                }) : a.showqrcode(); else if (1 === e) {
                    var o = n, i = s;
                    a.data.isMe ? wx.navigateTo({
                        url: "/pages/updAct/updAct?actid=" + o + "&pubid=" + i
                    }) : a.setData({
                        showUpdDialog: !0
                    });
                }
                return !0;
            },
            callback: function(e, t) {
                e.setData({
                    opened: t
                });
            }
        });
    },
    switchChange: function(e) {
        e.detail.value ? this.button.open() : this.button.close();
    },
    pickerChange: function(e) {
        var t = e.detail.value, a = this.data.types[t];
        this.initButton(a);
    }
});