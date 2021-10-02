const {
    getPlayListDeatil
} = require('../../network/request')
Page({
    data: {
        //榜单总数据
        playlist: {},
        //控制SQ图标的显示与否
        flag:0
    },
    onLoad(e) {
        this.getPlayListData(e.id)
    },
    //获取歌单详情数据
    getPlayListData(id) {
        getPlayListDeatil(id).then(res => {
            console.log(res.data)
            const playlist = res.data.playlist
            this.setData({
                playlist,
                flag: res.data.privileges
            })
        })
    },
    //将播放量转为小数取小数点后一位
    changePlayCount() {
        const num = this.data.playlist.playCount / 10000000
        num.toFixed(1)
        console.log(num);
        return num + '亿'
    },
    //点击歌曲前往详情页并播放歌曲
    goToDetail(e) {
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + id,
            success: (result)=>{
                console.log(result);
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },
    share() {
        wx.showShareMenu({
            withShareTicket: false,
            menus: "shareAppMessage",
            success: (result)=>{
                console.log(result);
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    }
})