const app = getApp();

Page({
  data: {
    form: {
      name: '',
      studentId: '',
      className: '',
      phone: '',
      gender: 'male',
      signature: '',
      avatar: '',
      role: 'student'
    },
    saving: false
  },

  onLoad() {
    const userInfo = app.globalData.userInfo || {};
    this.setData({
      form: {
        name: userInfo.name || '',
        studentId: userInfo.studentId || '',
        className: userInfo.className || '',
        phone: userInfo.phone || '',
        gender: userInfo.gender || 'male',
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || '',
        role: userInfo.role || 'student'
      }
    });
  },

  onNameInput(e) {
    this.setData({ 'form.name': e.detail.value });
  },

  onStudentIdInput(e) {
    this.setData({ 'form.studentId': e.detail.value });
  },

  onClassNameInput(e) {
    this.setData({ 'form.className': e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ 'form.phone': e.detail.value });
  },

  onSignatureInput(e) {
    this.setData({ 'form.signature': e.detail.value });
  },

  selectGender(e) {
    this.setData({ 'form.gender': e.currentTarget.dataset.gender });
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
            const tempFilePath = res.tempFilePaths[0];
            this.setData({ 'form.avatar': tempFilePath });
          }
        });
      }
    });
  },

  saveProfile() {
    const { form } = this.data;

    if (!form.name.trim()) {
      wx.showToast({ title: '请输入姓名', icon: 'none' });
      return;
    }

    if (form.role === 'student' && !form.studentId.trim()) {
      wx.showToast({ title: '请输入学号', icon: 'none' });
      return;
    }

    if (form.phone && form.phone.length !== 11) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }

    this.setData({ saving: true });

    setTimeout(() => {
      const userInfo = {
        ...app.globalData.userInfo,
        ...form
      };

      app.login(userInfo);

      this.setData({ saving: false });
      wx.showToast({ title: '保存成功', icon: 'success' });
      
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 800);
  },

  cancelEdit() {
    wx.navigateBack();
  }
});
