import React,{useEffect} from 'react';
import { View, Text,Button } from '@tarojs/components'
import EssayItem from '../../components/essayItem/index';
import request from '../../request/request';
import { useState } from 'react';
import Taro,{useDidShow} from'@tarojs/taro'


export default function index() {
  let [data,setData]=useState([])
  useDidShow(()=>{
    request({
      url:'https://wx.dotfyj.com:9999/user/likeRecom',
      success:function(res){
        console.log(res)
        if(res.statusCode==200)
        setData(res.data)
      }
    })
  })


  return <View>
    {
      data.length===0?'':
      data.map((item,index)=>{
        return <EssayItem key={index} data={   {
          eauthor:item.rauthor,
          edetails:item.rdetails,
          eid:item.rid,
          eimg:item.rimg,
          etime:item.rtime,
          etitle:item.rtitle,
          type:2
        }}></EssayItem>
      })
    }
    
  </View>;
}

