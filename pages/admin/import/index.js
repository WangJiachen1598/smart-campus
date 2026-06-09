Page({
  data: {
    importType: 'students',
    fileList: [],
    templateNames: ['学生信息模板', '成绩信息模板', '社团信息模板', '考勤记录模板'],
    selectedTemplateName: '学生信息模板',
    historyList: [
      { id: 1, type: 'students', fileName: '2024级新生信息.xlsx', time: '2024-12-18 10:30', status: 'success', count: 156 },
      { id: 2, type: 'grades', fileName: '期末考试成绩.xlsx', time: '2024-12-15 14:20', status: 'success', count: 320 },
    ],
  },

  onLoad() {},

  onTypeChange(e) {
    const types = ['students', 'grades', 'clubs', 'attendance'];
    const index = e.detail.value;
    this.setData({ 
      importType: types[index],
      selectedTemplateName: this.data.templateNames[index],
    });
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

  importData() {
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

  viewHistory() {},
});
