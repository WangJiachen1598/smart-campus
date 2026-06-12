Page({
  data: {},

  onLoad() {},

  checkUpdate() {
    wx.showLoading({ title: '检查中...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '已是最新版本',
        showCancel: false
      });
    }, 800);
  },

  showAgreement() {
    wx.navigateTo({ url: '/pages/protocol/index' });
  },

  showPrivacy() {
    wx.navigateTo({ url: '/pages/privacy/index' });
  },

  showLicenses() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  goFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/index'
    });
  },

  shareApp() {
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.showToast({
      title: '请点击右上角分享',
      icon: 'none'
    });
  }
});
