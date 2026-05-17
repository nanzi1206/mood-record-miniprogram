// pages/index/index.js
Page({
    data: {
      moodList: [
        { label: '开心', value: '开心', emoji: '😊' },
        { label: '一般', value: '一般', emoji: '😐' },
        { label: '难过', value: '难过', emoji: '😢' },
        { label: '生气', value: '生气', emoji: '😠' }
      ],
      currentMood: '开心',       // 默认选中的心情
      currentThought: '',        // 当前输入的想法
      historyList: []            // 历史记录数组
    },
  
    onLoad() {
      this.loadHistory();
    },
  
    // 加载本地存储的历史记录
    loadHistory() {
      const records = wx.getStorageSync('mood_records') || [];
      this.setData({ historyList: records });
    },
  
    // 保存历史记录到本地
    saveHistory(records) {
      wx.setStorageSync('mood_records', records);
      this.setData({ historyList: records });
    },
  
    // 选择心情
    selectMood(e) {
      const mood = e.currentTarget.dataset.value;
      this.setData({ currentMood: mood });
    },
  
    // 输入想法（使输入框可编辑的关键）
    onThoughtInput(e) {
      this.setData({ currentThought: e.detail.value });
    },
  
    // 保存一条心情记录
    saveMood() {
      const { currentMood, currentThought, historyList } = this.data;
      // 生成唯一id和时间字符串
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const newRecord = {
        id: Date.now(),
        mood: currentMood,
        thought: currentThought.trim(),
        time: timeStr
      };
      // 新记录添加到数组头部（最新在上）
      const newList = [newRecord, ...historyList];
      this.saveHistory(newList);
      // 可选：清空输入框并保留心情默认值
      this.setData({ currentThought: '' });
      wx.showToast({ title: '已保存', icon: 'success' });
    },
  
    // 删除记录
    deleteRecord(e) {
      const id = e.currentTarget.dataset.id;
      const newList = this.data.historyList.filter(item => item.id !== id);
      this.saveHistory(newList);
      wx.showToast({ title: '已删除', icon: 'none' });
    }
  });