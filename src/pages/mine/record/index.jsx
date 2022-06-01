import React,{useState,useEffect} from 'react';
import { View, Text,Image } from '@tarojs/components'
import Taro,{useDidShow} from'@tarojs/taro'
import './index.scss'

import check from '../../assets/check.png';
import person from '../../assets/person.png';
import intel from '../../assets/intel.png';
import request from '../../request/request';

let a=0

export default function index() {
  // true是降序
  let [order,setOrder]=useState(false)
  let [data,setData]=useState([])

  let [avatar,setAvatar]=useState()
  let [nickName,setNickName]=useState('用户')
  let [phone,setPhone]=useState()

  useEffect(()=>{
    let userInfo=Taro.getStorageSync('userInfo')
    let info=Taro.getStorageSync('info')
    setAvatar(userInfo.avatarUrl)
    setNickName(userInfo.nickName)
    setPhone(info.phone)

    request({
      url:'https://wx.dotfyj.com:9999/chatting/chattingList/0',
      method:'get',
      success:function(res){
        if(res.statusCode==200){
          let arr=[]
          let canData
          if(res.data.length>10)  canData=res.data.slice(0,10)
          else canData=res.data
          canData.map(item=>{
            return arr.push({type:'智能问诊',time:item.time,sid:item.sid})
          })
          setData(arr)
        }
      }
    })
  },[])

  const go=(id)=>{
    Taro.navigateTo({url:`/pages/mine/item/index?sid=${id}`})
  }

  const low=()=>{
    setOrder(false)
    setData(data.reverse())
  }

  const high=()=>{
    setOrder(true)
    setData(data.reverse())
  }


  return <View className='record-view'>
    <View className='top-view'>
      <View>
        <Image src={avatar}></Image>
      </View>
      <View className='top-info-view'>
        <View className='name'>{nickName}</View>
        <View className='phone'>{phone}</View>
      </View>
    </View>

    <View className='hr'></View>

    <View className='hr-bottom'>
      <View className='left-view'>
        <View className={!order?'left-text checked-view':'left-text noChecked-view'} onClick={low}>降  序</View>
        <View className={order?'left-text checked-view':'left-text noChecked-view' } onClick={high}>升  序</View>
      </View>
      <Text className='right-text'>*问诊记录中只保存近10条问诊记录</Text>
    </View>

    {
      data.map((item,index)=>{
        return <View className='record-item-view' onClick={()=>go(item.sid)} key={index}>
          <View className='item-left'>
            <View>
              <Image src={item.type==='智能问诊'?intel:person}></Image>
            </View>
            <View className='record-info-view'>
              <View className='type'>{item.type==='智能问诊'?'智 能 问 诊':'人 工 问 诊'}</View>
              <View className='time'>{item.time}</View>
              </View>
          </View>
          <View>
            <Image className='icon' src={check}></Image>
          </View>
      </View>
      })
    }

  </View>;
}

