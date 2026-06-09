Component({
  data: {
    selected: 0,
    isTeacher: false,
    studentList: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        icon: '🏠',
        isReLaunch: false
      },
      {
        pagePath: '/pages/clubs/list',
        text: '社团',
        icon: '🎯',
        isReLaunch: false
      },
      {
        pagePath: '/pages/grades/index',
        text: '学情',
        icon: '📊',
        isReLaunch: false
      },
      {
        pagePath: '/pages/messages/index',
        text: '消息',
        icon: '💬',
        isReLaunch: false
      },
      {
        pagePath: '/pages/profile/index',
        text: '我的',
        icon: '👤',
        isReLaunch: false
      }
    ],
    teacherList: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        icon: '🏠',
        isReLaunch: false
      },
      {
        pagePath: '/pages/admin/students/index',
        text: '学生管理',
        icon: '👨‍🎓',
        isReLaunch: true
      },
      {
        pagePath: '/pages/admin/dashboard/index',
        text: '学情看板',
        icon: '📊',
        isReLaunch: true
      },
      {
        pagePath: '/pages/admin/index',
        text: '管理中心',
        icon: '⚙️',
        isReLaunch: true
      },
      {
        pagePath: '/pages/profile/index',
        text: '我的',
        icon: '👤',
        isReLaunch: true
      }
    ]
  },
  attached() {
    const app = getApp();
    const userInfo = app.globalData && app.globalData.userInfo;
    const isTeacher = userInfo && (userInfo.role === 'teacher' || userInfo.role === 'admin');
    this.setData({ isTeacher: isTeacher });
  },
  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      const list = this.data.isTeacher ? this.data.teacherList : this.data.studentList;
      const item = list[index];
      if (item.isReLaunch) {
        wx.reLaunch({ url: item.pagePath });
      } else {
        wx.switchTab({ url: item.pagePath });
      }
    }
  }
});
