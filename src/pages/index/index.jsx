import React,{useEffect} from 'react';
import { View, Text,Button,Swiper, SwiperItem,Image } from '@tarojs/components'
import Taro from'@tarojs/taro'
import request from '../request/request'
import './index.scss';

import lunbo from '../assets/lunbo.png';
import lunbo1 from '../assets/lunbo1.png';
import lunbo2 from '../assets/lunbo2.png';
import person from '../assets/person.png';
import intel from '../assets/intel.png';

import healthy from '../assets/healthy.png';
import recipe from '../assets/recipe.png';
import serve from '../assets/serve.png';
import xinguan from '../assets/xinguan.png';
// import { nanoid } from 'nanoid'


export default function index() {

  

  useEffect(()=>{
    request({
      url:'https://wx.dotfyj.com:9999/user/getInfo',
      success:function(res){
        if(res.statusCode===200){
          console.log(res)
          Taro.setStorageSync('info',res.data)
        }
      }
    })
  },[])

  let servers=[
    {
      name:'新冠防疫',
      url:'/pages/index/xinguan/index',
      img:xinguan

    },
    {
      name:'健康百科',
      url:'/pages/index/healthy/index',
      img:healthy
    },
    {
      name:'服务指南',
      url:'/pages/index/serve/index',
      img:serve
    },
    {
      name:'食谱推荐',
      url:'/pages/index/recipe/index',
      img:recipe
    },
  ]
 

  return <View className='index-view'>
      <Swiper
            className='swiper'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            indicatorDots
            autoplay>
            <SwiperItem>
              <Image  src={lunbo} onClick={()=>Taro.navigateTo({url:'/pages/index/xinguan/index'})}></Image>
            </SwiperItem>
            <SwiperItem>
              <Image src={lunbo1} onClick={()=>Taro.navigateTo({url:'/pages/index/recipe/index'})}></Image>
            </SwiperItem><SwiperItem>
              <Image src={lunbo2} onClick={()=>Taro.navigateTo({url:'/pages/index/healthy/index'})}></Image>
            </SwiperItem>
      </Swiper>

      <View className='center-view'>
        <View className='center-view-top'>
          <View></View>
          <Text>问诊服务</Text>
        </View>
        <View className='center-view-bottom'>
          <View className='center-in' onClick={()=>Taro.navigateTo({url:'/pages/inquiry/intel/index'})}  style={{backgroundColor:'#FCE9E9'}}>
            <View className='center-in-view'>
              <View className='top-text' style={{color:'#EC808D'}}>智慧问诊</View>
              <View className='bottom-text' style={{color:'#EC808D'}}>人工智能助诊</View>
            </View>
            <View className='img-view'  style={{backgroundColor:'#FAD4D5'}}>
              <Image src={intel}></Image>
            </View>
          </View>
          <View className='center-in' style={{backgroundColor:'#E0F8EC'}}  onClick={()=>Taro.navigateTo({url:'/pages/inquiry/person/index'})}>
            <View className='center-in-view'>
              <View className='top-text' style={{color:'#55DA90'}}>人工问诊</View>
              <View className='bottom-text' style={{color:'#55DA90'}}>医生远程问诊</View>
            </View>
            <View className='img-view' style={{backgroundColor:'#C3F2D9'}}>
              <Image src={person}></Image>
            </View>
          </View>

        </View>
      </View>

      <View className='center-view'>
        <View className='center-view-top'>
          <View></View>
          <Text>健康服务</Text>
        </View>
        <View className='bottom-view-bottom'>
          {
            servers.map((item,index)=>{
              return <View className='item' key={index} onClick={()=>Taro.navigateTo({url:item.url})}>
                <View className='view'><Image src={item.img}></Image></View>
                <View className='view' style={{marginTop:'1vw'}}>{item.name}</View>
              </View>
            })
          }
        </View>
      </View>

  </View>;
}



