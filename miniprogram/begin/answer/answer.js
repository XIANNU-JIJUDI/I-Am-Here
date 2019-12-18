Page({
  data: {
    inputValue1:'',
  },
  data: {
    array: [1, 2, 3,4,5,6,7,8],
    index: -1,
    text: '',
  },
  input1:function(e){
    var value = e.detail.value
    this.setData({
      inputValue1:value
    })
  },

  jumpPageAnswer2: function () {
    this.setData({ text: this.data.array[++this.data.index] });
    console.log(text)

    var input1 = this.data.inputValue1;
    var db = wx.cloud.database()
    db.collection("answer").add({
      data:{
        input1: this.data.inputValue1
      }
    })
    
  }
})