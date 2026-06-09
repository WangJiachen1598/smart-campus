const app = getApp();

function request(options) {
  return new Promise((resolve, reject) => {
    wx.showToast({ title: '功能开发中', icon: 'none' });
    reject(new Error('功能开发中'));
  });
}

function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

function formatTime(date) {
  return formatDate(date, 'HH:mm');
}

function formatDateTime(date) {
  return formatDate(date, 'YYYY-MM-DD HH:mm');
}

function getSemesters() {
  const currentYear = new Date().getFullYear();
  const semesters = [];
  for (let year = currentYear; year >= currentYear - 3; year--) {
    semesters.push({ label: `${year}学年第一学期`, value: `${year}-1` });
    semesters.push({ label: `${year}学年第二学期`, value: `${year}-2` });
  }
  return semesters;
}

function getCurrentSemester() {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  if (month >= 9 || month <= 2) {
    return month >= 9 ? `${year}-1` : `${year - 1}-1`;
  } else {
    return `${year}-2`;
  }
}

function getWeekDay(date) {
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekDays[new Date(date).getDay()];
}

function getAttendanceStatus(status) {
  const statusMap = {
    'normal': { label: '正常', color: '#4caf50' },
    'late': { label: '迟到', color: '#ff9800' },
    'absent': { label: '缺勤', color: '#f44336' },
    'leave': { label: '请假', color: '#2196f3' }
  };
  return statusMap[status] || { label: '未知', color: '#999' };
}

function getAwardStatus(status) {
  const statusMap = {
    'pending': { label: '待审核', color: '#ff9800' },
    'approved': { label: '已通过', color: '#4caf50' },
    'rejected': { label: '已驳回', color: '#f44336' }
  };
  return statusMap[status] || { label: '未知', color: '#999' };
}

function getActivityStatus(status) {
  const statusMap = {
    'upcoming': { label: '报名中', color: '#2196f3' },
    'ongoing': { label: '进行中', color: '#4caf50' },
    'finished': { label: '已结束', color: '#999' }
  };
  return statusMap[status] || { label: '未知', color: '#999' };
}

function validatePhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone);
}

function validateStudentId(studentId) {
  return /^\d{10}$/.test(studentId);
}

function showLoading(title = '加载中') {
  wx.showLoading({ title, mask: true });
}

function hideLoading() {
  wx.hideLoading();
}

function showToast(title, icon = 'none') {
  wx.showToast({ title, icon, duration: 2000 });
}

function showModal(title, content, confirmText = '确定', cancelText = '取消') {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      confirmText,
      cancelText,
      success: (res) => {
        resolve(res.confirm);
      }
    });
  });
}

function navigateTo(url, params = {}) {
  const query = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  wx.navigateTo({
    url: query ? `${url}?${query}` : url
  });
}

function redirectTo(url) {
  wx.redirectTo({ url });
}

function switchTab(url) {
  wx.switchTab({ url });
}

function goBack(delta = 1) {
  wx.navigateBack({ delta });
}

function getUserInfo() {
  return app.globalData.userInfo;
}

function isTeacher() {
  const userInfo = getUserInfo();
  return userInfo && (userInfo.role === 'teacher' || userInfo.role === 'admin');
}

function isAdmin() {
  const userInfo = getUserInfo();
  return userInfo && userInfo.role === 'admin';
}

function getRoleLabel(role) {
  const roleMap = {
    'student': '学生',
    'teacher': '教师',
    'admin': '管理员'
  };
  return roleMap[role] || '未知';
}

function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function throttle(fn, delay = 300) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last > delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}

module.exports = {
  request,
  formatDate,
  formatTime,
  formatDateTime,
  getSemesters,
  getCurrentSemester,
  getWeekDay,
  getAttendanceStatus,
  getAwardStatus,
  getActivityStatus,
  validatePhone,
  validateStudentId,
  showLoading,
  hideLoading,
  showToast,
  showModal,
  navigateTo,
  redirectTo,
  switchTab,
  goBack,
  getUserInfo,
  isTeacher,
  isAdmin,
  getRoleLabel,
  debounce,
  throttle
};