function e(e) {
    var t = "";
    return 1 == e ? t = "运动" : 2 == e ? t = "游戏" : 3 == e ? t = "交友" : 4 == e ? t = "旅行" : 5 == e ? t = "读书" : 6 == e ? t = "竞赛" : 7 == e ? t = "电影" : 8 == e ? t = "音乐" : 9 == e && (t = "其他"), 
    t;
}

function t(e) {
    var t = 0;
    return "微信号" == e ? t = 0 : "QQ号" == e ? t = 1 : "手机号" == e && (t = 2), t;
}

getApp();

var a, s, n, o, i, c = require("../../utils/bmob.js"), d = require("../template/getCode.js"), u = new Date();

Page({
    data: {
        notice_status: !1,
        accounts: [ "微信号", "QQ号", "手机号" ],
        accountIndex: 0,
        peopleHide: !1,
        isAgree: !1,
        date: function(e) {
            var t = e.getMonth() + 1;
            return e.getFullYear() + "-" + t + "-" + e.getDate();
        }(u),
        address: "点击选择位置",
        longitude: 0,
        latitude: 0,
        showTopTips: !1,
        TopTips: "",
        noteMaxLen: 200,
        content: "",
        noteNowLen: 0,
        types: [ "运动", "游戏", "交友", "旅行", "读书", "竞赛", "电影", "音乐", "其他" ],
        typeIndex: "0",
        showInput: !1
    },
    tapNotice: function(e) {
        "notice" == e.target.id && this.hideNotice();
    },
    showNotice: function(e) {
        this.setData({
            notice_status: !0
        });
    },
    hideNotice: function(e) {
        this.setData({
            notice_status: !1
        });
    },
    bindTextAreaChange: function(e) {
        var t = this, a = e.detail.value, s = parseInt(a.length);
        s > t.data.noteMaxLen || t.setData({
            content: a,
            noteNowLen: s
        });
    },
    onLoad: function(e) {
        a = this, s = e.actid, n = e.pubid, a.setData({
            src: "",
            isSrc: !1,
            ishide: "0",
            autoFocus: !0,
            isLoading: !1,
            loading: !0,
            isdisabled: !1
        });
        var t = c.Object.extend("Events"), o = new c.Query(t);
        o.equalTo("objectId", s), o.include("publisher"), o.find({
            success: function(e) {
                var t = e[0].get("title"), s = e[0].get("content"), n = e[0].get("acttype"), o = e[0].get("endtime"), i = e[0].get("address"), c = e[0].get("peoplenum");
                c > 0 && a.setData({
                    switchp: !0,
                    peopleHide: !0
                }), console.log(c);
                var d;
                e[0].get("actpic") ? (d = e[0].get("actpic")._url, a.setData({
                    isSrc: !0
                })) : d = null, a.setData({
                    title: t,
                    typeIndex: n - 1,
                    address: i,
                    date: o,
                    peoplenum: c,
                    content: s,
                    src: d,
                    actUrl: d
                }), a.selfInfo(e[0]), a.eventMore(e[0]);
            },
            error: function(e) {
                console.log(e);
            }
        });
    },
    onReady: function() {
        wx.hideToast();
    },
    onShow: function() {
        var e = setInterval(function() {
            wx.getStorage({
                key: "user_openid",
                success: function(t) {
                    t.data && (clearInterval(e), a.setData({
                        loading: !0
                    }));
                }
            });
        }, 500);
    },
    eventMore: function(e) {
        var t = c.Object.extend("EventMore"), s = new c.Query(t);
        s.equalTo("event", e), s.find({
            success: function(e) {
                var t = e[0].id;
                i = t;
                var s, n = e[0].get("Statusname"), o = e[0].get("Status");
                e[0].get("qrcode") ? (s = e[0].get("qrcode")._url, a.setData({
                    isCodeSrc: !0
                })) : s = null, a.setData({
                    statusname: n,
                    actstatus: o,
                    codeSrc: s,
                    QrUrl: s
                });
            }
        });
    },
    selfInfo: function(e) {
        var s = c.Object.extend("Contacts"), i = new c.Query(s);
        i.equalTo("event", e);
        var u = new c.User();
        u.id = n, i.include("publisher", u), i.find({
            success: function(e) {
                var s = e[0].id;
                o = s;
                var n = e[0].get("realname"), i = e[0].get("contactWay"), c = e[0].get("contactValue");
                a.setData({
                    realname: n,
                    accountIndex: t(i),
                    contactValue: c,
                    loading: !0
                });
            },
            error: function(e) {
                d.dataLoadin(e, "loading"), console.log(e);
            }
        });
    },
    uploadPic: function() {
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths;
                a.setData({
                    upnew: !0,
                    isSrc: !0,
                    src: t
                });
            }
        });
    },
    clearPic: function() {
        a.setData({
            isSrc: !1,
            src: ""
        });
    },
    uploadCodePic: function() {
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths;
                a.setData({
                    upqrnew: !0,
                    isCodeSrc: !0,
                    codeSrc: t
                });
            }
        });
    },
    clearCodePic: function() {
        a.setData({
            isCodeSrc: !1,
            codeSrc: ""
        });
    },
    switch1Change: function(e) {
        0 == e.detail.value ? this.setData({
            peopleHide: !1
        }) : 1 == e.detail.value && this.setData({
            peopleHide: !0
        });
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        });
    },
    bindTypeChange: function(e) {
        this.setData({
            typeIndex: e.detail.value
        });
    },
    addressChange: function(e) {
        this.addressChoose(e);
    },
    addressChoose: function(e) {
        var t = this;
        wx.chooseLocation({
            success: function(a) {
                t.setData({
                    address: a.name,
                    longitude: a.longitude,
                    latitude: a.latitude,
                    upadnew: !0
                }), e.detail && e.detail.value && (this.data.address = e.detail.value);
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    bindAccountChange: function(e) {
        this.setData({
            accountIndex: e.detail.value
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
    submitForm: function(t) {
        var a = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$"), n = new RegExp("[1-9][0-9]{4,}"), u = new RegExp("0?(13|14|15|17|18|19)[0-9]{9}"), l = new RegExp("^[一-龥]{2,4}$"), r = this, p = t.detail.value.title, h = this.data.date, g = this.data.typeIndex, f = 1 + parseInt(g), T = (e(f), 
        this.data.address), v = this.data.longitude, w = this.data.latitude, D = t.detail.value.switchHide, m = t.detail.value.peoplenum, x = t.detail.value.content, b = t.detail.value.realname, y = this.data.accountIndex;
        if (0 == y) I = "微信号"; else if (1 == y) I = "QQ号"; else if (2 == y) var I = "手机号";
        var S = t.detail.value.contactValue;
        "" == p ? this.setData({
            showTopTips: !0,
            TopTips: "请输入主题"
        }) : "点击选择位置" == T ? this.setData({
            showTopTips: !0,
            TopTips: "请选择地点"
        }) : 1 == D && void 0 == m ? this.setData({
            showTopTips: !0,
            TopTips: "请输入人数"
        }) : "" == x ? this.setData({
            showTopTips: !0,
            TopTips: "请输入活动内容"
        }) : "" == b ? this.setData({
            showTopTips: !0,
            TopTips: "请输入真实姓名"
        }) : "" == b || l.test(b) ? "" == S ? this.setData({
            showTopTips: !0,
            TopTips: "请输入联系方式"
        }) : "微信号" != I || a.test(S) ? "手机号" != I || u.test(S) ? "QQ号" != I || n.test(S) ? (r.setData({
            isLoading: !0,
            isdisabled: !0
        }), wx.getStorage({
            key: "user_id",
            success: function(e) {
                var t = c.Object.extend("Events");
                new c.Query(t).get(s, {
                    success: function(e) {
                        if (e.set("title", p), e.set("endtime", h), e.set("acttype", f + ""), r.data.upadnew && (e.set("address", T), 
                        e.set("longitude", v), e.set("latitude", w)), r.data.peopleHide ? (console.log(m), 
                        e.set("peoplenum", m)) : r.data.peopleHide || e.set("peoplenum", "-1"), e.set("content", x), 
                        1 == r.data.upnew) {
                            if (null != r.data.actUrl) new c.Files.del(r.data.actUrl).then(function(e) {
                                "ok" == e.msg && console.log("删除旧活动图片成功");
                            }, function(e) {
                                console.log("删除旧活动图片失败"), console.log(e);
                            });
                            var t = r.data.src, a = new c.File(t, r.data.src);
                            a.save(), e.set("actpic", a);
                        }
                        e.save(null, {
                            success: function(e) {
                                c.Object.extend("Contacts");
                                if (new c.Query("Contacts").get(o, {
                                    success: function(e) {
                                        e.set("realname", b), e.set("contactWay", I), e.set("contactValue", S), e.save();
                                    }
                                }), console.log("that.data.upqrnew=" + r.data.upqrnew), 1 == r.data.upqrnew) {
                                    if (null != r.data.QrUrl) new c.Files.del(r.data.QrUrl).then(function(e) {
                                        "ok" == e.msg && console.log("删除旧群二维码成功");
                                    }, function(e) {
                                        console.log("删除旧群二维码失败"), console.log(e);
                                    });
                                    var t = r.data.codeSrc, a = new c.File(t, r.data.codeSrc);
                                    a.save();
                                    var s = c.Object.extend("EventMore");
                                    new c.Query(s).get(i, {
                                        success: function(e) {
                                            e.set("qrcode", a), e.save();
                                        }
                                    });
                                }
                                console.log("修改成功,objectId:" + e.id), r.setData({
                                    isLoading: !1,
                                    isdisabled: !1,
                                    eventId: e.id
                                }), d.dataLoading("修改成功", "success", function() {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                });
                            },
                            error: function(e, t) {
                                console.log("修改失败=" + t), r.setData({
                                    isLoading: !1,
                                    isdisabled: !1
                                });
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
            r.setData({
                showTopTips: !1
            });
        }, 1e3);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    seeActBig: function(e) {
        wx.previewImage({
            current: a.data.src,
            urls: [ a.data.src ]
        });
    },
    seeqrCodeBig: function(e) {
        wx.previewImage({
            current: a.data.codeSrc,
            urls: [ a.data.codeSrc ]
        });
    }
});