const {getTopList} = require('../../network/request')

Page({
    data: {
        //保存用户的头像和昵称
        userInfo: {},
        // 控制头像区域的显示与隐藏
        isLogin: '立即登录',
        // 首页四个分类的数据
        HomeData: {},
        // 控制骨架屏的显示与隐藏
        isLoading: true
    },
    //监听页面的加载
    onLoad() {
        this.setData({
            userInfo: JSON.parse(wx.getStorageSync('userInfo') || '{}'),
        })
        //发起请求获取数据
        this.getTopList()
    },
    //用户点击登录
    login() {
        if (this.data.isLogin === '立即登录') {
            wx.getUserProfile({
                desc: '测试接口',
                success: (result) => {
                    this.setData({
                        userInfo: result.userInfo,
                        isLogin: '退出登录'
                    })
                    wx.setStorageSync('userInfo', JSON.stringify(result.userInfo));
                    wx.showToast({
                        title: '登陆成功'
                    })
                },
            });
        } else {
            this.setData({
                userInfo: {},
                isLogin: '立即登录'
            })
        }

    },
    // 获取主页分类的数据
    getTopList() {
        getTopList().then(res => {
            console.log(res);
            setTimeout(() => {
                this.setData({
                    HomeData: res,
                    isLoading: false //隐藏骨架屏
                })
            }, 200);
        })
    },
    //点击搜索框跳转页面
    goToSearch() {
        wx.navigateTo({
            url: '/subpkg/search/search',
        });
    }
})