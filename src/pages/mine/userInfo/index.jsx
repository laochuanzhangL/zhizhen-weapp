import React,{useState,useEffect} from 'react';
import { View, Text,Button ,Image,Picker,Input} from '@tarojs/components'
import Taro, { makePhoneCall } from'@tarojs/taro'
import { AtToast } from "taro-ui"
import './index.scss'
import request from '../../request/request';



export default function index() {
  let [toast,setToast]=useState('')
  let [long,setLong]=useState(11)
  let [avatar,setAvatar]=useState()
  let [nickName,setNickName]=useState('用户')
  let [phone,setPhone]=useState()

  let [region,setRegion]=useState('')
  let [sex,setSex]=useState('男')
  let [time,setTime]=useState('2022-01-27')
  let [show,setShow]=useState(false)

  useEffect(()=>{
    let userInfo=Taro.getStorageSync('userInfo')
    let info=Taro.getStorageSync('info')
    console.log(Taro.getStorageSync('info'))
    setAvatar(userInfo.avatarUrl)
    setNickName(userInfo.nickName)
    setRegion(info.address)
    setTime(info.birthday)
    setSex(info.sex)
    setPhone(info.phone)

  },[])

  useEffect(()=>{
    if(show){
    setTimeout(()=>{
      setShow(false)
    },1000)
  }
  },[show])
 
  const sexChange=(sex)=>{
    if(sex.detail.value==0)setSex('男')
    else setSex('女')
    
  }

  const dateChange=(date)=>{
    setTime(date.detail.value)
  }

  const addressChange=(address)=>{
    setRegion(`${address.detail.value[0]}-${address.detail.value[1]}-${address.detail.value[2]}`)
  }

  const phoneChange=(e)=>{
    console.log(e)
    setPhone(e.value)
    setLong(e.value.length)
  }

  const summit=()=>{
    if(long==11)
    {
      setToast('')
      request({
        url:'https://wx.dotfyj.com:9999/user/insertInfo',
        method:'put',
        data:{
          sex,
          birthday:time,
          address:region,
          phone
        },
        success:function(res){
          if(res.data.code==200){
            Taro.setStorageSync('info',{address:region,birthday:time,sex,phone})
            setShow(true)
          }
          else{
          setToast('修改失败')

          }
        }
      })
    }
    else {
      setToast('请重新填写完整信息后重试')
    }
  }

  return <View className='userInfo-view'>
    <View className='top-view'>
      <View>
        <Image src={avatar}></Image>
      </View>
      <View className='top-info-view'>
        <View className='name'>{nickName}</View>
        <View className='phone'>{phone}</View>
      </View>
    </View>

    <View className='bottom-view'>

      <Picker mode='selector' range={['男','女']} onChange={sexChange}>
      <View className='picker'>
                  <View className='left-title'>性别</View>
                  <View className='right-content'>{sex}</View>
                </View>
      </Picker>
      <View className='hr'></View>
      <Picker mode='date' onChange={dateChange}>
        <View className='picker'>
                  <View  className='left-title'>出生日期</View>
                  <View className='right-content'>{time}</View>
                </View>
      </Picker>
      <View className='hr'></View>
      <Picker mode='region' value={region} onChange={addressChange}>
      <View className='picker'>
                  <View className='left-title'>居住地</View>
                  <View className='right-content'><Text >{region}</Text></View>
                </View>
      </Picker>   
      <View className='hr'></View>

      <View className='picker'>
                  <View className='left-title'>手机号码</View>
                  <Input maxlength={11} type="number" onBlur={e=>phoneChange(e.detail)} value={phone} className='input'></Input>
                </View> 
    </View>
    <View className='toast'>{toast}</View>

    <View onClick={summit} className='summit'>
      确认提交
    </View>
    <AtToast isOpened={show} text='修改成功'></AtToast>

  </View>;
}

