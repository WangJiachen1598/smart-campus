const { request } = require('./util.js');

const API = {
  users: {
    login: (data) => request({ url: '/api/users/login', method: 'POST', data }),
    logout: () => request({ url: '/api/users/logout', method: 'POST' }),
    getInfo: () => request({ url: '/api/users/info' }),
    updateInfo: (data) => request({ url: '/api/users/info', method: 'PUT', data }),
    getList: (params) => request({ url: '/api/users/list', data: params }),
  },
  clubs: {
    getList: (params) => request({ url: '/api/clubs/list', data: params }),
    getDetail: (id) => request({ url: `/api/clubs/${id}` }),
    create: (data) => request({ url: '/api/clubs', method: 'POST', data }),
    update: (id, data) => request({ url: `/api/clubs/${id}`, method: 'PUT', data }),
    delete: (id) => request({ url: `/api/clubs/${id}`, method: 'DELETE' }),
    getCategories: () => request({ url: '/api/clubs/categories' }),
  },
  members: {
    apply: (data) => request({ url: '/api/members/apply', method: 'POST', data }),
    getMyClubs: () => request({ url: '/api/members/my-clubs' }),
    getList: (params) => request({ url: '/api/members/list', data: params }),
    approve: (id, status) => request({ url: `/api/members/${id}/approve`, method: 'POST', data: { status } }),
    remove: (id) => request({ url: `/api/members/${id}`, method: 'DELETE' }),
  },
  activities: {
    getList: (params) => request({ url: '/api/activities/list', data: params }),
    getDetail: (id) => request({ url: `/api/activities/${id}` }),
    create: (data) => request({ url: '/api/activities', method: 'POST', data }),
    update: (id, data) => request({ url: `/api/activities/${id}`, method: 'PUT', data }),
    delete: (id) => request({ url: `/api/activities/${id}`, method: 'DELETE' }),
    signIn: (data) => request({ url: '/api/activities/sign-in', method: 'POST', data }),
    getSignInList: (activityId) => request({ url: `/api/activities/${activityId}/signins` }),
  },
  grades: {
    getList: (params) => request({ url: '/api/grades/list', data: params }),
    create: (data) => request({ url: '/api/grades', method: 'POST', data }),
    batchImport: (data) => request({ url: '/api/grades/import', method: 'POST', data }),
    export: (params) => request({ url: '/api/grades/export', data: params }),
  },
  attendance: {
    getList: (params) => request({ url: '/api/attendance/list', data: params }),
    create: (data) => request({ url: '/api/attendance', method: 'POST', data }),
    batchImport: (data) => request({ url: '/api/attendance/import', method: 'POST', data }),
    export: (params) => request({ url: '/api/attendance/export', data: params }),
    getStats: (params) => request({ url: '/api/attendance/stats', data: params }),
  },
  awards: {
    getList: (params) => request({ url: '/api/awards/list', data: params }),
    create: (data) => request({ url: '/api/awards', method: 'POST', data }),
    approve: (id, status) => request({ url: `/api/awards/${id}/approve`, method: 'POST', data: { status } }),
    batchImport: (data) => request({ url: '/api/awards/import', method: 'POST', data }),
    export: (params) => request({ url: '/api/awards/export', data: params }),
  },
  messages: {
    getList: (params) => request({ url: '/api/messages/list', data: params }),
    getUnreadCount: () => request({ url: '/api/messages/unread-count' }),
    read: (id) => request({ url: `/api/messages/${id}/read`, method: 'POST' }),
    readAll: () => request({ url: '/api/messages/read-all', method: 'POST' }),
  },
  feedback: {
    create: (data) => request({ url: '/api/feedback', method: 'POST', data }),
    getList: (params) => request({ url: '/api/feedback/list', data: params }),
    reply: (id, data) => request({ url: `/api/feedback/${id}/reply`, method: 'POST', data }),
  },
  dashboard: {
    getOverview: () => request({ url: '/api/dashboard/overview' }),
    getAttendanceChart: (params) => request({ url: '/api/dashboard/attendance-chart', data: params }),
    getGradeChart: (params) => request({ url: '/api/dashboard/grade-chart', data: params }),
    getAwardChart: (params) => request({ url: '/api/dashboard/award-chart', data: params }),
    getWarnings: (params) => request({ url: '/api/dashboard/warnings', data: params }),
  },
  export: {
    signIns: (activityId) => request({ url: `/api/export/signins/${activityId}` }),
    grades: (params) => request({ url: '/api/export/grades', data: params }),
    attendance: (params) => request({ url: '/api/export/attendance', data: params }),
    awards: (params) => request({ url: '/api/export/awards', data: params }),
  }
};

module.exports = API;