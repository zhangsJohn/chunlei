var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./utils/Touches.js")), t = require("utils/bmob.js"), n = (require("utils/common.js"), 
require("utils/util"));

t.initialize("020104ba677b57f95df62138ebeabd66", "c8898c284065efd0b260c1e37f53f3b8"), 
App({
    version: "v2.2.4",
    onLaunch: function() {
        wx.getSystemInfo({
            success: function(e) {
                var t = e.windowWidth / 375, n = e.windowHeight / 603;
                wx.setStorageSync("kScreenW", t), wx.setStorageSync("kScreenH", n);
            }
        }), wx.checkSession({
            success: function() {},
            fail: function() {
                wx.login();
            }
        });
    },
    onShow: function() {},
    formate_data: function(e) {
        var t = e.getMonth() + 1;
        return e.getFullYear() + "年" + t + "月" + e.getDate() + "日 " + e.getHours() + "点" + e.getMinutes() + "分";
    },
    getUserInfo: function(e) {
        var t = this;
        this.globalData.userInfo ? "function" == typeof e && e(this.globalData.userInfo) : wx.login({
            success: function() {
                wx.getUserInfo({
                    success: function(n) {
                        t.globalData.userInfo = n.userInfo, "function" == typeof e && e(t.globalData.userInfo);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        count: 0
    },
    getAll: function(e, n, o) {
        self = o;
        var a = t.Object.extend(e), s = new t.Query(a);
        s.equalTo(n, wx.getStorageSync("user_id")), s.count({
            success: function(e) {
                var t = 0, n = 0;
                if (e % self.data.limitPage == 0) t = parseInt(e / self.data.limitPage); else {
                    var o = parseInt(e / self.data.limitPage);
                    n = e - o * self.data.limitPage, t = o + 1;
                }
                self.setData({
                    totalCount: e,
                    endPage: n,
                    totalPage: t
                }), self.data.currentPage + 1 == self.data.totalPage && self.setData({
                    isEmpty: !0
                }), console.log("共有" + e + " 条记录"), console.log("共有" + t + "页"), console.log("最后一页加载" + n + "条");
            }
        });
    },
    onPullDownRefresh: function() {},
    onError: function(e) {},
    Touches: new e.default(),
    util: n
});