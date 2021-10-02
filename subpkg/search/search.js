const {
    getHotSearchData,
    searchSongByKw,
    getSearchSuggest
} = require('../../network/request')
const {
    debounce,
} = require('../../utils/tools')
Page({
    data: {
        //用户输入的关键字
        kw: '',
        //历史记录
        historyList: [],
        //热搜榜数据
        hotSearchList: [],
        //匹配到的搜索建议
        allMatch: [],
        //判断用户是否点击了建议列表
        flag: true,
        // 根据关键字返回的搜索数据
        searchResult: [],
        //歌曲页面可滚动高度
        scrollHeight: 0

    },
    //查询歌曲参数
    queryObj: {
        //需要获取歌曲的数量
        limit: 30,
        //每页显示的歌曲数量(用户分页)
        offset: 0,
        //搜索单曲
        type: 1
    },
    onLoad() {
        this.getHotSearchData()
        //获取设备的可用窗口高度
        wx.getSystemInfo({
            success: (result) => {
                this.setData({
                    scrollHeight: result.windowHeight
                })
            },
        });
        this.setData({
            historyList:JSON.parse(wx.getStorageSync('kw') || '[]')
        })
    },
    //获取热搜榜数据
    getHotSearchData() {
        getHotSearchData().then(res => {
            this.setData({
                hotSearchList: res.data
            })
        }).catch(err => wx.showToast({
            title: err.errMsg,
            icon: 'none',
        }))
    },
    // 点击删除图标，清空历史搜索记录
    deleteAllKw() {
        this.setData({
            historyList: []
        })
        wx.removeStorageSync('kw');

    },
    //监听热搜榜每一项的点击
    hotSearchClick(e) {
        const {
            searchWord
        } = e.currentTarget.dataset.val
        this.setData({
            kw: searchWord,
            flag: false
        })
        this.getSearchResult(searchWord)
    },
    //清空输入框的值
    cancelSearch() {
        this.setData({
            kw: '',
            flag: true,
            allMatch: [],
            searchResult: []
        })
    },
    //用户输入关键字时触发
    searchMsg: debounce(function () {
        if (this.data.kw) {
            this.getSearchSuggest()
        }
    }, 0),
    //根据关键字发起请求匹配搜索建议
    getSearchSuggest() {
        getSearchSuggest(this.data.kw).then(res => {
            this.setData({
                allMatch: res.result.allMatch
            })
        }).catch(err => err)
    },
    //点击匹配到的搜索结果
    getSearchResult(e) {
        this.setData({
            kw: e.currentTarget ? e.currentTarget.dataset.kw : e,
            flag: false
        })
        //发起请求获取歌曲列表
        searchSongByKw(this.data.kw, this.queryObj).then(res => {
            let arr = this.data.historyList
            arr.push(this.data.kw)
            // 判断历史记录中是否出现重复,若有则不添加
            let set = new Set(arr)
            //判断实例身上是否有用户输入的kw
            if (set.has(this.data.kw)) {
                set.delete(this.data.kw)
                set.add(this.data.kw)
            }
            //将伪数组转成真正的数组
            const realArr = Array.from(set)
            this.setData({
                searchResult: res.result.songs,
                historyList: realArr
            })
            //将搜索关键词持久化存储
            this.saveHistory(realArr)
        }).catch(err => err)

    },
    //点击歌曲前往detail页面，并播放歌曲
    goToDetail(e) {
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + id,
        });
    },
    //该方法用于保存历史记录
    saveHistory(kw) {
        wx.setStorageSync('kw', JSON.stringify(kw));
    }
})