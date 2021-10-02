"use strict";

var _require = require('../../network/request'),
    _getHotSearchData = _require.getHotSearchData,
    searchSongByKw = _require.searchSongByKw,
    _getSearchSuggest = _require.getSearchSuggest;

var _require2 = require('../../utils/tools'),
    debounce = _require2.debounce;

Page({
  data: {
    //用户输入的关键字
    kw: '',
    //热搜榜数据
    hotSearchList: [],
    //匹配到的搜索建议
    allMatch: [],
    //判断用户是否点击了建议列表
    flag: true,
    // 根据关键字返回的搜索数据
    searchResult: []
  },
  onLoad: function onLoad() {
    this.getHotSearchData();
  },
  //获取热搜榜数据
  getHotSearchData: function getHotSearchData() {
    var _this = this;

    _getHotSearchData().then(function (res) {
      _this.setData({
        hotSearchList: res.data
      });
    })["catch"](function (err) {
      return wx.showToast({
        title: err.errMsg,
        icon: 'none'
      });
    });
  },
  //清空输入框的kw
  cancelSearch: function cancelSearch() {},
  //用户输入关键字时触发
  searchMsg: debounce(function () {
    this.getSearchSuggest();
  }, 800),
  //根据关键字发起请求匹配搜索建议
  getSearchSuggest: function getSearchSuggest() {
    var _this2 = this;

    _getSearchSuggest(this.data.kw).then(function (res) {
      _this2.setData({
        allMatch: res.result.allMatch
      });

      console.log(res.result);
    })["catch"](function (err) {
      return err;
    });
  },
  //点击匹配到的搜索结果
  getSearchResult: function getSearchResult(e) {
    console.log(e.currentTarget.dataset);
    this.setData({
      kw: e.currentTarget.dataset.kw,
      flag: false
    }); //发起请求获取歌曲列表

    searchSongByKw(this.data.kw).then(function (res) {
      console.log(res);
    });
  }
});