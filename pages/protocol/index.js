Page({
  data: {
    scrollTop: 0
  },

  onLoad() {
    this.setData({ scrollTop: 0 });
  },

  scrollToTop() {
    this.setData({ scrollTop: 0 });
    wx.pageScrollTo({ scrollTop: 0, duration: 300 });
  },

  copyContact() {
    wx.setClipboardData({
      data: 'support@smartcampus.com',
      success: () => {
        wx.showToast({ title: '邮箱已复制', icon: 'success' });
      }
    });
  }
});
