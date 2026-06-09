const mockUsers = [
  { id: 1, studentId: '2021001001', name: '张三', role: 'student', classId: 1, className: '计算机2101班', phone: '13800138001', avatar: '/assets/images/avatar1.jpg' },
  { id: 2, studentId: '2021001002', name: '李四', role: 'student', classId: 1, className: '计算机2101班', phone: '13800138002', avatar: '/assets/images/avatar2.jpg' },
  { id: 3, studentId: '2021001003', name: '王五', role: 'teacher', classId: null, className: null, phone: '13800138003', avatar: '/assets/images/avatar3.jpg', subjects: ['数据结构', '算法设计'] },
  { id: 4, studentId: 'admin001', name: '管理员', role: 'admin', classId: null, className: null, phone: '13800138000', avatar: '/assets/images/avatar-admin.jpg' },
];

const mockClubs = [
  { id: 1, name: '程序设计协会', category: '学术类', cover: '/assets/images/club1.jpg', description: '聚集编程爱好者，交流技术，共同进步', leaderId: 3, leaderName: '王五', memberCount: 128, activityCount: 24, status: 'active', createTime: '2021-09-01' },
  { id: 2, name: '篮球社', category: '文体类', cover: '/assets/images/club2.jpg', description: '强身健体，以球会友', leaderId: 3, leaderName: '体育部', memberCount: 86, activityCount: 18, status: 'active', createTime: '2021-09-01' },
  { id: 3, name: '志愿服务队', category: '志愿服务类', cover: '/assets/images/club3.jpg', description: '奉献爱心，传递温暖', leaderId: 3, leaderName: '团委', memberCount: 156, activityCount: 32, status: 'active', createTime: '2021-09-01' },
  { id: 4, name: '创新创业协会', category: '创业实践类', cover: '/assets/images/club4.jpg', description: '激发创新思维，培养创业能力', leaderId: 3, leaderName: '就业办', memberCount: 72, activityCount: 12, status: 'active', createTime: '2022-03-01' },
];

const mockActivities = [
  { id: 1, clubId: 1, title: 'ACM程序设计竞赛', content: '面向全校的程序设计比赛', location: '实验楼机房', startTime: '2024-12-20 09:00', endTime: '2024-12-20 17:00', signInEnabled: true, signInCode: '123456', status: 'upcoming', signInCount: 45, participantCount: 50 },
  { id: 2, clubId: 2, title: '篮球友谊赛', content: '与其他学院的篮球比赛', location: '体育馆', startTime: '2024-12-18 15:00', endTime: '2024-12-18 17:00', signInEnabled: true, signInCode: '234567', status: 'ongoing', signInCount: 22, participantCount: 20 },
  { id: 3, clubId: 3, title: '社区义诊活动', content: '前往社区为老人测量血压', location: 'xx社区', startTime: '2024-12-15 08:00', endTime: '2024-12-15 12:00', signInEnabled: false, status: 'finished', signInCount: 30, participantCount: 30 },
];

const mockGrades = [
  { id: 1, studentId: '2021001001', semester: '2024-1', course: '高等数学', credit: 4, score: 85, type: '必修' },
  { id: 2, studentId: '2021001001', semester: '2024-1', course: '大学英语', credit: 3, score: 78, type: '必修' },
  { id: 3, studentId: '2021001001', semester: '2024-1', course: '数据结构', credit: 4, score: 92, type: '必修' },
  { id: 4, studentId: '2021001001', semester: '2024-1', course: '线性代数', credit: 3, score: 88, type: '必修' },
  { id: 5, studentId: '2021001001', semester: '2024-2', course: '概率论', credit: 3, score: 75, type: '必修' },
  { id: 6, studentId: '2021001001', semester: '2024-2', course: '算法设计', credit: 4, score: 90, type: '必修' },
];

const mockAttendance = [
  { id: 1, studentId: '2021001001', date: '2024-12-01', course: '数据结构', status: 'normal', week: 14 },
  { id: 2, studentId: '2021001001', date: '2024-12-03', course: '数据结构', status: 'normal', week: 14 },
  { id: 3, studentId: '2021001001', date: '2024-12-05', course: '高等数学', status: 'late', week: 14 },
  { id: 4, studentId: '2021001001', date: '2024-12-08', course: '数据结构', status: 'normal', week: 15 },
  { id: 5, studentId: '2021001001', date: '2024-12-10', course: '数据结构', status: 'absent', week: 15 },
  { id: 6, studentId: '2021001001', date: '2024-12-12', course: '大学英语', status: 'normal', week: 15 },
];

const mockAwards = [
  { id: 1, studentId: '2021001001', semester: '2024-1', project: '三好学生', score: 10, status: 'approved', remark: '综合成绩年级前10%', createTime: '2024-12-01' },
  { id: 2, studentId: '2021001001', semester: '2024-1', project: '程序设计竞赛一等奖', score: 15, status: 'approved', remark: '校级一等奖', createTime: '2024-11-15' },
  { id: 3, studentId: '2021001001', semester: '2024-1', project: '志愿服务时长', score: 5, status: 'approved', remark: '本学期累计30小时', createTime: '2024-12-10' },
  { id: 4, studentId: '2021001001', semester: '2024-2', project: '互联网+创新创业大赛', score: 8, status: 'pending', remark: '院级优秀奖', createTime: '2024-12-18' },
];

const mockMessages = [
  { id: 1, type: 'club', title: '程序设计协会纳新通知', content: '程序设计协会现在开始纳新，欢迎大家报名参加！', isRead: false, createTime: '2024-12-15 10:00' },
  { id: 2, type: 'grade', title: '成绩发布通知', content: '您的2024-1学期成绩已发布，请及时查看', isRead: false, createTime: '2024-12-10 14:30' },
  { id: 3, type: 'approval', title: '社团申请已通过', content: '恭喜您已成功加入程序设计协会', isRead: true, createTime: '2024-12-05 09:00' },
];

const mockFeedback = [
  { id: 1, userId: 1, content: '希望增加成绩预警功能，当成绩下滑时能及时提醒', reply: '感谢您的建议，我们将在下一版本中考虑添加此功能', status: 'replied', createTime: '2024-12-01' },
];

const mockSignIns = [
  { id: 1, activityId: 1, studentId: '2021001001', signInTime: '2024-12-20 08:55', method: 'qrcode' },
  { id: 2, activityId: 2, studentId: '2021001001', signInTime: '2024-12-18 14:50', method: 'qrcode' },
];

const mockDashboardData = {
  overview: {
    studentCount: 1256,
    clubCount: 24,
    activityCount: 156,
    pendingApproval: 18,
  },
  attendanceRate: [
    { className: '计算机2101', rate: 92 },
    { className: '计算机2102', rate: 88 },
    { className: '软件工程2101', rate: 95 },
    { className: '网络工程2101', rate: 85 },
  ],
  gradeDistribution: [
    { label: '优秀(90+)', count: 320, percent: 25.5 },
    { label: '良好(80-89)', count: 456, percent: 36.3 },
    { label: '及格(60-79)', count: 380, percent: 30.2 },
    { label: '不及格(<60)', count: 100, percent: 8.0 },
  ],
  warnings: [
    { studentId: '2021001015', name: '赵六', className: '计算机2101', type: 'attendance', description: '本月缺勤超过3次', level: 'warning' },
    { studentId: '2021001020', name: '钱七', className: '计算机2102', type: 'grade', description: '不及格科目超过3门', level: 'danger' },
  ],
};

module.exports = {
  mockUsers,
  mockClubs,
  mockActivities,
  mockGrades,
  mockAttendance,
  mockAwards,
  mockMessages,
  mockFeedback,
  mockSignIns,
  mockDashboardData,
};