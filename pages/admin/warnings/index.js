Page({
  data: {
    warnings: [],
    filteredWarnings: [],
    stats: {
      total: 0,
      attendance: 0,
      grade: 0,
    },
    currentTab: 'all',
  },

  onLoad() {
    this.loadWarnings();
  },

  loadWarnings() {
    const warnings = [
      { id: 1, studentId: '2021001015', name: '赵六', className: '计算机2101', type: 'attendance', description: '本月缺勤超过3次', level: 'warning', count: 5 },
      { id: 2, studentId: '2021001020', name: '钱七', className: '计算机2102', type: 'grade', description: '不及格科目超过3门', level: 'danger', count: 4 },
      { id: 3, studentId: '2021001025', name: '孙八', className: '软件工程2101', type: 'attendance', description: '连续缺勤5次', level: 'danger', count: 5 },
      { id: 4, studentId: '2021001030', name: '李九', className: '网络工程2101', type: 'grade', description: '成绩下滑严重', level: 'warning', count: 2 },
    ];

    const processedWarnings = warnings.map(w => ({
      ...w,
      typeIcon: w.type === 'attendance' ? '✅' : '📊',
      typeName: w.type === 'attendance' ? '考勤预警' : '成绩预警',
      levelText: w.level === 'danger' ? '严重' : '警告',
    }));

    const stats = {
      total: warnings.length,
      attendance: warnings.filter(w => w.type === 'attendance').length,
      grade: warnings.filter(w => w.type === 'grade').length,
    };

    this.setData({ 
      warnings: processedWarnings,
      filteredWarnings: processedWarnings,
      stats,
    });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    let filteredWarnings = this.data.warnings;
    
    if (tab !== 'all') {
      filteredWarnings = this.data.warnings.filter(w => w.type === tab);
    }
    
    this.setData({ 
      currentTab: tab,
      filteredWarnings,
    });
  },

  viewDetail(e) {
    wx.showToast({ title: '查看详情', icon: 'none' });
  },

  handleWarning(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '处理预警',
      content: '请选择处理方式',
      cancelText: '标记已处理',
      confirmText: '联系家长',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '正在联系...', icon: 'loading' });
        } else if (res.cancel) {
          const warnings = this.data.warnings.filter(w => w.id !== id);
          const filteredWarnings = warnings;
          this.setData({ warnings, filteredWarnings });
          wx.showToast({ title: '已标记处理', icon: 'success' });
        }
      }
    });
  },

  ignoreWarning(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '忽略预警',
      content: '确定要忽略此预警吗？',
      success: (res) => {
        if (res.confirm) {
          const warnings = this.data.warnings.filter(w => w.id !== id);
          const filteredWarnings = this.data.currentTab === 'all' 
            ? warnings 
            : warnings.filter(w => w.type === this.data.currentTab);
          this.setData({ warnings, filteredWarnings });
          wx.showToast({ title: '已忽略', icon: 'success' });
        }
      }
    });
  },

  exportWarnings() {
    wx.showToast({ title: '导出中...', icon: 'loading' });
    setTimeout(() => {
      wx.showToast({ title: '导出成功', icon: 'success' });
    }, 1000);
  },
});
