Component({
  data: {},
  properties: {
    homeData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    goToList(item) {
      wx.navigateTo({
        url: '/pages/list/list?id=' + item.currentTarget.id,
        success: (result) => {
          
        },
      });
    }
  },

})