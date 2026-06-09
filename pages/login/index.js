const app = getApp();

Page({
  data: {
    userType: 'student',
    userId: '',
    password: '',
    agreeProtocol: false,
    loading: false,
  },

  onLoad(options) {
    if (options.role) {
      this.setData({ userType: options.role });
    }
  },

  onChangeUserType(e) {
    this.setData({ userType: e.currentTarget.dataset.type, userId: '', password: '' });
  },

  onInputUserId(e) {
    this.setData({ userId: e.detail.value });
  },

  onInputPassword(e) {
    this.setData({ password: e.detail.value });
  },

  onChangeAgree(e) {
    this.setData({ agreeProtocol: e.detail.value.length > 0 });
  },

  async handleLogin() {
    const { userType, userId, password, agreeProtocol } = this.data;

    if (!agreeProtocol) {
      wx.showToast({ title: '请阅读并同意用户协议', icon: 'none' });
      return;
    }

    if (!userId) {
      wx.showToast({ title: userType === 'student' ? '请输入学号' : '请输入工号', icon: 'none' });
      return;
    }

    if (!password) {
      wx.showToast({ title: '请输入密码', icon: 'none' });
      return;
    }

    this.setData({ loading: true });

    try {
      // 模拟登录验证
      const mockUserInfo = {
        id: 1,
        studentId: userType === 'student' ? userId : '',
        teacherId: userType === 'teacher' ? userId : '',
        name: userType === 'student' ? '张三' : '李老师',
        role: userType,
        classId: 1,
        className: userType === 'student' ? '计算机2101班' : '',
        phone: '13800138001',
        avatar: '',
        token: 'mock_token_' + Date.now(),
      };

      app.login(mockUserInfo);

      wx.showToast({ title: '登录成功', icon: 'success' });
      
      setTimeout(() => {
        wx.switchTab({ url: '/pages/index/index' });
      }, 1500);

    } catch (err) {
      wx.showToast({ title: '登录失败，请重试', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },

  goProtocol() {
    wx.showToast({ title: '协议页面开发中', icon: 'none' });
  },
});
