const app = getApp();

Page({
  data: {
    id: null,
    isEdit: false,
    formData: {
      name: '',
      studentId: '',
      gender: 'male',
      className: '',
      phone: '',
      email: '',
      enrollDate: '',
      status: 'active',
      remark: '',
      avatar: ''
    },
    saving: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id, isEdit: true });
      this.loadStudentData(options.id);
    }
  },

  loadStudentData(id) {
    const mockStudent = {
      id: id,
      name: '张三',
      studentId: '2024001',
      gender: 'male',
      className: '计算机2101班',
      phone: '13800138001',
      email: 'zhangsan@example.com',
      enrollDate: '2021-09-01',
      status: 'active',
      remark: '',
      avatar: ''
    };

    this.setData({ formData: mockStudent });
  },

  onNameInput(e) {
    this.setData({ 'formData.name': e.detail.value });
  },

  onStudentIdInput(e) {
    this.setData({ 'formData.studentId': e.detail.value });
  },

  onClassNameInput(e) {
    this.setData({ 'formData.className': e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ 'formData.phone': e.detail.value });
  },

  onEmailInput(e) {
    this.setData({ 'formData.email': e.detail.value });
  },

  onRemarkInput(e) {
    this.setData({ 'formData.remark': e.detail.value });
  },

  selectGender(e) {
    this.setData({ 'formData.gender': e.currentTarget.dataset.gender });
  },

  selectStatus(e) {
    this.setData({ 'formData.status': e.currentTarget.dataset.status });
  },

  onEnrollDateChange(e) {
    this.setData({ 'formData.enrollDate': e.detail.value });
  },

  chooseAvatar() {
    wx.showActionSheet({
      itemList: ['选择照片', '拍照'],
      success: (res) => {
        const sourceType = res.tapIndex === 0 ? ['album'] : ['camera'];
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: sourceType,
          success: (res) => {
            this.setData({ 'formData.avatar': res.tempFilePaths[0] });
          }
        });
      }
    });
  },

  validateForm() {
    const { formData } = this.data;

    if (!formData.name.trim()) {
      wx.showToast({ title: '请输入学生姓名', icon: 'none' });
      return false;
    }

    if (!formData.studentId.trim()) {
      wx.showToast({ title: '请输入学号', icon: 'none' });
      return false;
    }

    if (formData.phone && formData.phone.length !== 11) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return false;
    }

    return true;
  },

  onSave() {
    if (!this.validateForm()) {
      return;
    }

    this.setData({ saving: true });

    setTimeout(() => {
      this.setData({ saving: false });
      wx.showToast({ title: this.data.isEdit ? '修改成功' : '添加成功', icon: 'success' });

      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 800);
  },

  onCancel() {
    wx.navigateBack();
  }
});
