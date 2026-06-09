const app = getApp();

Page({
  data: {
    tabs: ['我的社团', '待审批'],
    currentTab: 0,
    myClubs: [],
    pendingClubs: [],
    loading: true
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    if (app.globalData.isLoggedIn) {
      this.loadData();
    }
  },

  onPullDownRefresh() {
    this.loadData();
    wx.stopPullDownRefresh();
  },

  loadData() {
    this.setData({ loading: true });

    const mockClubs = [
      { id: 1, name: '程序设计协会', description: '聚集编程爱好者，交流技术，共同进步', memberCount: 128, activityCount: 24 },
      { id: 2, name: '篮球社', description: '强身健体，以球会友', memberCount: 86, activityCount: 18 },
      { id: 3, name: '志愿服务队', description: '奉献爱心，传递温暖', memberCount: 156, activityCount: 32 }
    ];

    setTimeout(() => {
      this.setData({
        myClubs: mockClubs.slice(0, 2).map(c => ({ ...c, status: 'joined' })),
        pendingClubs: [{ ...mockClubs[2], status: 'pending', applyTime: '2024-12-25' }],
        loading: false
      });
    }, 500);
  },

  onTabChange(e) {
    this.setData({ currentTab: e.detail.current || e.currentTarget.dataset.index });
  },

  goClubDetail(e) {
    wx.navigateTo({
      url: `/pages/clubs/detail?clubId=${e.currentTarget.dataset.id}`
    });
  },

  cancelApply(e) {
    wx.showModal({
      title: '确认取消',
      content: '确定要取消申请吗？',
      success: (res) => {
        if (res.confirm) {
          const index = e.currentTarget.dataset.index;
          const pendingClubs = this.data.pendingClubs.filter((_, i) => i !== index);
          this.setData({ pendingClubs });
          wx.showToast({ title: '已取消申请', icon: 'success' });
        }
      }
    });
  }
});
