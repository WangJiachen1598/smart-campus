Page({
  data: {
    tabs: ['全部活动', '已报名'],
    currentTab: 0,
    activities: [],
    loading: true,
    registeredActivities: [],
  },

  onLoad(options) {
    this.loadActivities();
  },

  onPullDownRefresh() {
    this.loadActivities();
    wx.stopPullDownRefresh();
  },

  loadActivities() {
    this.setData({ loading: true });

    const mockActivities = [
      { id: 1, title: '程序设计竞赛', content: '本次竞赛旨在激发学生对程序设计的兴趣，提高编程能力', location: '教学楼A101', startTime: '2024-12-25 09:00', endTime: '2024-12-25 17:00', participantCount: 45, signInCount: 32, signInEnabled: true, status: 'ongoing', statusLabel: '进行中', statusColor: '#4CAF50' },
      { id: 2, title: '篮球友谊赛', content: '增进友谊，锻炼身体', location: '学校体育馆', startTime: '2024-12-18 15:00', endTime: '2024-12-18 17:00', participantCount: 30, signInCount: 25, signInEnabled: true, status: 'upcoming', statusLabel: '即将开始', statusColor: '#1a73e8' },
      { id: 3, title: '技术分享会', content: '分享最新技术动态', location: '图书馆报告厅', startTime: '2024-12-20 19:00', endTime: '2024-12-20 21:00', participantCount: 80, signInCount: 75, signInEnabled: false, status: 'finished', statusLabel: '已结束', statusColor: '#999' }
    ];

    const registeredActivities = mockActivities.filter(a => [1, 2].includes(a.id));

    setTimeout(() => {
      this.setData({
        activities: mockActivities,
        registeredActivities,
        loading: false,
      });
    }, 500);
  },

  onTabChange(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
  },

  goDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/activities/detail?activityId=${id}` });
  },
});
