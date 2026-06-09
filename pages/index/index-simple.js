const app = getApp();

Page({
  data: {
    userInfo: null,
    banners: [
      { id: 1, image: '/assets/images/banner1.jpg', title: '程序设计协会纳新中', link: '/pages/clubs/detail?clubId=1' },
      { id: 2, image: '/assets/images/banner2.jpg', title: '期末考试安排通知', link: '/pages/messages/detail?id=2' },
      { id: 3, image: '/assets/images/banner3.jpg', title: '校园歌手大赛报名', link: '/pages/activities/detail?activityId=1' },
    ],
    quickActions: [
      { id: 'clubs', name: '社团报名', icon: '/assets/icons/club.png', path: '/pages/clubs/list' },
      { id: 'signin', name: '活动签到', icon: '/assets/icons/signin.png', path: '/pages/activities/list' },
      { id: 'grades', name: '成绩查询', icon: '/assets/icons/grade.png', path: '/pages/grades/index' },
      { id: 'attendance', name: '考勤记录', icon: '/assets/icons/attendance.png', path: '/pages/attendance/index' },
    ],
    recentActivities: [],
    announcements: [],
    unreadCount: 0,
    isTeacher: false,
    loading: true,
  },

  onLoad() {
    this.initData();
  },

  onShow() {
    this.refreshData();
  },

  onPullDownRefresh() {
    this.refreshData();
    wx.stopPullDownRefresh();
  },

  initData() {
    const userInfo = app.globalData.userInfo;
    const isTeacher = userInfo && (userInfo.role === 'teacher' || userInfo.role === 'admin');

    this.setData({
      userInfo: userInfo,
      isTeacher: isTeacher,
      recentActivities: [
        { id: 1, title: 'ACM程序设计竞赛', club: '程序设计协会', time: '12月20日 09:00', status: 'upcoming', statusText: '报名中' },
        { id: 2, title: '篮球友谊赛', club: '篮球社', time: '12月18日 15:00', status: 'ongoing', statusText: '进行中' },
      ],
      announcements: [
        { id: 1, title: '关于2024-2025学年第一学期期末考试安排的通知', time: '2024-12-15', important: true },
        { id: 2, title: '程序设计协会本周六举办技术分享会', time: '2024-12-14', important: false },
        { id: 3, title: '2024年度综合测评工作启动', time: '2024-12-13', important: false },
      ],
      unreadCount: 3,
      loading: false,
    });
  },

  refreshData() {
    const userInfo = app.globalData.userInfo;
    const isTeacher = userInfo && (userInfo.role === 'teacher' || userInfo.role === 'admin');

    this.setData({
      userInfo: userInfo,
      isTeacher: isTeacher,
    });
  },

  goLogin() {
    wx.navigateTo({ url: '/pages/login/index' });
  },

  goQuickAction(e) {
    const { path } = e.currentTarget.dataset;
    if (path) {
      wx.navigateTo({ url: path });
    }
  },

  goBanner(e) {
    const { link } = e.currentTarget.dataset;
    if (link) {
      wx.navigateTo({ url: link });
    }
  },

  goAnnouncement(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/messages/detail?id=${id}` });
  },

  goAllAnnouncements() {
    wx.switchTab({ url: '/pages/messages/index' });
  },

  goActivity(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/activities/detail?activityId=${id}` });
  },

  goAllActivities() {
    wx.switchTab({ url: '/pages/activities/list' });
  },

  goMyClubs() {
    wx.navigateTo({ url: '/pages/clubs/my' });
  },

  goMyAwards() {
    wx.navigateTo({ url: '/pages/awards/index' });
  },

  goAdminDashboard() {
    wx.navigateTo({ url: '/pages/admin/index' });
  },

  goAdminClubs() {
    wx.navigateTo({ url: '/pages/admin/clubs/index' });
  },

  goAdminActivities() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goAdminMembers() {
    wx.showToast({ title: '功能开发中', icon: 'none' });
  },

  goMessages() {
    wx.switchTab({ url: '/pages/messages/index' });
  },

  goSignIn() {
    wx.scanCode({
      success: (res) => {
        const result = res.result;
        if (result && result.includes('activityId=')) {
          const activityId = result.split('activityId=')[1];
          wx.navigateTo({ url: `/pages/signin/index?activityId=${activityId}` });
        } else {
          wx.showToast({ title: '无效的签到码', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '请扫描正确的签到二维码', icon: 'none' });
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '智慧校园 - 学情与社团一体化管理',
      path: '/pages/index/index',
    };
  },
});
