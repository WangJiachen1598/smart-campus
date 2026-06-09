const app = getApp();

Page({
  data: {
    currentClass: '计算机2101班',
    attendanceData: [
      { className: '计科2101', rate: 95 },
      { className: '计科2102', rate: 92 },
      { className: '软件工程2101', rate: 88 },
    ],
    gradeData: [
      { label: '优秀', count: 12 },
      { label: '良好', count: 18 },
      { label: '及格', count: 6 },
      { label: '不及格', count: 5 },
    ],
    warnings: [
      { studentId: '2021001', name: '张三', className: '计算机2101', description: '连续3天未签到', level: 'high' },
      { studentId: '2021002', name: '李四', className: '计算机2101', description: '成绩下降明显', level: 'medium' },
      { studentId: '2021003', name: '王五', className: '计算机2101', description: '旷课2周未参加活动', level: 'low' },
    ],
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
  },

  loadData() {
  },

  onClassChange(e) {
    this.setData({ currentClass: e.detail.value });
  },

  goHome() {
    wx.reLaunch({ url: '/pages/index/index' });
  },
});
