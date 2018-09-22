var e = getApp();

Page({
    data: {
        version: ""
    },
    onLoad: function() {
        this.setData({
            version: e.version,
            year: new Date().getFullYear()
        });
    }
});