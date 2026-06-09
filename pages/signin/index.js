const app = getApp();

Page({
  data: {
    activityId: null,
    activity: null,
    signInRecords: [],
    hasSignedIn: false,
    loading: true,
    scanning: false,
  },

  onLoad(options) {
    this.setData({ activityId: options.activityId });
    this.loadData();
  },

  loadData() {
    this.setData({ loading: true });

    const activity = {
      id: 1,
      title: '程序设计竞赛',
      location: '教学楼A101',
      startTime: '2024-12-25 09:00',
      signInCode: 'SIGN2024',
    };

    const signInRecords = [
      { id: 1, studentId: '2021001', userName: '张三', signInTime: '2024-12-25 09:00', method: 'qrcode' },
      { id: 2, studentId: '2021002', userName: '李四', signInTime: '2024-12-25 09:05', method: 'manual' },
    ];

    const hasSignedIn = true;

    setTimeout(() => {
      this.setData({
        activity,
        signInRecords,
        hasSignedIn,
        loading: false,
      });
    }, 500);
  },

  scanCode() {
    if (this.data.hasSignedIn) {
      wx.showToast({ title: '您已签到', icon: 'none' });
      return;
    }

    this.setData({ scanning: true });

    wx.scanCode({
      success: (res) => {
        this.processSignIn(res.result);
      },
      fail: () => {
        this.setData({ scanning: false });
      },
    });
  },

  processSignIn(code) {
    if (code === this.data.activity.signInCode) {
      wx.showLoading({ title: '签到中...' });
      
      setTimeout(() => {
        const newRecord = {
          id: Date.now(),
          activityId: this.data.activity.id,
          studentId: '2021001',
          signInTime: new Date().toLocaleString(),
          method: 'qrcode',
          userName: '当前用户',
        };

        this.setData({
          signInRecords: [newRecord, ...this.data.signInRecords],
          hasSignedIn: true,
          scanning: false,
        });

        wx.hideLoading();
        wx.showToast({ title: '签到成功', icon: 'success' });
      }, 800);
    } else {
      this.setData({ scanning: false });
      wx.showToast({ title: '签到码无效', icon: 'none' });
    }
  },

  manualSignIn() {
    if (this.data.hasSignedIn) {
      wx.showToast({ title: '您已签到', icon: 'none' });
      return;
    }

    wx.showModal({
      title: '手动签到',
      content: '确认要手动签到吗？',
      success: (res) => {
        if (res.confirm) {
          this.processSignIn(this.data.activity.signInCode);
        }
      }
    });
  },
});
