const { getUserInfo } = require('../../utils/util.js');
const { mockAwards } = require('../../utils/mockData.js');

Page({
  data: {
    userInfo: null,
    semesters: ['2024-2', '2024-1', '2023-2', '2023-1'],
    currentSemester: '2024-1',
    awardsList: [],
    totalScore: 0,
    approvedCount: 0,
    pendingCount: 0,
  },

  onLoad() {
    this.setData({ userInfo: getUserInfo() });
    this.loadAwards();
  },

  onSemesterChange(e) {
    const index = e.detail.value;
    this.setData({ currentSemester: this.data.semesters[index] });
    this.loadAwards();
  },

  loadAwards() {
    const userInfo = this.data.userInfo;
    const awardsList = mockAwards.filter(a => 
      a.studentId === userInfo.studentId && a.semester === this.data.currentSemester
    ).sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
    
    let totalScore = 0;
    let approvedCount = 0;
    let pendingCount = 0;
    
    awardsList.forEach(a => {
      if (a.status === 'approved') {
        totalScore += a.score;
        approvedCount++;
      } else if (a.status === 'pending') {
        pendingCount++;
      }
    });
    
    this.setData({
      awardsList,
      totalScore,
      approvedCount,
      pendingCount
    });
  },

  getStatusText(status) {
    const statusMap = {
      approved: '已通过',
      pending: '审核中',
      rejected: '已驳回'
    };
    return statusMap[status] || status;
  },

  getStatusClass(status) {
    return status;
  },

  onShareAppMessage() {
    return {
      title: '我的综测加分',
      path: '/pages/awards/index',
    };
  },
});
