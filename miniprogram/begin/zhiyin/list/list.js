Page({
  data: {
    dataList: []
  },

  onShow: function () {
    this.getImageList();
  },
  getImageList() {
    let that = this;
    wx.cloud.database().collection('imagelist').get({
      success(res) {
        console.log(res)
        that.setData({
          dataList: res.data
        })
      }
    })
  },
  //去发布页
  fanhui: function () {
    wx.navigateTo({
      url: '/begin/begin/begin',
    })
  },
  qufabu: function (){
    wx.navigateTo({
      url: '/begin/zhiyin/mhome/mhome',
    })
  },
  delet(event) {
    let that = this;
    let id = event.currentTarget.dataset.id;
    console.log('点击了删除按钮', id)
    wx.showModal({
      title: '警告！',
      content: '您确定要删除吗？',
      success(res) {
        if (res.confirm) {
          console.log('点击了确定按钮')
          wx.cloud.database()
            .collection('imagelist')
            .doc(id)
            .remove({
              success: function (res) {
                console.log("删除成功", res)
                that.getImageList();
              }
            })
        }
        else {
          console.log('点击了取消按钮')
        }
      }
    })
  }
})