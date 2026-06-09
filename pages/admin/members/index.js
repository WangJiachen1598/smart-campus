Page({
  data: {
    currentList: [],
    pendingCount: 0,
    currentTab: 'pending',
    emptyText: '暂无待审批成员',
    pendingList: [],
    approvedList: [],
    rejectedList: [],
  },

  onLoad() {
    this.loadMockData();
  },

  loadMockData() {
    const pendingList = [
      { id: 1, studentId: '2021001001', name: '张三', clubId: 1, clubName: '程序设计协会', applyTime: '2024-12-18', avatar: '/assets/images/avatar1.jpg' },
      { id: 2, studentId: '2021001002', name: '李四', clubId: 1, clubName: '程序设计协会', applyTime: '2024-12-17', avatar: '/assets/images/avatar2.jpg' },
      { id: 3, studentId: '2021001003', name: '王五', clubId: 2, clubName: '篮球社', applyTime: '2024-12-16', avatar: '/assets/images/avatar3.jpg' },
    ];

    const approvedList = [
      { id: 5, studentId: '2021001005', name: '孙七', clubId: 1, clubName: '程序设计协会', approveTime: '2024-12-10', avatar: '/assets/images/avatar1.jpg' },
      { id: 6, studentId: '2021001006', name: '周八', clubId: 2, clubName: '篮球社', approveTime: '2024-12-09', avatar: '/assets/images/avatar2.jpg' },
    ];

    const rejectedList = [
      { id: 7, studentId: '2021001007', name: '吴九', clubId: 1, clubName: '程序设计协会', rejectTime: '2024-12-08', reason: '名额已满', avatar: '/assets/images/default-avatar.png' },
    ];

    const processList = (list, timeField, timeLabel) => {
      return list.map(item => ({
        ...item,
        timeLabel,
        timeValue: item[timeField],
      }));
    };

    const processedPending = processList(pendingList, 'applyTime', '申请时间');
    const processedApproved = processList(approvedList, 'approveTime', '通过时间');
    const processedRejected = processList(rejectedList, 'rejectTime', '拒绝时间');

    this.setData({
      pendingList: processedPending,
      approvedList: processedApproved,
      rejectedList: processedRejected,
      currentList: processedPending,
      pendingCount: pendingList.length,
    });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    const tabConfig = {
      pending: { list: this.data.pendingList, emptyText: '暂无待审批成员' },
      approved: { list: this.data.approvedList, emptyText: '暂无已通过成员' },
      rejected: { list: this.data.rejectedList, emptyText: '暂无已拒绝成员' },
    };

    this.setData({
      currentTab: tab,
      currentList: tabConfig[tab].list,
      emptyText: tabConfig[tab].emptyText,
    });
  },

  approve(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认通过',
      content: '确定要通过该成员的申请吗？',
      success: (res) => {
        if (res.confirm) {
          const pendingList = this.data.pendingList.filter(item => item.id !== id);
          this.setData({ 
            pendingList,
            currentList: pendingList,
            pendingCount: pendingList.length,
          });
          wx.showToast({ title: '已通过', icon: 'success' });
        }
      }
    });
  },

  reject(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认拒绝',
      content: '确定要拒绝该成员的申请吗？',
      success: (res) => {
        if (res.confirm) {
          const pendingList = this.data.pendingList.filter(item => item.id !== id);
          this.setData({ 
            pendingList,
            currentList: pendingList,
            pendingCount: pendingList.length,
          });
          wx.showToast({ title: '已拒绝', icon: 'success' });
        }
      }
    });
  },

  viewDetail(e) {
    wx.showToast({ title: '查看详情', icon: 'none' });
  },
});
