Page({
  data: {
    activities: [
      { id: 1, title: '程序设计竞赛', startTime: '2024-12-25', signInEnabled: true },
      { id: 2, title: '篮球友谊赛', startTime: '2024-12-28', signInEnabled: true },
    ],
    signIns: [
      { id: 1, activityId: 1, studentId: '2021001', name: '张三', signInTime: '2024-12-25 09:00', method: 'qrcode' },
      { id: 2, activityId: 1, studentId: '2021002', name: '李四', signInTime: '2024-12-25 09:05', method: 'manual' },
    ],
    selectedActivity: null,
    dateRange: 'all',
    showDetail: false,
    currentSignIns: [],
  },

  onLoad() {
  },

  selectActivity(e) {
    const activityId = e.currentTarget.dataset.id;
    const activity = this.data.activities.find(a => a.id === activityId);
    let activitySignIns = this.data.signIns.filter(s => s.activityId === activityId);
    
    activitySignIns = activitySignIns.map(s => ({
      ...s,
      signInMethod: s.method === 'qrcode' ? '扫码签到' : '手动签到'
    }));
    
    this.setData({
      selectedActivity: activity,
      currentSignIns: activitySignIns,
      showDetail: true,
    });
  },

  closeDetail() {
    this.setData({
      showDetail: false,
      selectedActivity: null,
      currentSignIns: [],
    });
  },

  generateSignInCode() {
    if (!this.data.selectedActivity) {
      wx.showToast({ title: '请先选择活动', icon: 'none' });
      return;
    }
    const code = Math.random().toString(6).substr(2, 6);
    wx.showModal({
      title: '签到码已生成',
      content: `签到码: ${code}\n请告知活动参与者扫码签到`,
      showCancel: false,
    });
  },

  exportSignIn() {
    if (this.data.currentSignIns.length === 0) {
      wx.showToast({ title: '暂无签到记录', icon: 'none' });
      return;
    }
    wx.showToast({ title: '导出成功', icon: 'success' });
  },
});
