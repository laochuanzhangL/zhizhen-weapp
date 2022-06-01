
import { View, Image} from '@tarojs/components'

import React,{useState,useEffect} from 'react';
import Taro,{ getCurrentInstance } from'@tarojs/taro'

// import { nanoid } from 'nanoid
import request from '../../request/request'
import intelUrl from '../../assets/intelUrl.png';

import './index.scss'


export default function index() {
  let [userInfo,setUserInfo]=useState('')
  let [data,setData]=useState([])

  useEffect(()=>{
    setUserInfo(Taro.getStorageSync('userInfo'))
    console.log(getCurrentInstance().router.params.sid)
    let sid=getCurrentInstance().router.params.sid
    request({
      url:`https://wx.dotfyj.com:9999/chatting/chattingRecord/${sid}`,
      success:function(res){
        console.log(res)
        if(res.statusCode==200){
          setData(res.data)
        }
      }
    })

  },[])

  const illDetail=(value)=>{
    console.log(value)
    Taro.navigateTo({url:`/pages/inquiry/detail/index?name=${value.name}&introduce=${value.introduce}&department=${value.department}&easy_get=${value.easy_get}&treat_period=${value.treat_period}&drug=${value.drug}&can_eat=${value.can_eat}&not_eat=${value.not_eat}&prevent=${value.prevent}&symptom=${value.symptom}&cause=${value.cause}&treat_detail=${value.treat_detail}`})
  }

  const illPie=(value)=>{
    Taro.navigateTo({url:`/pages/inquiry/pie/index?data=${JSON.stringify(value)}`})
  }

  return <View className='record-item'>
     {
       data.map((item,index)=>{
         return <View key={index} className='outView' style={{flexDirection:item.name==='intel'?'row':'row-reverse'}}>
           <View >
             <Image src={item.name==='intel'?intelUrl:userInfo.avatarUrl}></Image>
           </View>
           <View>


              {
                item.name=='person'?<View><View className='content' style={{marginLeft:item.name==='intel'?'2vw':'15vw'}}>{item.content}</View></View>:
                item.kind=='text'? <View><View className='content' style={{marginLeft:item.name==='intel'?'2vw':'15vw'}}>{item.content}</View></View>:
                item.kind=='detail'?<>{item.custom.content.map((_item)=>{
                  return <View><View className='content' key={_item} style={{marginLeft:item.name==='intel'?'2vw':'15vw'}}>{_item}</View></View>
                })}<View><View className='select' onClick={()=>illDetail(item.custom.detail)}>{item.custom.disease_name}</View></View></>:
                item.kind=='pie'?<><View><View className='content' style={{marginLeft:item.name==='intel'?'2vw':'15vw'}}>您可能出现这种疾病</View></View>
                  <View><View className='select' onClick={()=>illPie(item.custom.detail_list)}>疾病预测</View></View></>:
                item.kind=='option'?<>{item.custom.content.map(_item=>{
                  return  <View><View className='content' key={_item} style={{marginLeft:item.name==='intel'?'2vw':'15vw'}}>{_item}</View></View>
                })}</>:
                item.kind=='none'? <><View className='content' style={{marginLeft:item.name==='intel'?'2vw':'15vw'}}>{item.content}</View></>
                :''
              }
            
           </View>
         </View>
       })
     }
  </View>
}