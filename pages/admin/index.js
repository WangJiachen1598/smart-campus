const app = getApp();

Page({
  data: {
    userInfo: null,
    isTeacher: true,
    currentTab: 'all',
    dashboardData: {
      overview: {
        studentCount: 1256,
        clubCount: 24,
        activityCount: 18,
        pendingApproval: 12
      }
    },
    recentActivities: [],
    pendingCount: 0,
  },

  onLoad() {
    this.initPage();
  },

  onShow() {
    if (app.globalData.isLoggedIn) {
      this.setData({ userInfo: app.globalData.userInfo });
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
  },

  initPage() {
    this.setData({
      pendingCount: 12,
      recentActivities: [
        { id: 1, title: '程序设计竞赛即将开始', time: '2024-12-20' },
        { id: 2, title: '新社团申请待审批', time: '2024-12-19' },
        { id: 3, title: '成绩数据需要更新', time: '2024-12-18' },
      ],
    });
  },

  switchTab(e) {
    this.setData({ currentTab: e.currentTarget.dataset.tab });
  },

  goStudentManage() {
    wx.reLaunch({ url: '/pages/admin/students/index' });
  },

  goDashboard() {
    wx.reLaunch({ url: '/pages/admin/dashboard/index' });
  },

  goClubManage() {
    wx.navigateTo({ url: '/pages/admin/clubs/index' });
  },

  goMemberApproval() {
    wx.navigateTo({ url: '/pages/admin/members/index' });
  },

  goActivityPublish() {
    wx.navigateTo({ url: '/pages/admin/activities/index' });
  },

  goSigninManage() {
    wx.navigateTo({ url: '/pages/admin/signin/index' });
  },

  goBatchManage() {
    wx.navigateTo({ url: '/pages/admin/batch/index' });
  },

  goWarnings() {
    wx.navigateTo({ url: '/pages/admin/warnings/index' });
  },

  goHome() {
    wx.reLaunch({ url: '/pages/index/index' });
  },
});
