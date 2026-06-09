const { goBack } = require('../../utils/util.js');

Page({
  data: {
    messageId: null,
    message: null,
    loading: true
  },

  onLoad(options) {
    const { id } = options;
    this.setData({ messageId: id });
    this.loadMessageDetail();
  },

  loadMessageDetail() {
    this.setData({ loading: true });
    
    setTimeout(() => {
      const allMessages = [
        { 
          id: 1, 
          type: 'club', 
          title: '程序设计协会纳新通知', 
          content: '程序设计协会现在开始纳新，欢迎大家报名参加！\n\n活动内容：\n1. 技术分享会\n2. 编程挑战赛\n3. 项目实战\n\n报名时间：即日起至12月20日\n报名方式：点击下方按钮或前往社团办公室\n\n期待你的加入！',
          isRead: false, 
          createTime: '2024-12-15 10:00',
          sender: '程序设计协会'
        },
        { 
          id: 2, 
          type: 'study', 
          title: '成绩发布通知', 
          content: '您的2024-1学期成绩已发布，请及时查看。\n\n登录"学情查询"模块可查看详细成绩和排名。\n\n如有疑问，请联系教务处。',
          isRead: false, 
          createTime: '2024-12-10 14:30',
          sender: '教务处'
        },
        { 
          id: 3, 
          type: 'approval', 
          title: '社团申请已通过', 
          content: '恭喜您已成功加入程序设计协会！\n\n请于本周六下午2点到社团活动室参加第一次例会。\n\n社团地址：学生活动中心302室',
          isRead: true, 
          createTime: '2024-12-05 09:00',
          sender: '社团联合会'
        },
        { 
          id: 4, 
          type: 'club', 
          title: '篮球社周末活动预告', 
          content: '本周六下午3点在体育馆举办篮球友谊赛，欢迎参加！\n\n活动时间：12月16日 15:00-17:00\n活动地点：学校体育馆\n\n请自带运动装备，注意安全。',
          isRead: true, 
          createTime: '2024-12-03 16:00',
          sender: '篮球社'
        },
        { 
          id: 5, 
          type: 'study', 
          title: '期末考试安排通知', 
          content: '2024-2025学年第一学期期末考试安排已发布，请登录查看。\n\n考试时间：1月6日-1月15日\n考试地点：详见教务系统\n\n请同学们认真复习，诚信考试。',
          isRead: false, 
          createTime: '2024-12-01 08:00',
          sender: '教务处'
        },
        { 
          id: 6, 
          type: 'approval', 
          title: '综测加分申请审核中', 
          content: '您提交的程序设计竞赛一等奖加分申请正在审核中。\n\n审核结果将在3个工作日内通知，请耐心等待。\n\n如有问题，请联系学生工作处。',
          isRead: true, 
          createTime: '2024-11-28 11:20',
          sender: '学生工作处'
        },
      ];
      
      const message = allMessages.find(m => m.id === parseInt(this.data.messageId));
      
      this.setData({
        message,
        loading: false
      });
      
      this.markAsRead();
    }, 500);
  },

  markAsRead() {
    // 这里可以调用API标记为已读
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
    const classMap = {
      club: 'tag-primary',
      study: 'tag-success',
      approval: 'tag-warning'
    };
    return classMap[type] || '';
  },

  goBack() {
    goBack();
  },

  onShareAppMessage() {
    return {
      title: (this.data.message && this.data.message.title) || '消息详情',
      path: '/pages/messages/detail?id=' + this.data.messageId
    };
  }
});
