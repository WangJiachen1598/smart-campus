const app = getApp();

Page({
  data: {
    userInfo: null,
    semesters: ['2024-2', '2024-1', '2023-2', '2023-1'],
    currentSemester: '2024-2',
    grades: [],
    averageScore: 0,
    gpa: 0,
    totalCredit: 0,
    passCount: 0,
  },

  onLoad() {
    this.setData({ userInfo: app.globalData.userInfo });
    this.loadGrades();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
  },

  onSemesterChange(e) {
    const index = e.detail.value;
    this.setData({ currentSemester: this.data.semesters[index] });
    this.loadGrades();
  },

  loadGrades() {
    const grades = [
      { id: 1, course: '高等数学', credit: 4, score: 85, type: '必修' },
      { id: 2, course: '大学英语', credit: 3, score: 78, type: '必修' },
      { id: 3, course: '数据结构', credit: 4, score: 92, type: '必修' },
      { id: 4, course: '线性代数', credit: 3, score: 88, type: '必修' },
    ];
    
    let totalScore = 0;
    let totalCredit = 0;
    let passCount = 0;
    
    grades.forEach(g => {
      totalScore += g.score * g.credit;
      totalCredit += g.credit;
      if (g.score >= 60) passCount++;
    });
    
    const averageScore = totalCredit > 0 ? (totalScore / totalCredit).toFixed(2) : 0;
    const gpa = this.calculateGPA(averageScore);
    
    this.setData({
      grades,
      averageScore,
      gpa,
      totalCredit,
      passCount
    });
  },

  calculateGPA(score) {
    if (score >= 90) return 4.0;
    if (score >= 85) return 3.7;
    if (score >= 80) return 3.3;
    if (score >= 75) return 3.0;
    if (score >= 70) return 2.7;
    if (score >= 65) return 2.3;
    if (score >= 60) return 2.0;
    return 0;
  },

  getScoreClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 60) return 'pass';
    return 'fail';
  },
});
