const app = getApp();

Page({
  data: {
    clubId: null,
    club: null,
    name: '',
    category: '学术类',
    description: '',
    categories: ['学术类', '文体类', '志愿服务类', '创业实践类', '其他'],
    coverImage: '',
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        clubId: options.id,
        name: '示例社团',
        category: '学术类',
        description: '这是一个示例社团的描述',
      });
    }
  },

  onNameChange(e) {
    this.setData({ name: e.detail.value });
  },

  onCategoryChange(e) {
    const index = e.detail.value;
    this.setData({ category: this.data.categories[index] });
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
      content: '确定要删除社团封面吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            coverImage: ''
          });
        }
      }
    });
  },

  saveClub() {
    if (!this.data.name) {
      wx.showToast({ title: '请输入社团名称', icon: 'none' });
      return;
    }
    wx.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  },
});
