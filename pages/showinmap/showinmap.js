var t, e = require("../../utils/common.js"), o = require("../../utils/bmob.js");

getApp();

Page({
    data: {
        moodList: [],
        mapHeight: "100%",
        mapWidth: "100%",
        mapTop: "0",
        point: {
            latitude: 0,
            longitude: 0
        },
        mapScale: 15,
        markers: [],
        controls: [ {
            id: 1,
            position: {
                left: 10 * wx.getStorageSync("kScreenW"),
                top: 523 * wx.getStorageSync("kScreenH"),
                width: 40 * wx.getStorageSync("kScreenW"),
                height: 40 * wx.getStorageSync("kScreenW")
            },
            iconPath: "/static/images/location2.png",
            clickable: !0
        }, {
            id: 2,
            position: {
                left: 177.5 * wx.getStorageSync("kScreenW"),
                top: 261.5 * wx.getStorageSync("kScreenH"),
                width: 32 * wx.getStorageSync("kScreenW"),
                height: 32 * wx.getStorageSync("kScreenW")
            },
            iconPath: "/static/images/now2.png",
            clickable: !1
        } ]
    },
    controltap: function(t) {
        var e = this;
        console.log(t.controlId), e.getUserCurrentLocation();
    },
    getUserCurrentLocation: function() {
        this.mapCtx.moveToLocation(), this.setData({
            mapScale: 15
        });
    },
    regionchange: function(t) {
        this.mapCtx.getCenterLocation({
            success: function(e) {
                e.longitude.toFixed(6), e.latitude.toFixed(6);
                "begin" == t.type ? console.log("位置相同,不执行刷新操作") : console.log("位置变化了");
            }
        });
    },
    markertap: function(t) {
        console.log(t);
        var e = {};
        this.data.markers.map(function(o) {
            o.id == t.markerId && (e = o);
        }), wx.navigateTo({
            url: "/pages/detail/detail?actid=" + e.id + "&pubid=" + e.pubid
        });
    },
    onLoad: function() {
        console.log("onLoad"), t = this, wx.getLocation({
            type: "gcj02",
            success: function(e) {
                var o = {
                    latitude: e.latitude,
                    longitude: e.longitude
                };
                t.setData({
                    point: o
                });
            }
        });
    },
    onShow: function() {
        var n = new Array(), a = o.Object.extend("Events"), i = new o.Query(a);
        i.equalTo("isShow", 1), i.include("publisher"), i.find({
            success: function(e) {
                for (var o = 0; o < e.length; o++) {
                    var a = e[o].id, i = e[o].get("publisher").objectId, r = e[o].get("title");
                    r.length > 5 && (r = r.substring(0, 5) + "...");
                    var c, g = e[o].get("acttype"), l = t.getbgColor(g), s = e[o].get("isShow"), d = (e[o].get("address"), 
                    e[o].get("longitude")), u = e[o].get("latitude"), p = e[o].get("acttypename");
                    c = {
                        id: a || "",
                        title: r || "",
                        pubid: i || "",
                        acttype: g || "",
                        isShow: s,
                        actcolor: l || "",
                        acttypename: p || "",
                        latitude: u || "",
                        longitude: d || ""
                    }, n.push(c), t.setData({
                        moodList: n,
                        markers: t.getSchoolMarkers(n)
                    });
                }
            },
            error: function(t) {
                e.dataLoading(t, "loading"), console.log(t);
            }
        });
    },
    getbgColor: function(t) {
        return 1 == t ? "#FE6C01" : 2 == t ? "#00cdab" : 3 == t ? "#0E53A6" : 4 == t ? "#1DD201" : 5 == t ? "#FEC401" : 6 == t ? "#FE0701" : 7 == t ? "#0C5DA5" : 8 == t ? "#E20149" : 9 == t ? "#A54A00" : void 0;
    },
    onReady: function(t) {
        this.mapCtx = wx.createMapContext("myMap");
    },
    getSchoolMarkers: function(t) {
        var e = [], o = !0, n = !1, a = void 0;
        try {
            for (var i, r = t[Symbol.iterator](); !(o = (i = r.next()).done); o = !0) {
                var c = i.value, g = this.createMarker(c);
                e.push(g);
            }
        } catch (t) {
            n = !0, a = t;
        } finally {
            try {
                !o && r.return && r.return();
            } finally {
                if (n) throw a;
            }
        }
        return e;
    },
    createMarker: function(t) {
        return {
            iconPath: "/static/images/map4.png",
            id: t.id || 0,
            name: t.name || "",
            latitude: t.latitude,
            longitude: t.longitude,
            width: 25,
            height: 25,
            callout: {
                content: t.title,
                color: "white",
                fontSize: 10,
                borderRadius: 50,
                bgColor: t.actcolor,
                padding: 5,
                display: "ALWAYS"
            }
        };
    }
});