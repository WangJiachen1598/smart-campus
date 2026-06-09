const app = getApp();

Page({
  data: {
    userInfo: null,
    months: ['2024-12', '2024-11', '2024-10', '2024-09'],
    currentMonth: '2024-12',
    attendanceList: [],
    attendanceRate: 0,
    normalCount: 0,
    lateCount: 0,
    absentCount: 0,
    leaveCount: 0,
  },

  onLoad() {
    this.setData({ userInfo: app.globalData.userInfo });
    this.loadAttendance();
  },

  onMonthChange(e) {
    const index = e.detail.value;
    this.setData({ currentMonth: this.data.months[index] });
    this.loadAttendance();
  },

  loadAttendance() {
    const attendanceList = [
      { id: 1, date: '2024-12-20', status: 'normal', course: '高等数学' },
      { id: 2, date: '2024-12-19', status: 'late', course: '大学英语' },
      { id: 3, date: '2024-12-18', status: 'normal', course: '数据结构' },
      { id: 4, date: '2024-12-17', status: 'leave', course: '线性代数' },
      { id: 5, date: '2024-12-16', status: 'absent', course: '计算机网络' },
    ];
    
    let normalCount = 0;
    let lateCount = 0;
    let absentCount = 0;
    let leaveCount = 0;
    
    attendanceList.forEach(a => {
      if (a.status === 'normal') normalCount++;
      else if (a.status === 'late') lateCount++;
      else if (a.status === 'absent') absentCount++;
      else if (a.status === 'leave') leaveCount++;
    });
    
    const total = attendanceList.length;
    const attendanceRate = total > 0 ? ((normalCount + leaveCount) / total * 100).toFixed(1) : 0;
    
    this.setData({
      attendanceList,
      attendanceRate,
      normalCount,
      lateCount,
      absentCount,
      leaveCount
    });
  },

  onShareAppMessage() {
    return {
      title: '我的考勤',
      path: '/pages/attendance/index',
    };
  },
});
