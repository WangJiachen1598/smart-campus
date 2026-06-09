Page({
  data: {
    exportType: 'students',
    exportTypes: [
      { id: 'students', name: '学生信息', icon: '👨‍🎓', desc: '学号、姓名、班级、联系方式' },
      { id: 'grades', name: '成绩信息', icon: '📊', desc: '学号、课程、成绩、学分' },
      { id: 'clubs', name: '社团信息', icon: '🏠', desc: '社团名称、负责人、成员数' },
      { id: 'attendance', name: '考勤记录', icon: '✅', desc: '学号、日期、考勤状态' },
      { id: 'activities', name: '活动记录', icon: '🎉', desc: '活动名称、时间、参与人数' },
      { id: 'awards', name: '奖惩记录', icon: '🏆', desc: '学号、项目、分数、状态' },
    ],
    dateRange: {
      start: '2024-01-01',
      end: '2024-12-31',
    },
    exportHistory: [
      { id: 1, type: 'students', fileName: '学生信息_2024-12-18.xlsx', time: '2024-12-18 10:30', size: '256KB' },
      { id: 2, type: 'grades', fileName: '成绩信息_2024-12-15.xlsx', time: '2024-12-15 14:20', size: '512KB' },
    ],
  },

  onTypeSelect(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ exportType: type });
  },

  exportData() {
    wx.showLoading({ title: '导出中...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '导出成功', icon: 'success' });
    }, 1500);
  },

  exportAll() {
    wx.showModal({
      title: '批量导出',
      content: '确定要导出所有数据吗？这可能需要一些时间。',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '导出中...' });
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({ title: '全部导出成功', icon: 'success' });
          }, 2000);
        }
      }
    });
  },
});
