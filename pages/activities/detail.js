const app = getApp();

Page({
  data: {
    activityId: null,
    activity: null,
    isRegistered: false,
    isSignedIn: false,
    loading: true,
  },

  onLoad(options) {
    this.setData({ activityId: options.activityId });
    this.loadActivityDetail();
  },

  onPullDownRefresh() {
    this.loadActivityDetail();
    wx.stopPullDownRefresh();
  },

  loadActivityDetail() {
    this.setData({ loading: true });

    const activityData = {
      id: 1,
      title: '程序设计竞赛',
      content: '本次竞赛旨在激发学生对程序设计的兴趣，提高编程能力。欢迎所有热爱编程的同学参加！',
      location: '教学楼A101',
      startTime: '2024-12-25 09:00',
      endTime: '2024-12-25 17:00',
      participantCount: 45,
      signInCount: 32,
      signInEnabled: true,
      status: 'ongoing',
      statusLabel: '进行中',
      statusColor: '#4CAF50',
    };

    const isRegistered = true;
    const isSignedIn = true;

    setTimeout(() => {
      this.setData({
        activity: activityData,
        isRegistered,
        isSignedIn,
        loading: false,
      });
    }, 500);
  },

  registerActivity() {
    if (this.data.isRegistered) {
      wx.showToast({ title: '您已报名该活动', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '报名中...' });
    setTimeout(() => {
      this.setData({ isRegistered: true });
      wx.hideLoading();
      wx.showToast({ title: '报名成功', icon: 'success' });
    }, 500);
  },

  goSignIn() {
    if (!this.data.activity.signInEnabled) {
      wx.showToast({ title: '该活动无需签到', icon: 'none' });
      return;
    }
    wx.showToast({ title: '签到功能开发中', icon: 'none' });
  },

  onShareAppMessage() {
    const { activity } = this.data;
    return {
      title: `${activity.title} - 智慧校园活动`,
      path: `/pages/activities/detail?activityId=${this.data.activityId}`,
    };
  },
});
