const app = getApp();

Page({
  data: {
    notificationEnabled: true,
    soundEnabled: true
  },

  onLoad() {},

  onNotificationChange(e) {
    const enabled = e.detail.value;
    this.setData({ notificationEnabled: enabled });
    wx.showToast({
      title: enabled ? '已开启通知' : '已关闭通知',
      icon: 'none'
    });
  },

  onSoundChange(e) {
    const enabled = e.detail.value;
    this.setData({ soundEnabled: enabled });
    wx.showToast({
      title: enabled ? '已开启声音' : '已关闭声音',
      icon: 'none'
    });
  },

  goChangePassword() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  goPrivacy() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  goAbout() {
    wx.navigateTo({
      url: '/pages/about/index'
    });
  },

  goHelp() {
    wx.navigateTo({
      url: '/pages/feedback/index'
    });
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.logout();
        }
      }
    });
  }
});
