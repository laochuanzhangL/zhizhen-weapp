import React from 'react';
import { View, Text,Button } from '@tarojs/components'
import EssayItem from '../../components/essayItem/index';
import { useEffect,useState } from 'react';
import request from '../../request/request';
import Taro,{useDidShow} from'@tarojs/taro'


export default function index() {

  let [data,setData]=useState([])
  useDidShow(()=>{
    request({
      url:'https://wx.dotfyj.com:9999/user/likeEncyc',
      success:function(res){
        console.log(res)
        if(res.statusCode==200)
        setData(res.data)
      }
    })
  })



  return <View>
    {
      data.length==0?'':
      data.map((item,index)=>{
        return <EssayItem key={index} data={{...item,type:1}}></EssayItem>
      })
    }
    
  </View>;
}
1
