// pages/home/home.js
Page({
  done: function (){
    wx.navigateTo({
      url: '/begin/zhiyin/list/list',
    })
  },
  data: {
    imgurl: ""
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {

  },
  upload() {
    let that = this;
    let timestamp = Date.parse(new Date())
    console.log("当前时间戳", timestamp)
    console.log("点击了图片上传")
    // 让用户选择一张图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        wx.showLoading({
          title: '上传中......',
        })
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: timestamp + '.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            wx.hideLoading()
            console.log('上传成功', res)
            that.setData({
              imgurl: res.fileID
            })
            that.addImgList(res.fileID)
          },
        })
      },
    })
  },
  addImgList(imgurl) {
    let that = this;
    wx.cloud.database().collection('imagelist').add({
      data: {
        imgurl: imgurl,
        time: that.getNowFormatDate()
      },
      success: function (res) {
        console.log("添加成功", res)
      },
      fail(res) {
        console.log("添加失败", res)
      }
    })
  },
  //获取当前时间,返回时间格式：2019-12-16 13:04:36
  getNowFormatDate: function () {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + date.getHours() + seperator2 + date.getMinutes() +
      seperator2 + date.getSeconds();
    return currentdate;
  },
})