
import { View, Text ,Input,Picker,Button} from '@tarojs/components'

import React,{useState,useEffect} from 'react';
import Taro from'@tarojs/taro'
import request from '../../request/request'
import './index.scss'

export default function index() {

  let [phone,setPhone]=useState('')
  let [long,setLong]=useState(0)
  let [region,setRegion]=useState(['请选择','请选择','请选择'])
  let [sex,setSex]=useState('请选择')
  let [time,setTime]=useState('请选择')

  let [toast,setToast]=useState('')
  let [click,setClick]=useState(true)

  const phoneChange=(e)=>{
    console.log(e)
    // setPhone(phone)
    setPhone(e.value)
    setLong(e.value.length)
  }

  const sexChange=(sex)=>{
    console.log(sex.detail.value)
    if(sex.detail.value==0)setSex('男')
    else setSex('女')
  }

  const dateChange=(date)=>{
    setTime(date.detail.value)
  }

  const addressChange=(address)=>{
    setRegion(address.detail.value)
  }
 
  const summit=()=>{

    if(click){
      setClick(false)
      if(long==11&&sex!='请选择'&&region[0]!='请选择'&&time!='请选择')
      {
        setToast('')
        request({
          url:'https://wx.dotfyj.com:9999/user/insertInfo',
          method:'put',
          data:{
            sex,
            birthday:time,
            address:`${region[0]}-${region[1]}-${region[2]}`,
            phone
          },
          success:function(res){
            if(res.data.code==200){
              Taro.switchTab({
                url:'/pages/index/index'
              })
            }
            else {
              setClick(true)
              setToast('提交失败')
            }
          }
        })
      }
      else {
        setToast('请重新填写完整信息后重试')
      }
    }
    
  }
 

  return <View className='getInfo-view'>
      <View>
        <View>
        <Text>手机号码</Text>
        <Input maxlength={11} type="number" onBlur={e=>phoneChange(e.detail)} className='input' placeholder='请输入手机号码,用于问诊结束通知'></Input>
        </View>
        <Text style={{color:'red',marginTop:'4vw'}}>*</Text>
      </View>

      
     
      <Picker mode='date' onChange={dateChange}>

        <View className='picker'>
          <View>
            <Text>出生日期</Text>
            <Text className='input'>{time}</Text>
            </View>
            <Text style={{color:'red',marginTop:'4vw'}}>*</Text>
        </View>
      </Picker>


      <Picker mode='region' value={region}  onChange={addressChange}>
        <View className='picker'>
          <View>
            <Text>居住地</Text>
            <Text className='input'>{region[0]}-{region[1]}-{region[2]}</Text>
            </View>
            <Text style={{color:'red',marginTop:'4vw'}}>*</Text>
        </View>
      </Picker>
   
      <Picker mode='selector' range={['男','女']} onChange={sexChange}>
        <View className='picker'>
          <View>
            <Text>性别</Text>
            <Text className='input'>{sex}</Text>
            </View>
            <Text style={{color:'red',marginTop:'4vw'}}>*</Text>
        </View>
      </Picker>

      <View className='toast'>{toast}</View>
    <View onClick={summit} className='summit'>
      确认提交
    </View>
    <View className='message'>个人信息可于个人中心修改</View>

    </View>
}