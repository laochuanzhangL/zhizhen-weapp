
import { View, Text,Image,Picker } from '@tarojs/components'

import React,{useState,useEffect} from 'react';
import Taro from '@tarojs/taro';
import inxg from '../../assets/inxg.png';
import './index.scss'
import request from '../../request/request';



export default function index() {
  let [region,setRegion]=useState(Taro.getStorageSync('info').address.split('-'))
  let [high,setHigh]=useState([])
  let [middle,setMiddle]=useState([])
  let [myHigh,setMyHigh]=useState([])
  let [myMiddle,setMyMiddle]=useState([])
  let [low,setLow]=useState(true)
  let [time,setTime]=useState()
  let [success,setSuccess]=useState(false)

  const getMessage=(highAddress,middleAddress)=>{

    highAddress.map(item=>{
      if(item.province+'-'+item.city+'-'+item.county===region[0]+'-'+region[1]+'-'+region[2]){
        setLow(false)
        return setMyHigh(item.communitys)
      }

    })
    middleAddress.map(item=>{
      if(item.province+'-'+item.city+'-'+item.county===region[0]+'-'+region[1]+'-'+region[2]){
        setLow(false)
        return setMyMiddle(item.communitys)
      }
    
    })
    setSuccess(true)

  }

  useEffect(()=>{
    request({
      url:'https://wx.dotfyj.com:9999/user/getEpideData',
      success:function(res){
        console.log(res)
        setTime(res.data.data.end_update_time)
        getMessage(res.data.data.highlist,res.data.data.middlelist)
        setHigh(res.data.data.highlist)
        setMiddle(res.data.data.middlelist)
      }
    })
  },[])

  const addressChange=(address)=>{

    setLow(true)
    let addressNow=address.detail.value
    setRegion(address.detail.value)
    high.map(item=>{
      if(item.province==addressNow[0]&&item.city==addressNow[1]&&item.county==addressNow[2]){
        setLow(false)
        return setMyHigh(item.communitys)
      }
    })
    middle.map(item=>{
      if(item.province==addressNow[0]&&item.city==addressNow[1]&&item.county==addressNow[2]){
        setLow(false)
        return setMyMiddle(item.communitys)
      }
    })
  }

  return <View className='xinguan-view'>
    <View className='top-title'>
      <View className='title-left'>
        <View className='top-text'>新 冠 疫 情 数 据 实 时 更 新</View>
        <View className='bottom-text'>数据来源:根据媒体公开发布的信息整合,持续更新中...</View>
      </View>
      <View className='title-right'>
        <Image src={inxg}></Image>
      </View>
    </View>
    <View className='center'></View>
    <View className='xinguan-bottom'>
      <Text className='address-title'>选择地区</Text>
      <Picker mode='region' value={region}  onChange={addressChange}>
        <View className='xinguan-picker'>
                    <Text >{region.length==0?'':region[0]+'-'+region[1]+'-'+region[2]}</Text>
                  </View>
        </Picker>   
      <View className='hr'></View>
      <View className='address-level'>
        {!success?'':
        low?<View className='low'>当前地区为低风险地区</View>:
        <>
          
          {
            myHigh.length==0?'':<>
            <View className='high-title'>高风险地区</View>
            {myHigh.map(item=>{
              return <View className='address-item' key={item}>{item}</View>
            })}
            </>
          }
          {
            myMiddle.length==0?'':<>
            <View className='middle-title'>中风险地区</View>
            {myMiddle.map(item=>{
              return <View className='address-item' key={item}>{item}</View>
            })}
            </>
          }
          <View className='zhu'>注：其余未列出地区均为低风险</View>
          <View className='bottom-text' style={{marginTop:'3vw'}}>截止{time}</View>
          <View className='bottom-text'>有关信息来自各地确认的疫情风险等级</View>
        </>
        }
        
      </View>
    </View>
       
    </View>
}


