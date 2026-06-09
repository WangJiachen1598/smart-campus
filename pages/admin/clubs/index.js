const app = getApp();

Page({
  data: {
    currentFilter: 'all',
    clubList: [
      { id: 1, name: '程序设计协会', category: '学术类', memberCount: 128, cover: '', status: 'active', leader: '张三', createTime: '2023-09-01' },
      { id: 2, name: '篮球社', category: '文体类', memberCount: 86, cover: '', status: 'active', leader: '李四', createTime: '2023-10-15' },
      { id: 3, name: '志愿服务队', category: '公益类', memberCount: 156, cover: '', status: 'inactive', leader: '王五', createTime: '2022-06-20' },
      { id: 4, name: '音乐社', category: '文体类', memberCount: 72, cover: '', status: 'active', leader: '赵六', createTime: '2024-01-10' },
    ],
  },

  onLoad() {
  },

  switchFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({ currentFilter: filter });
  },

  goEdit(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/admin/clubs/edit?id=${id}` });
  },

  goAdd() {
    wx.navigateTo({ url: '/pages/admin/clubs/edit' });
  },

  viewMembers(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: '成员管理开发中', icon: 'none' });
  },

  toggleStatus(e) {
    const id = e.currentTarget.dataset.id;
    const club = this.data.clubList.find(c => c.id === id);

    wx.showModal({
      title: club.status === 'active' ? '确认下架' : '确认上架',
      content: club.status === 'active' ? '确定要下架这个社团吗？' : '确定要上架这个社团吗？',
      success: (res) => {
        if (res.confirm) {
          const newList = this.data.clubList.map(c => {
            if (c.id === id) {
              return { ...c, status: c.status === 'active' ? 'inactive' : 'active' };
            }
            return c;
          });
          this.setData({ clubList: newList });
          wx.showToast({
            title: club.status === 'active' ? '已下架' : '已上架',
            icon: 'success'
          });
        }
      }
    });
  },
});
