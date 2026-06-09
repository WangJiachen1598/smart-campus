Page({
  data: {
    activities: [
      { id: 1, title: '程序设计竞赛', clubName: '程序设计协会', status: 'active', statusText: '进行中', signInCount: 45, participantCount: 50, startTime: '2024-12-25', location: '学校体育馆' },
      { id: 2, title: '篮球友谊赛', clubName: '篮球社', status: 'upcoming', statusText: '未开始', signInCount: 30, participantCount: 40, startTime: '2024-12-28', location: '篮球场' },
      { id: 3, title: '志愿活动', clubName: '志愿服务队', status: 'ended', statusText: '已结束', signInCount: 80, participantCount: 100, startTime: '2024-12-20', location: '社区广场' },
    ],
    clubs: [
      { id: 1, name: '程序设计协会' },
      { id: 2, name: '篮球社' },
      { id: 3, name: '志愿服务队' },
    ],
    selectedClub: '',
    status: 'all',
    statusOptions: ['全部', '未开始', '进行中', '已结束'],
  },

  onLoad() {
  },

  onStatusChange(e) {
    this.setData({ status: e.detail.value });
  },

  onClubChange(e) {
    this.setData({ selectedClub: e.detail.value });
  },

  goAddActivity() {
    wx.navigateTo({ url: '/pages/admin/activities/edit' });
  },

  editActivity(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/admin/activities/edit?id=${id}` });
  },

  deleteActivity(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个活动吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  },

  viewActivity(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/activities/detail?activityId=${id}` });
  },
});
