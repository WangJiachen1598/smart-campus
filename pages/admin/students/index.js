const app = getApp();

Page({
  data: {
    studentList: [],
    searchKeyword: '',
    currentFilter: 'all',
    loading: true,
    isBatchMode: false,
    selectedIds: [],
    isAllSelected: false
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
  },

  onPullDownRefresh() {
    this.loadData();
    wx.stopPullDownRefresh();
  },

  loadData() {
    this.setData({ loading: true });

    setTimeout(() => {
      const mockStudents = [
        { id: 1, name: '张三', studentId: '2024001', className: '计算机2101班', phone: '13800138001', status: 'active', avatar: '' },
        { id: 2, name: '李四', studentId: '2024002', className: '计算机2101班', phone: '13800138002', status: 'active', avatar: '' },
        { id: 3, name: '王五', studentId: '2024003', className: '计算机2102班', phone: '13800138003', status: 'inactive', avatar: '' },
        { id: 4, name: '赵六', studentId: '2024004', className: '软件工程2101班', phone: '13800138004', status: 'active', avatar: '' },
        { id: 5, name: '钱七', studentId: '2024005', className: '软件工程2101班', phone: '13800138005', status: 'active', avatar: '' }
      ];

      this.setData({
        studentList: mockStudents,
        loading: false
      });
    }, 500);
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },

  onSearch() {
    this.filterStudents();
  },

  onFilterChange(e) {
    this.setData({ currentFilter: e.currentTarget.dataset.filter });
    this.filterStudents();
  },

  filterStudents() {
    const { searchKeyword, currentFilter } = this.data;
    this.loadData();
  },

  goAdd() {
    wx.navigateTo({ url: '/pages/admin/students/edit' });
  },

  goEdit(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/admin/students/edit?id=${id}` });
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/admin/students/edit?id=${id}` });
  },

  enterBatchMode() {
    this.setData({
      isBatchMode: true,
      selectedIds: [],
      isAllSelected: false
    });
  },

  exitBatchMode() {
    this.setData({
      isBatchMode: false,
      selectedIds: [],
      isAllSelected: false
    });
  },

  toggleSelect(e) {
    const id = e.currentTarget.dataset.id;
    const selectedIds = [...this.data.selectedIds];
    const index = selectedIds.indexOf(id);

    if (index > -1) {
      selectedIds.splice(index, 1);
    } else {
      selectedIds.push(id);
    }

    const isAllSelected = selectedIds.length === this.data.studentList.length;
    this.setData({ selectedIds, isAllSelected });
  },

  toggleSelectAll() {
    if (this.data.isAllSelected) {
      this.setData({ selectedIds: [], isAllSelected: false });
    } else {
      const allIds = this.data.studentList.map(s => s.id);
      this.setData({ selectedIds: allIds, isAllSelected: true });
    }
  },

  deleteStudent(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该学生信息吗？此操作无法恢复！',
      confirmColor: '#f44336',
      success: (res) => {
        if (res.confirm) {
          const newList = this.data.studentList.filter(s => s.id !== id);
          this.setData({ studentList: newList });
          wx.showToast({ title: '删除成功', icon: 'success' });
        }
      }
    });
  },

  batchDelete() {
    wx.showModal({
      title: '批量删除',
      content: `确定要删除选中的 ${this.data.selectedIds.length} 名学生信息吗？此操作无法恢复！`,
      confirmColor: '#f44336',
      success: (res) => {
        if (res.confirm) {
          const newList = this.data.studentList.filter(s => !this.data.selectedIds.includes(s.id));
          this.setData({ 
            studentList: newList, 
            selectedIds: [], 
            isAllSelected: false,
            isBatchMode: false
          });
          wx.showToast({ title: '批量删除成功', icon: 'success' });
        }
      }
    });
  },

  batchToggleStatus() {
    wx.showModal({
      title: '批量操作',
      content: '请选择要执行的操作',
      confirmText: '批量复学',
      cancelText: '批量休学',
      success: (res) => {
        if (res.confirm) {
          const newList = this.data.studentList.map(s => {
            if (this.data.selectedIds.includes(s.id)) {
              return { ...s, status: 'active' };
            }
            return s;
          });
          this.setData({ 
            studentList: newList, 
            selectedIds: [], 
            isAllSelected: false,
            isBatchMode: false
          });
          wx.showToast({ title: '批量复学成功', icon: 'success' });
        } else {
          const newList = this.data.studentList.map(s => {
            if (this.data.selectedIds.includes(s.id)) {
              return { ...s, status: 'inactive' };
            }
            return s;
          });
          this.setData({ 
            studentList: newList, 
            selectedIds: [], 
            isAllSelected: false,
            isBatchMode: false
          });
          wx.showToast({ title: '批量休学成功', icon: 'success' });
        }
      }
    });
  },

  batchExport() {
    wx.showLoading({ title: '导出中...' });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '导出成功', icon: 'success' });
    }, 1000);
  },

  toggleStatus(e) {
    const id = e.currentTarget.dataset.id;
    const student = this.data.studentList.find(s => s.id === id);
    
    wx.showModal({
      title: '确认操作',
      content: student.status === 'active' ? '确定要让该学生休学吗？' : '确定要让该学生复学吗？',
      success: (res) => {
        if (res.confirm) {
          const newStatus = student.status === 'active' ? 'inactive' : 'active';
          const newList = this.data.studentList.map(s => {
            if (s.id === id) {
              return { ...s, status: newStatus };
            }
            return s;
          });
          this.setData({ studentList: newList });
          wx.showToast({ title: '操作成功', icon: 'success' });
        }
      }
    });
  },

  goHome() {
    wx.reLaunch({ url: '/pages/index/index' });
  }
});
