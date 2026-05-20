Page({
  data: {
    current: '',    // 当前选中的心情
    text: '',       // 输入的想法
    records: []     // 历史打卡记录
  },

  onLoad() {
    // 页面加载时读取历史记录
    this.getRecords()
  },

  // 选择心情
  setEmo(e) {
    const emo = e.currentTarget.dataset.emo
    this.setData({
      current: emo
    })
  },

  // 输入想法
  onInput(e) {
    this.setData({
      text: e.detail.value
    })
  },

  // 保存打卡
  save() {
    const { current, text } = this.data
    if (!current) {
      wx.showToast({ title: '请选择心情', icon: 'none' })
      return
    }

    // 今天日期
    const today = new Date()
    const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

    // 读取历史记录
    let records = wx.getStorageSync('moodRecords') || []

    // 判断今天是否已经打卡
    const hasRecord = records.some(item => item.date === dateStr)
    if (hasRecord) {
      wx.showToast({ title: '今天已打卡', icon: 'none' })
      return
    }

    // 新记录
    const newRecord = {
      date: dateStr,
      mood: current,
      content: text,
      time: today.toLocaleString()
    }

    records.unshift(newRecord) // 新记录放最前面

    // 保存到本地
    wx.setStorageSync('moodRecords', records)

    wx.showToast({ title: '打卡成功' })

    // 清空表单
    this.setData({
      current: '',
      text: '',
      records: records
    })
  },

  // 获取历史记录
  getRecords() {
    const records = wx.getStorageSync('moodRecords') || []
    this.setData({ records })
  }
})