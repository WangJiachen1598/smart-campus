Page({
  data: {
    categories: [
      { id: 'all', name: '全部' },
      { id: 'academic', name: '学术类' },
      { id: 'sports', name: '文体类' },
      { id: 'volunteer', name: '志愿服务类' },
      { id: 'entrepreneur', name: '创业实践类' },
    ],
    currentCategory: 'all',
    searchKeyword: '',
    clubs: [],
    filteredClubs: [],
    loading: false,
  },

  onLoad(options) {
    if (options.category) {
      this.setData({ currentCategory: options.category });
    }
    this.loadClubs();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
  },

  loadClubs() {
    const mockClubs = [
      { id: 1, name: '程序设计协会', category: 'academic', categoryName: '学术类', description: '聚集编程爱好者，交流技术，共同进步', memberCount: 128, activityCount: 24, hot: 98 },
      { id: 2, name: '篮球社', category: 'sports', categoryName: '文体类', description: '强身健体，以球会友', memberCount: 86, activityCount: 18, hot: 85 },
      { id: 3, name: '志愿服务队', category: 'volunteer', categoryName: '志愿服务类', description: '奉献爱心，传递温暖', memberCount: 156, activityCount: 32, hot: 92 },
      { id: 4, name: '创新创业协会', category: 'entrepreneur', categoryName: '创业实践类', description: '激发创新思维，培养创业能力', memberCount: 72, activityCount: 12, hot: 78 },
    ];

    this.setData({
      clubs: mockClubs,
      filteredClubs: this.filterClubs(mockClubs),
    });
  },

  filterClubs(clubs) {
    const { currentCategory, searchKeyword } = this.data;
    return clubs.filter(club => {
      const matchCategory = currentCategory === 'all' || club.category === currentCategory;
      const matchKeyword = !searchKeyword || club.name.includes(searchKeyword) || club.description.includes(searchKeyword);
      return matchCategory && matchKeyword;
    });
  },

  onSelectCategory(e) {
    const category = e.currentTarget.dataset.id;
    this.setData({ currentCategory: category });
    this.setData({ filteredClubs: this.filterClubs(this.data.clubs) });
  },

  onSearch(e) {
    this.setData({ searchKeyword: e.detail.value });
    this.setData({ filteredClubs: this.filterClubs(this.data.clubs) });
  },

  onClearSearch() {
    this.setData({ searchKeyword: '' });
    this.setData({ filteredClubs: this.filterClubs(this.data.clubs) });
  },

  goClubDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/clubs/detail?clubId=${id}` });
  },

  goApply(e) {
    const { id, name } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/clubs/apply?clubId=${id}&name=${name}` });
  },
});
