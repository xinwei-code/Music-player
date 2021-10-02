const baseUrl = "https://cloud-music-4ucdlsrqs-weixin-png.vercel.app"
// const baseUrl = "http://localhost:3000"


// 获取首页数据
function getTopList() {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${baseUrl}/toplist/detail`,
            method: 'GET',
            data: {
                realIP: '127.0 .0 .1'
            },
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                result.data.list.length = 4
                resolve(result.data.list)
            },
        });
    })

}

//获取热搜榜单数据
function getHotSearchData() {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}/search/hot/detail`,
            data: {
                realIP: '127.0 .0 .1'
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                resolve(result.data)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
    })
}

// 根据关键词搜索歌曲
function searchSongByKw(kw, queryObj) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${baseUrl}/cloudsearch?keywords=` + kw,
            data: {
                ...queryObj,
            },
            success: (result) => {
                resolve(result.data)
            },
            fail: (err) => {
                console.log(err);
                reject(err)
            },
        });
    })
}

// 获取搜索建议
function getSearchSuggest(kw, type = 'mobile') {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${baseUrl}/search/suggest`,
            data: {
                keywords: kw,
                type: type,
                realIP: '127.0 .0 .1'
            },
            success: (result) => {
                resolve(result.data)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
    })
}

// 获取歌单详情数据
function getPlayListDeatil(id) {
    return new Promise(function (resolve) {
        wx.request({
            url: `${baseUrl}/playlist/detail?id=` + id,
            data: {},
            success: (result) => {
                resolve(result)
            },
        });
    })

}

//获取单曲详细数据
function getMusicDetail(ids) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${baseUrl}/song/detail?ids=` + ids,
            data: {},
            success: (result) => {
                resolve(result.data)
            },
        });
    })
}
//获取单曲歌词
function getIyric(id) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${baseUrl}/lyric?id=` + id,
            success: (result)=>{
                resolve(result.data)
            },
        });
    })
}

//获取音乐的url地址
function getMusicUrl(id) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: `${baseUrl}/song/url?id=${id}`,
            success: (result)=>{
                resolve(result.data)
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    })
}

//导出方法
module.exports = {
    getTopList,
    getHotSearchData,
    searchSongByKw,
    getSearchSuggest,
    getPlayListDeatil,
    getMusicDetail,
    getIyric,
    getMusicUrl
}