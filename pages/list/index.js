Page({
    data: {
      records: []
    },
  
    // 页面每次显示时，自动刷新数据
    onShow() {
      this.refreshRecords();
    },
  
    refreshRecords() {
      // 从本地存储读取记录
      const savedRecords = wx.getStorageSync('moodRecords') || [];
      console.log("读取到的记录：", savedRecords); // 调试用，可看到数据
      this.setData({
        records: savedRecords
      });
    }
  });