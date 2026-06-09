const app = getApp();

Page({
  data: {
    activityId: null,
    title: '',
    clubIndex: -1,
    clubs: [
      { id: 1, name: '程序设计协会' },
      { id: 2, name: '篮球社' },
      { id: 3, name: '志愿服务队' },
    ],
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    description: '',
    coverImage: '',
    activityImages: [],
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        activityId: options.id,
        title: '示例活动',
        clubIndex: 0,
        location: '学校体育馆',
        startDate: '2024-12-25',
        startTime: '09:00',
        endDate: '2024-12-25',
        endTime: '17:00',
        description: '这是一个示例活动的描述',
      });
    }
  },

  onTitleChange(e) {
    this.setData({ title: e.detail.value });
  },

  onClubChange(e) {
    this.setData({ clubIndex: e.detail.value });
  },

  onLocationChange(e) {
    this.setData({ location: e.detail.value });
  },

  onStartDateChange(e) {
    this.setData({ startDate: e.detail.value });
  },

  onStartTimeChange(e) {
    this.setData({ startTime: e.detail.value });
  },

  onEndDateChange(e) {
    this.setData({ endDate: e.detail.value });
  },

  onEndTimeChange(e) {
    this.setData({ endTime: e.detail.value });
  },

  onDescriptionChange(e) {
    this.setData({ description: e.detail.value });
  },

  chooseCoverImage() {
    const that = this;
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      success(res) {
        const sourceType = res.tapIndex === 0 ? ['album'] : ['camera'];
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed', 'original'],
          sourceType: sourceType,
          success(res) {
            that.setData({
              coverImage: res.tempFilePaths[0]
            });
          }
        });
      }
    });
  },

  previewCoverImage() {
    wx.previewImage({
      urls: [this.data.coverImage],
      current: this.data.coverImage
    });
  },

  deleteCoverImage() {
    wx.showModal({
      title: '删除封面',
      content: '确定要删除活动封面吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            coverImage: ''
          });
        }
      }
    });
  },

  chooseActivityImages() {
    const that = this;
    const maxCount = 9 - this.data.activityImages.length;
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      success(res) {
        const sourceType = res.tapIndex === 0 ? ['album'] : ['camera'];
        wx.chooseImage({
          count: maxCount,
          sizeType: ['compressed', 'original'],
          sourceType: sourceType,
          success(res) {
            const newImages = [...that.data.activityImages, ...res.tempFilePaths];
            that.setData({
              activityImages: newImages
            });
          }
        });
      }
    });
  },

  deleteActivityImage(e) {
    const index = e.currentTarget.dataset.index;
    const newImages = [...this.data.activityImages];
    newImages.splice(index, 1);
    this.setData({
      activityImages: newImages
    });
  },

  saveActivity() {
    if (!this.data.title) {
      wx.showToast({ title: '请输入活动名称', icon: 'none' });
      return;
    }
    if (this.data.clubIndex < 0) {
      wx.showToast({ title: '请选择所属社团', icon: 'none' });
      return;
    }
    if (!this.data.location) {
      wx.showToast({ title: '请输入活动地点', icon: 'none' });
      return;
    }
    wx.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  },
});