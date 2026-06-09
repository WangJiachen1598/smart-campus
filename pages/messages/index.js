const app = getApp();

Page({
  data: {
    userInfo: null,
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'club', label: '社团通知' },
      { key: 'study', label: '学习提醒' },
      { key: 'approval', label: '审批结果' }
    ],
    currentTab: 'all',
    messageList: [],
    unreadCount: 0,
    loading: false
  },

  onLoad() {
    this.setData({ userInfo: app.globalData.userInfo });
    this.loadMessages();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const userInfo = app.globalData && app.globalData.userInfo;
      const isTeacher = userInfo && (userInfo.role === 'teacher' || userInfo.role === 'admin');
      this.getTabBar().setData({ selected: isTeacher ? 4 : 3 });
    }
  },

  loadMessages() {
    const allMessages = [
      { id: 1, type: 'club', title: '程序设计协会纳新通知', content: '程序设计协会现在开始纳新，欢迎大家报名参加！', isRead: false, createTime: '2024-12-15 10:00' },
      { id: 2, type: 'study', title: '成绩发布通知', content: '您的2024-1学期成绩已发布，请及时查看', isRead: false, createTime: '2024-12-10 14:30' },
      { id: 3, type: 'approval', title: '社团申请已通过', content: '恭喜您已成功加入程序设计协会', isRead: true, createTime: '2024-12-05 09:00' },
    ];
    
    let filteredMessages = allMessages;
    if (this.data.currentTab !== 'all') {
      filteredMessages = allMessages.filter(m => m.type === this.data.currentTab);
    }
    
    const unreadCount = allMessages.filter(m => !m.isRead).length;
    
    this.setData({
      messageList: filteredMessages,
      unreadCount,
      loading: false
    });
  },

  onTabChange(e) {
    const key = e.currentTarget.dataset.key;
    this.setData({ currentTab: key });
    this.loadMessages();
  },

  goDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/messages/detail?id=${id}` });
  },

  markAllRead() {
    wx.showModal({
      title: '提示',
      content: '确定标记所有消息为已读吗？',
      success: (res) => {
        if (res.confirm) {
          const messageList = this.data.messageList.map(m => ({ ...m, isRead: true }));
          this.setData({ messageList, unreadCount: 0 });
          wx.showToast({ title: '已全部标记为已读', icon: 'success' });
        }
      }
    });
  },

  getTypeIcon(type) {
    return '';
  },

  getTypeText(type) {
    const textMap = {
      club: '社团通知',
      study: '学习提醒',
      approval: '审批结果'
    };
    return textMap[type] || '消息';
  },

  getTypeClass(type) {
    return '';
  }
});
