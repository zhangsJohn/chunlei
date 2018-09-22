module.exports.dataLoading = function(t, o, s) {
    wx.showToast({
        title: t,
        icon: o,
        duration: 500,
        success: s
    });
};