Page({
  data: {
    announcementId: null,
    announcement: null,
    loading: true
  },

  onLoad(options) {
    const { id } = options;
    this.setData({ announcementId: id });
    this.loadAnnouncementDetail();
  },

  onPullDownRefresh() {
    this.loadAnnouncementDetail();
    wx.stopPullDownRefresh();
  },

  loadAnnouncementDetail() {
    this.setData({ loading: true });
    
    setTimeout(() => {
      const allAnnouncements = [
        { 
          id: 1, 
          title: '关于2024年秋季学期期末考试安排的通知', 
          content: '各位同学：\n\n现将2024年秋季学期期末考试安排通知如下：\n\n一、考试时间\n2024年12月25日-2025年1月5日\n上午：9:00-11:00\n下午：14:30-16:30\n\n二、考试地点\n详见教务系统个人考试安排\n\n三、注意事项\n1. 请同学们提前15分钟到达考场\n2. 携带学生证、身份证等有效证件\n3. 严禁携带手机等通讯设备进入考场\n4. 遵守考场纪律，诚信考试\n\n如有疑问，请联系教务处。\n\n教务处\n2024年12月1日',
          important: true,
          createTime: '2024-12-01 08:00'
        },
        { 
          id: 2, 
          title: '图书馆寒假闭馆通知', 
          content: '各位读者：\n\n根据学校寒假安排，现将图书馆闭馆时间通知如下：\n\n一、闭馆时间\n2025年1月10日-2025年2月20日\n\n二、开馆时间\n2025年2月21日起正常开馆\n\n三、温馨提示\n1. 请各位读者在闭馆前将所借图书归还\n2. 闭馆期间不提供借阅服务\n3. 电子资源24小时开放\n\n感谢大家的理解与配合！\n\n图书馆\n2024年12月10日',
          important: false,
          createTime: '2024-12-10 14:00'
        },
        { 
          id: 3, 
          title: '校园网络升级维护通知', 
          content: '各位师生：\n\n为提升校园网络质量，学校将于本周末进行网络升级维护。\n\n一、维护时间\n2024年12月14日（周六）22:00-次日8:00\n\n二、影响范围\n全校校园网络\n\n三、注意事项\n1. 维护期间网络将暂时中断\n2. 请提前保存好工作内容\n3. 如有紧急需求，请使用4G/5G网络\n\n给您带来的不便，敬请谅解！\n\n网络中心\n2024年12月12日',
          important: false,
          createTime: '2024-12-12 10:30'
        }
      ];
      
      const announcement = allAnnouncements.find(a => a.id === parseInt(this.data.announcementId));
      
      this.setData({
        announcement,
        loading: false
      });
    }, 500);
  },

  onShareAppMessage() {
    return {
      title: (this.data.announcement && this.data.announcement.title) || '公告详情',
      path: '/pages/announcements/detail?id=' + this.data.announcementId
    };
  }
});
