require("../../utils/common.js");

var t = require("../../utils/bmob.js"), e = require("../../utils/util.js"), n = getApp(), i = wx.getStorageSync("my_nick"), o = wx.getStorageSync("my_sex"), c = wx.getStorageSync("my_avatar");

Page({
    data: {
        my_nick: i,
        my_sex: o,
        my_avatar: c,
        userInfo: [],
        buttonClicked: !1,
        countMy: 0,
        timeLong: 0
    },
    onLoad: function(t) {
        this.getMyCount();
    },
    onShow: function(t) {
        this.onLoad(), console.log("加载头像");
        var e = this;
        n.getUserInfo(function(t) {
            e.setData({
                userInfo: t
            });
        });
    },
    getMyCount: function() {
        self = this;
        var e = t.Object.extend("Contacts"), n = new t.Query(e);
        n.equalTo("currentUser", wx.getStorageSync("user_id")), n.include("event"), n.descending("createAt"), 
        n.include("publisher"), n.count({
            success: function(t) {
                self.setData({
                    countMy: t
                });
            }
        }), n.find({
            success: function(t) {
                for (var e = 0, n = 0; n < t.length; n++) {
                    var i = t[n].get("event").timelong;
                    null == i && (i = 0), e += parseInt(i);
                }
                self.setData({
                    timeLong: e
                });
            },
            error: function(t) {
                console.log("查询时长失败: " + t.code + " " + t.message);
            }
        });
    },
    click_myLaunch: function() {
        this.buttonClicked || (e.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/mylaunch/mylaunch"
        }));
    },
    click_myJoin: function() {
        this.buttonClicked || (e.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/myjoin/myjoin"
        }));
    },
    click_myCollection: function() {
        this.buttonClicked || (e.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/mycollection/mycollection"
        }));
    },
    click_projectBrief: function() {
        this.buttonClicked || (e.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/projectbrief/projectbrief"
        }));
    },
    click_Tick: function() {
        this.buttonClicked || (e.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/issues/issues"
        }));
    },
    click_more: function() {
        this.buttonClicked || (e.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/more/more"
        }));
    },
    click_aboutUs: function() {
        this.buttonClicked || (e.buttonClicked(this), wx.navigateTo({
            url: "/pages/my/aboutus/aboutus"
        }));
    }
});