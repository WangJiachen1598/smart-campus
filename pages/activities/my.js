const app = getApp();

Page({
  data: {
    tabs: ['已报名', '已签到'],
    currentTab: 0,
    registeredActivities: [],
    checkedActivities: [],
    loading: true
  },

  onLoad() {
    this.loadData();
  },

  onPullDownRefresh() {
    this.loadData();
    wx.stopPullDownRefresh();
  },

  loadData() {
    this.setData({ loading: true });

    const mockActivities = [
      { id: 1, title: '程序设计竞赛', club: '程序设计协会', time: '2024-12-25 09:00' },
      { id: 2, title: '篮球友谊赛', club: '篮球社', time: '2024-12-20 15:00' },
      { id: 3, title: '技术分享会', club: '程序设计协会', time: '2024-12-15 19:00' }
    ];

    setTimeout(() => {
      this.setData({
        registeredActivities: mockActivities,
        checkedActivities: mockActivities.slice(1),
        loading: false
      });
    }, 500);
  },

  onTabChange(e) {
    this.setData({ currentTab: e.detail.current || e.currentTarget.dataset.index });
  },

  goActivityDetail(e) {
    wx.navigateTo({
      url: `/pages/activities/detail?activityId=${e.currentTarget.dataset.id}`
    });
  }
});
