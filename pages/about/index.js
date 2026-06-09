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
    wx.showModal({
      title: '用户协议',
      content: '欢迎使用智慧校园小程序！\n\n在使用本小程序前，请仔细阅读并理解《用户协议》和《隐私政策》。',
      showCancel: false
    });
  },

  showPrivacy() {
    wx.showModal({
      title: '隐私政策',
      content: '我们重视您的隐私保护。您的个人信息将受到严格保护，不会被泄露或滥用。',
      showCancel: false
    });
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
