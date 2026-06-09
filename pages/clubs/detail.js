const app = getApp();
const { formatDateTime } = require('../../utils/util.js');

Page({
  data: {
    clubId: null,
    clubInfo: null,
    tabs: ['社团介绍', '成员列表', '活动记录'],
    currentTab: 0,
    members: [],
    activities: [],
    isJoined: false,
    isApplied: false,
    loading: true,
  },

  onLoad(options) {
    this.setData({ clubId: options.clubId });
    this.loadClubDetail();
  },

  onPullDownRefresh() {
    this.loadClubDetail();
    wx.stopPullDownRefresh();
  },

  loadClubDetail() {
    this.setData({ loading: true });

    const mockClubInfo = {
      id: 1,
      name: '程序设计协会',
      category: '学术类',
      leader: '王五老师',
      teacher: '张教授',
      createTime: '2021-09-01',
      description: '程序设计协会成立于2021年，是一个面向全校学生的学术性社团组织。协会致力于为编程爱好者提供一个学习交流的平台，通过组织各类技术分享、编程竞赛、项目实践等活动，提升会员的编程技能和综合素质。\n\n我们的宗旨是"交流技术，共同进步"，希望通过社团活动，让更多同学感受到编程的乐趣，掌握实用的编程技能。',
      memberCount: 128,
      activityCount: 24,
      requirements: ['对编程有浓厚兴趣', '具备基本的编程基础', '积极参与社团活动'],
    };

    const mockMembers = [
      { id: 1, name: '王五', role: '指导老师' },
      { id: 2, name: '李明', role: '社长' },
      { id: 3, name: '张华', role: '副社长' },
      { id: 4, name: '陈伟', role: '技术部长' },
    ];

    const mockActivities = [
      { id: 1, title: 'ACM程序设计竞赛', time: '2024-12-20 09:00', location: '实验楼机房', signInCount: 45, status: 'upcoming' },
      { id: 2, title: '算法训练营第三期', time: '2024-12-15 14:00', location: '教学楼101', signInCount: 60, status: 'finished' },
      { id: 3, title: '技术分享会：前端开发入门', time: '2024-12-10 19:00', location: '图书馆报告厅', signInCount: 80, status: 'finished' },
    ];

    setTimeout(() => {
      this.setData({
        clubInfo: mockClubInfo,
        members: mockMembers,
        activities: mockActivities,
        isJoined: false,
        isApplied: false,
        loading: false,
      });
    }, 500);
  },

  onTabChange(e) {
    this.setData({ currentTab: e.detail.index });
  },

  goApply() {
    if (this.data.isJoined) {
      wx.showToast({ title: '您已是社团成员', icon: 'none' });
      return;
    }
    if (this.data.isApplied) {
      wx.showToast({ title: '您已提交申请，请等待审核', icon: 'none' });
      return;
    }
    wx.navigateTo({ url: `/pages/clubs/apply?clubId=${this.data.clubId}` });
  },

  goActivityDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/activities/detail?activityId=${id}` });
  },

  onShareAppMessage() {
    const { clubInfo } = this.data;
    return {
      title: `${clubInfo.name} - 智慧校园社团`,
      path: `/pages/clubs/detail?clubId=${this.data.clubId}`,
    };
  },
});