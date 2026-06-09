const app = getApp();

Page({
  data: {
    currentTab: 'import',
    importType: 'students',
    exportType: 'students',
    dataTypes: [
      { id: 'students', name: '学生信息', icon: '👨‍🎓', desc: '学号、姓名、班级、联系方式' },
      { id: 'grades', name: '成绩信息', icon: '📊', desc: '学号、课程、成绩、学分' },
      { id: 'clubs', name: '社团信息', icon: '🏠', desc: '社团名称、负责人、成员数' },
      { id: 'attendance', name: '考勤记录', icon: '✅', desc: '学号、日期、考勤状态' },
      { id: 'activities', name: '活动记录', icon: '🎉', desc: '活动名称、时间、参与人数' },
      { id: 'awards', name: '奖惩记录', icon: '🏆', desc: '学号、项目、分数、状态' },
    ],
    fileList: [],
    dateRange: {
      start: '2024-01-01',
      end: '2024-12-31',
    },
    importHistory: [
      { id: 1, type: 'students', fileName: '2024级新生信息.xlsx', time: '2024-12-18 10:30', status: 'success', count: 156 },
      { id: 2, type: 'grades', fileName: '期末考试成绩.xlsx', time: '2024-12-15 14:20', status: 'success', count: 320 },
    ],
    exportHistory: [
      { id: 1, type: 'students', fileName: '学生信息_2024-12-18.xlsx', time: '2024-12-18 10:30', size: '256KB', url: '' },
      { id: 2, type: 'grades', fileName: '成绩信息_2024-12-15.xlsx', time: '2024-12-15 14:20', size: '512KB', url: '' },
    ],
  },

  onLoad() {
  },

  switchTab(e) {
    this.setData({ currentTab: e.currentTarget.dataset.tab });
  },

  selectImportType(e) {
    this.setData({ importType: e.currentTarget.dataset.type });
  },

  selectExportType(e) {
    this.setData({ exportType: e.currentTarget.dataset.type });
  },

  get currentTypeName() {
    const type = this.data.dataTypes.find(t => t.id === this.data.importType);
    return type ? type.name : '';
  },

  downloadTemplate() {
    wx.showToast({ title: '模板下载中...', icon: 'loading' });
    setTimeout(() => {
      wx.showToast({ title: '模板已下载', icon: 'success' });
    }, 1000);
  },

  chooseFile() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        const file = res.tempFiles[0];
        this.setData({
          fileList: [{ name: file.name, path: file.path }],
        });
        wx.showToast({ title: '文件已选择', icon: 'success' });
      },
    });
  },

  removeFile(e) {
    const index = e.currentTarget.dataset.index;
    const newList = [...this.data.fileList];
    newList.splice(index, 1);
    this.setData({ fileList: newList });
  },

  startImport() {
    if (this.data.fileList.length === 0) {
      wx.showToast({ title: '请先选择文件', icon: 'none' });
      return;
    }
    wx.showLoading({ title: '导入中...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '导入成功', icon: 'success' });
      this.setData({ fileList: [] });
    }, 1500);
  },

  onStartDateChange(e) {
    this.setData({ 'dateRange.start': e.detail.value });
  },

  onEndDateChange(e) {
    this.setData({ 'dateRange.end': e.detail.value });
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

  downloadHistory(e) {
    wx.showToast({ title: '下载中...', icon: 'loading' });
    setTimeout(() => {
      wx.showToast({ title: '下载完成', icon: 'success' });
    }, 1000);
  },
});
