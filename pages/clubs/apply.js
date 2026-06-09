const app = getApp();

Page({
  data: {
    clubId: null,
    clubName: '',
    formData: {
      name: '',
      studentId: '',
      phone: '',
      reason: ''
    },
    loading: false
  },

  onLoad(options) {
    this.setData({ 
      clubId: options.clubId, 
      clubName: options.name || '社团' 
    });
    wx.setNavigationBarTitle({ title: `报名${this.data.clubName}` });
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`formData.${field}`]: e.detail.value });
  },

  async onSubmit() {
    const { name, studentId, phone, reason } = this.data.formData;

    if (!name || !studentId || !phone || !reason) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }

    if (studentId.length !== 10) {
      wx.showToast({ title: '请输入正确的10位学号', icon: 'none' });
      return;
    }

    this.setData({ loading: true });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      wx.showToast({ title: '报名成功，请等待审核', icon: 'success' });
      setTimeout(() => wx.navigateBack(), 1500);
    } catch (err) {
      wx.showToast({ title: '报名失败，请重试', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  }
});
