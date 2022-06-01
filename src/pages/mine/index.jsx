import React,{useEffect,Fragment, useState} from 'react';
import { View, Text,Image } from '@tarojs/components'
import Taro ,{useDidShow}from'@tarojs/taro'
import './index.scss'
import request from '../request/request';


import jiantou from '../assets/jiantou.png';
import userInfo from '../assets/userInfo.png';
import collection from '../assets/collection.png';
import feedback from '../assets/feedback.png';
import ownRecipe from '../assets/ownRecipe.png';
import record from '../assets/record.png';


export default function index() {
  let [avatar,setAvatar]=useState()
  let [nickName,setNickName]=useState('用户')
  let [phone,setPhone]=useState()

  useDidShow(() => {
    let userInfo=Taro.getStorageSync('userInfo')
    setAvatar(userInfo.avatarUrl)
    setNickName(userInfo.nickName)
  console.log(Taro.getStorageSync('userInfo'))
  request({
    url:'https://wx.dotfyj.com:9999/user/getInfo',
    success:function(res){
      if(res.statusCode===200){
        Taro.setStorageSync('info',res.data)
        setPhone(res.data.phone)
      }
     
    }
  })
  })




  const infoData=[
    {
      image:userInfo,
      text:'个人信息',
      url:'/pages/mine/userInfo/index',
    },
    {
      image:record,
      text:'问诊记录',
      url:'/pages/mine/record/index'
    },
    {
      image:collection,
      text:'健康收藏',
      url:'/pages/mine/collection/index'
    },
    {
      image:ownRecipe,
      text:'个人食谱',
      url:'/pages/mine/ownRecipe/index'

    },
    {
      image:feedback,
      text:'问题反馈',
      url:'/pages/mine/feedback/index'
    },
  ]


  return <View className='mine-view'>
    <View className='top-view'>
      <View>
        <Image src={avatar}></Image>
      </View>
      <View className='top-info-view'>
        <View className='name'>{nickName}</View>
        <View className='phone'>{phone}</View>
      </View>
    </View>

    <View className='info-view'>
      {
        infoData.map((item,index)=>{  
          return <Fragment key={index}>
            <View className='info-view-item' onClick={()=>{Taro.navigateTo({url:item.url})}}>
              <View>
                <Image className='left-image' src={item.image}></Image>
                <Text>{item.text}</Text>
              </View>
              <View>
                <Image className='right-image' src={jiantou}></Image>
              </View>
            </View>
            {
              index===4?'':<View className='hr'></View>
            }
          </Fragment>
        })
      }
     </View>


  </View>;
}

