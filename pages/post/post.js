function e(e) {
    var t = e.getMonth() + 1;
    return e.getFullYear() + "-" + t + "-" + e.getDate();
}

getApp();

var t, s = require("../../utils/bmob.js"), a = require("../template/getCode.js"), i = new Date();

Page({
    data: {
        notice_status: !1,
        accounts: [ "微信号", "QQ号", "手机号" ],
        accountIndex: 2,
        peopleHide: !1,
        isAgree: !1,
        date: e(i),
        address: "点击选择位置",
        longitude: 0,
        latitude: 0,
        showTopTips: !1,
        TopTips: "",
        noteMaxLen: 200,
        content: "",
        noteNowLen: 0,
        types: [ "校园服务", "青春伴夕阳", "未来梦工程", "助残阳光行动", "社区公益", "文化宣传", "医疗保健", "应急救护", "地球卫士", "校院赛会" ],
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
        var t = this, s = e.detail.value, a = parseInt(s.length);
        a > t.data.noteMaxLen || t.setData({
            content: s,
            noteNowLen: a
        });
    },
    onLoad: function(e) {
        (t = this).setData({
            src: "",
            isSrc: !1,
            ishide: "0",
            autoFocus: !0,
            isLoading: !1,
            loading: !0,
            isdisabled: !1
        });
    },
    onReady: function() {
        wx.hideToast();
    },
    onShow: function() {
        var e = setInterval(function() {
            wx.getStorage({
                key: "user_openid",
                success: function(s) {
                    s.data && (clearInterval(e), t.setData({
                        loading: !0
                    }));
                }
            });
        }, 500);
    },
    uploadPic: function() {
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var s = e.tempFilePaths;
                t.setData({
                    isSrc: !0,
                    src: s
                });
            }
        });
    },
    clearPic: function() {
        t.setData({
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
                var s = e.tempFilePaths;
                t.setData({
                    isCodeSrc: !0,
                    codeSrc: s
                });
            }
        });
    },
    clearCodePic: function() {
        t.setData({
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
            success: function(s) {
                t.setData({
                    address: s.name,
                    longitude: s.longitude,
                    latitude: s.latitude
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
    bindAgreeChange: function(e) {
        this.setData({
            isAgree: !!e.detail.value.length,
            showInput: !this.data.showInput
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
        var o = this;
        if (0 != o.data.showInput) {
            var n = t.detail.value.title, d = this.data.date, c = t.detail.value.keycode, u = t.detail.value.timelong, p = this.data.typeIndex, l = parseInt(p), r = (this.data.types[l], 
            this.data.address), h = this.data.longitude, T = this.data.latitude, w = t.detail.value.switchHide, g = t.detail.value.peoplenum;
            console.log(g);
            var v = t.detail.value.content, f = t.detail.value.realname, D = t.detail.value.schoolnums, m = this.data.accountIndex, x = this.data.accounts[m], b = t.detail.value.contactValue, S = new RegExp("^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$"), I = new RegExp("[1-9][0-9]{4,}"), y = new RegExp("^1[34578]d{9}$"), C = new RegExp("^[0-9]*$"), L = new RegExp("^[一-龥]{2,4}$");
            "" == n ? this.setData({
                showTopTips: !0,
                TopTips: "请输入主题"
            }) : "chunlei123" != c ? this.setData({
                showTopTips: !0,
                TopTips: "请输入正确的密码"
            }) : "" == u || C.test(u) ? "点击选择位置" == r ? this.setData({
                showTopTips: !0,
                TopTips: "请选择地点"
            }) : 1 == w && "" == g ? this.setData({
                showTopTips: !0,
                TopTips: "请输入人数"
            }) : "" == v ? this.setData({
                showTopTips: !0,
                TopTips: "请输入活动内容"
            }) : "" == f ? this.setData({
                showTopTips: !0,
                TopTips: "请输入真实姓名"
            }) : "" == f || L.test(f) ? "" == D ? this.setData({
                showTopTips: !0,
                TopTips: "请输入学号"
            }) : "" == b ? this.setData({
                showTopTips: !0,
                TopTips: "请输入联系方式"
            }) : "微信号" != x || S.test(b) ? "手机号" != x || y.test(b) ? "QQ号" != x || I.test(b) ? (console.log("校验完毕"), 
            o.setData({
                isLoading: !0,
                isdisabled: !0
            }), wx.getStorage({
                key: "user_id",
                success: function(t) {
                    var c = new (s.Object.extend("Events"))(), p = new s.User();
                    if (p.id = t.data, c.set("title", n), c.set("timelong", u), c.set("endtime", d), 
                    c.set("acttype", l + ""), c.set("isShow", 1), c.set("address", r), c.set("longitude", h), 
                    c.set("latitude", T), o.data.peopleHide ? c.set("peoplenum", g) : o.data.peopleHide || c.set("peoplenum", "-1"), 
                    c.set("content", v), c.set("publisher", p), c.set("likenum", 0), c.set("commentnum", 0), 
                    c.set("liker", []), c.set("joinnumber", 0), c.set("joinArray", []), 1 == o.data.isSrc) {
                        var w = o.data.src, m = new s.File(w, o.data.src);
                        m.save(), c.set("actpic", m);
                    }
                    c.save(null, {
                        success: function(t) {
                            var n = new (s.Object.extend("EventMore"))(), d = new (s.Object.extend("Events"))();
                            if (d.id = t.id, n.set("Status", 0), n.set("Statusname", "准备中"), n.set("event", d), 
                            1 == o.data.isCodeSrc) {
                                var c = o.data.codeSrc, u = new s.File(c, o.data.codeSrc);
                                u.save(), n.set("qrcode", u);
                            }
                            n.save(), wx.getStorage({
                                key: "user_id",
                                success: function(e) {
                                    var a = new (s.Object.extend("Contacts"))(), i = new (s.Object.extend("Events"))();
                                    i.id = t.id;
                                    var o = new s.User();
                                    o.id = e.data, a.set("publisher", o), a.set("currentUser", o), a.set("event", i), 
                                    a.set("schoolNums", D), a.set("realname", f), a.set("contactWay", x), a.set("contactValue", b), 
                                    a.save();
                                }
                            }), console.log("发布成功,objectId:" + t.id), o.setData({
                                isLoading: !1,
                                isdisabled: !1,
                                eventId: t.id
                            }), a.dataLoading("发起成功", "success", function() {
                                o.setData({
                                    title: "",
                                    typeIndex: 0,
                                    address: "点击选择位置",
                                    longitude: 0,
                                    latitude: 0,
                                    date: e(i),
                                    isHide: !0,
                                    peoplenum: 0,
                                    peopleHide: !1,
                                    isAgree: !1,
                                    accountIndex: 0,
                                    realname: "",
                                    schoolnums: "",
                                    content: "",
                                    contactValue: "",
                                    noteNowLen: 0,
                                    showInput: !1,
                                    src: "",
                                    isSrc: !1,
                                    codeSrc: "",
                                    isCodeSrc: !1
                                });
                            });
                        },
                        error: function(e, t) {
                            console.log("发布失败=" + t), a.dataLoading("发起失败", "loading"), o.setData({
                                isLoading: !1,
                                isdisabled: !1
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
            }) : this.setData({
                showTopTips: !0,
                TopTips: "时长请输入数字"
            }), setTimeout(function() {
                o.setData({
                    showTopTips: !1
                });
            }, 1e3);
        } else wx.showModal({
            title: "提示",
            content: "请先阅读《发起须知》"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});