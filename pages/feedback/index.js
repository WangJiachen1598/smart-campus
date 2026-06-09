const app = getApp();

Page({
  data: {
    userInfo: null,
    currentTab: 0,
    feedbackType: 'suggestion',
    feedbackContent: '',
    images: [],
    historyList: [],
    loading: false
  },

  onLoad() {
    this.setData({ userInfo: app.globalData.userInfo });
    this.loadHistory();
  },

  onTabChange(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
  },

  onTypeChange(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ feedbackType: type });
  },

  onContentInput(e) {
    this.setData({ feedbackContent: e.detail.value });
  },

  chooseImage() {
    const maxCount = 3 - this.data.images.length;
    if (maxCount <= 0) {
      wx.showToast({ title: '最多只能上传3张图片', icon: 'none' });
      return;
    }

    wx.chooseImage({
      count: maxCount,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = res.tempFilePaths;
        this.setData({
          images: [...this.data.images, ...newImages]
        });
      }
    });
  },

  removeImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images.filter((_, i) => i !== index);
    this.setData({ images });
  },

  previewImage(e) {
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls: this.data.images
    });
  },

  submitFeedback() {
    if (!this.data.feedbackContent.trim()) {
      wx.showToast({ title: '请填写反馈内容', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '提交中...' });
    
    setTimeout(() => {
      wx.hideLoading();
      
      const newFeedback = {
        id: Date.now(),
        type: this.data.feedbackType,
        content: this.data.feedbackContent,
        images: this.data.images,
        status: 'pending',
        reply: '',
        createTime: this.formatDate(new Date())
      };
      
      const historyList = [newFeedback, ...this.data.historyList];
      
      this.setData({
        historyList,
        feedbackContent: '',
        images: [],
        currentTab: 1
      });
      
      wx.showToast({ title: '提交成功', icon: 'success' });
    }, 1000);
  },

  loadHistory() {
    this.setData({ loading: true });
    
    setTimeout(() => {
      const historyList = [
        {
          id: 1,
          type: 'suggestion',
          content: '希望增加成绩预警功能，当成绩下滑时能及时提醒',
          images: [],
          status: 'replied',
          reply: '感谢您的建议，我们将在下一版本中考虑添加此功能',
          createTime: '2024-12-01 10:30'
        },
        {
          id: 2,
          type: 'bug',
          content: '社团报名页面有时候会加载失败',
          images: [],
          status: 'processing',
          reply: '',
          createTime: '2024-11-28 15:20'
        }
      ];
      
      this.setData({
        historyList,
        loading: false
      });
    }, 500);
  },

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  },

  getTypeText(type) {
    const map = {
      suggestion: '建议',
      bug: '问题反馈',
      complaint: '投诉',
      other: '其他'
    };
    return map[type] || '其他';
  },

  getTypeClass(type) {
    const map = {
      suggestion: 'tag-primary',
      bug: 'tag-danger',
      complaint: 'tag-warning',
      other: 'tag-gray'
    };
    return map[type] || 'tag-gray';
  },

  getStatusText(status) {
    const map = {
      pending: '待处理',
      processing: '处理中',
      replied: '已回复'
    };
    return map[status] || '待处理';
  },

  getStatusClass(status) {
    const map = {
      pending: 'tag-warning',
      processing: 'tag-primary',
      replied: 'tag-success'
    };
    return map[status] || 'tag-warning';
  }
});
