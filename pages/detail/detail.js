const {
    getMusicDetail,
    getIyric,
    getMusicUrl
} = require('../../network/request')

Page({
    data: {
        //歌曲详情数据
        musicInfo: [],
        //歌词信息
        musicIyric: [],
        // 音乐播放地址
        musicUrl: '',
        audioContext: {},
        lyricIndex: 0,  //歌词的index
        playicon: false, // 播放状态

    },
    onLoad(e) {
        this.getMusicDetail(e.id)
        this.getIyric(e.id)
        this.getMusicUrl(e.id)
    },
    //获取歌曲详情信息
    getMusicDetail(ids) {
        getMusicDetail(ids).then(res => {
            this.setData({
                musicInfo: res.songs
            })

        })
    },
    //获取歌词信息
    getIyric(id) {
        wx.showLoading({
            title: '歌曲加载中',
            mask: true,
        });
        getIyric(id).then(res => {
            let result = []
            let lyric = res.lrc.lyric
            let re = /\[([^\]]+)\]([^[]+)/g;
            lyric.replace(re, ($0, $1, $2) => {
                result.push({
                    lyric: $2
                });
            });
            this.setData({
                musicIyric: result
            })
            wx.hideLoading();
        })
    },
    // 获取音乐播放地址
    getMusicUrl(id) {
        getMusicUrl(id).then(res => {
            this.setData({
                musicUrl: res.data[0].url
            })
            this.playMusic()
        })
    },
    //点击了播放状态的切换
    playStateChange() {
        let state = this.data.playicon
        this.setData({
            playicon: !state
        })
        this.playMusic()
    },
    // 播放歌曲
    playMusic() {
        console.log(this.data.audioContext);
        if (this.data.playicon) {
            this.data.audioContext.pause()
            return
        }
        if (!this.data.playicon && JSON.stringify(this.data.audioContext) === '{}') {
            const audioContext = wx.createInnerAudioContext();
            this.setData({
                audioContext: audioContext
            })
            audioContext.src = this.data.musicUrl
        }
        this.data.audioContext.play()
    }
})