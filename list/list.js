Page({
  data: {
    records: []
  },

  onShow() {
    // 每次打开页面，重新读取记录
    this.loadRecords();
  },

  // 读取本地存储的记录
  loadRecords() {
    const records = wx.getStorageSync('moodRecords') || [];
    this.setData({
      records: records.reverse() // 最新记录排在最前面
    });
  },

  // 删除单条记录
  deleteRecord(e) {
    const index = e.currentTarget.dataset.index;
    let records = wx.getStorageSync('moodRecords') || [];
    records.splice(records.length - 1 - index, 1); // 对应反转后的索引
    wx.setStorageSync('moodRecords', records);
    this.loadRecords(); // 刷新列表
    wx.showToast({ title: '删除成功', icon: 'success' });
  }
})