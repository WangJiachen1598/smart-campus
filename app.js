App({
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    userRole: 'student',
    appName: '智慧校园'
  },

  onLaunch() {
    this.checkLoginStatus();
  },

  checkLoginStatus() {
    try {
      const userInfo = wx.getStorageSync('userInfo');
      const token = wx.getStorageSync('token');
      
      if (userInfo && token) {
        this.globalData.userInfo = userInfo;
        this.globalData.isLoggedIn = true;
        this.globalData.userRole = userInfo.role || 'student';
      }
    } catch (e) {
      console.error('读取登录状态失败', e);
    }
  },

  login(userInfo) {
    try {
      this.globalData.userInfo = userInfo;
      this.globalData.isLoggedIn = true;
      this.globalData.userRole = userInfo.role || 'student';
      wx.setStorageSync('userInfo', userInfo);
      wx.setStorageSync('token', userInfo.token);
    } catch (e) {
      console.error('登录失败', e);
      wx.showToast({ title: '登录失败', icon: 'none' });
    }
  },

  logout() {
    try {
      this.globalData.userInfo = null;
      this.globalData.isLoggedIn = false;
      this.globalData.userRole = 'student';
      wx.removeStorageSync('userInfo');
      wx.removeStorageSync('token');
      wx.reLaunch({ url: '/pages/login/index' });
    } catch (e) {
      console.error('退出登录失败', e);
    }
  },

  showError(msg) {
    wx.showToast({
      title: msg || '操作失败',
      icon: 'none',
      duration: 2000
    });
  },

  showSuccess(msg) {
    wx.showToast({
      title: msg || '操作成功',
      icon: 'success',
      duration: 1500
    });
  }
});
