const app = getApp();

Page({
  data: {
    userInfo: null,
    isTeacher: false,
    studentMenuList: [
      { id: 'my-clubs', icon: '🏠', title: '我的社团', path: '/pages/clubs/my' },
      { id: 'my-activities', icon: '🎉', title: '我的活动', path: '/pages/activities/my' },
      { id: 'feedback', icon: '📝', title: '意见反馈', path: '/pages/feedback/index' },
      { id: 'settings', icon: '⚙️', title: '设置', path: '/pages/settings/index' },
      { id: 'about', icon: 'ℹ️', title: '关于', path: '/pages/about/index' }
    ],
    teacherMenuList: [
      { id: 'club-manage', icon: '🏠', title: '社团管理', path: '/pages/admin/clubs/index' },
      { id: 'activity-manage', icon: '🎉', title: '活动发布管理', path: '/pages/admin/activities/index' },
      { id: 'feedback', icon: '📝', title: '意见反馈', path: '/pages/feedback/index' },
      { id: 'settings', icon: '⚙️', title: '设置', path: '/pages/settings/index' },
      { id: 'about', icon: 'ℹ️', title: '关于', path: '/pages/about/index' }
    ],
    studentStats: [
      { key: 'clubs', label: '已加入社团', value: 2 },
      { key: 'activities', label: '参与活动', value: 5 },
      { key: 'hours', label: '服务时长', value: 24 }
    ],
    teacherStats: [
      { key: 'students', label: '学生数量', value: 1256 },
      { key: 'clubs', label: '社团数量', value: 24 },
      { key: 'activities', label: '活动数量', value: 18 }
    ]
  },

  onLoad() {
    this.initData();
  },

  onShow() {
    this.initData();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 });
    }
  },

  initData() {
    const userInfo = app.globalData.userInfo;
    const isTeacher = userInfo && (userInfo.role === 'teacher' || userInfo.role === 'admin');
    this.setData({ userInfo, isTeacher });
  },

  onMenuClick(e) {
    const { path } = e.currentTarget.dataset;
    if (path) {
      if (this.data.isTeacher) {
        wx.navigateTo({ url: path });
      } else {
        wx.navigateTo({ url: path });
      }
    } else {
      wx.showToast({ title: '功能开发中', icon: 'none' });
    }
  },

  viewAvatar() {
    const { userInfo } = this.data;
    if (userInfo && userInfo.avatar) {
      wx.previewImage({
        urls: [userInfo.avatar],
        current: userInfo.avatar
      });
    } else {
      wx.showToast({ title: '暂无头像', icon: 'none' });
    }
  },

  chooseAvatar() {
    wx.showActionSheet({
      itemList: ['选择照片', '拍照'],
      success: (res) => {
        const sourceType = res.tapIndex === 0 ? ['album'] : ['camera'];
        
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: sourceType,
          success: (res) => {
            const tempFilePath = res.tempFilePaths[0];
            this.uploadAvatar(tempFilePath);
          },
          fail: (err) => {
            if (err.errMsg !== 'chooseImage:fail cancel') {
              wx.showToast({ title: '选择失败', icon: 'none' });
            }
          }
        });
      }
    });
  },

  uploadAvatar(filePath) {
    wx.showLoading({ title: '上传中...' });
    
    setTimeout(() => {
      const userInfo = { ...this.data.userInfo, avatar: filePath };
      this.setData({ userInfo });
      app.login(userInfo);
      wx.hideLoading();
      wx.showToast({ title: '头像更新成功', icon: 'success' });
    }, 800);
  },

  editProfile() {
    wx.navigateTo({
      url: '/pages/profile/edit'
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
  },

  getRoleLabel(role) {
    const map = { student: '学生', teacher: '教师', admin: '管理员' };
    return map[role] || '学生';
  }
});
