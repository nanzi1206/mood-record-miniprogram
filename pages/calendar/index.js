Page({
  data: {
    moodText: "点击日期查看心情",
    records: []
  },

  onLoad() {
    // 读取打卡记录
    const records = wx.getStorageSync('moodRecords') || []
    this.setData({ records })
  },

  // 点击日期
  showMood(e) {
    const day = e.currentTarget.dataset.day
    const { records } = this.data

    // 找到今天的记录
    const today = new Date()
    const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

    const record = records.find(r => r.date === day)
    if (record) {
      this.setData({
        moodText: `心情：${record.mood}，想法：${record.text || '无'}`
      })
    } else {
      this.setData({
        moodText: "这天还没记录心情哦~"
      })
    }
  }
})
