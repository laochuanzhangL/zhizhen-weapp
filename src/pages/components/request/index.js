import Taro from'@tarojs/taro'

export default function(url,data){
    if(Taro.getStorageSync('token')){
        console.log(1)
    }
    else Taro.request({
        url:url,
        data:data
    })
}
