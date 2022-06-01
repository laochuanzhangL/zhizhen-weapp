import React, { useEffect ,useState} from 'react';
import { View, Text,Button,Image } from '@tarojs/components'
import Taro,{ getCurrentInstance } from'@tarojs/taro'

import collection from '../../assets/collection.png';
import collectioned from '../../assets/collectioned.png';
import './index.scss'
import request from '../../request/request'


export default function index() {

  let [data,setDate]=useState({
    etitle:'',
    eauthor:'',
    etime:'',
    eid:null,
    eimg:'',
    edetails:'',
    // type=1 是健康百科   type=2 是食谱推荐
  })

  let [isLike,setIsLike]=useState(0)


  useEffect(()=>{
    console.log(getCurrentInstance().router.params.type)
    let eid=getCurrentInstance().router.params.id
    
    if(getCurrentInstance().router.params.type==1){
      request({
        url:`https://wx.dotfyj.com:9999/encyc/${eid}`,
        success:function(res){
          console.log(res)
          setDate(res.data.item)
          setIsLike(res.data.isLike)
        }
      })
    }
    else if(getCurrentInstance().router.params.type==2){
      request({
        url:`https://wx.dotfyj.com:9999/recom/${eid}`,
        success:function(res){
          console.log(res)
          setDate({
            etitle:res.data.item.rtitle,
            eauthor:res.data.item.rauthor,
            etime:res.data.item.rtime,
            eid:res.data.item.rid,
            eimg:res.data.item.rimg,
            edetails:res.data.item.rdetails,
          })
          setIsLike(res.data.isLike)

        }
      })
    }
    
  },[])


  const goLike=()=>{

    if(isLike===0){
      console.log(getCurrentInstance().router.params.type)
      if(getCurrentInstance().router.params.type==1) {
        console.log(1)
        request({
          url:'https://wx.dotfyj.com:9999/encyc/like',
          method:'post',
          data:{eid:data.eid*1},
          success:function(res){
            console.log(res)
          if(res.data.code==200) setIsLike(1)

          }
        })
      }
      else {
        request({
          url:'https://wx.dotfyj.com:9999/recom/like',
          method:'post',
          data:{rid:data.eid*1},
          success:function(res){
            console.log(res)
          if(res.data.code==200) setIsLike(1)

          }
        })
      }

     
    }
    
    else{
      let url
      if(getCurrentInstance().router.params.type==1){
        url=`https://wx.dotfyj.com:9999/encyc/${data.eid}`
      }
      else{
        url=`https://wx.dotfyj.com:9999/recom/${data.eid}`
      }

      request({
        url:url,
        method:'delete',
        success:function(res){
          console.log(res)
          if(res.data.code==200) setIsLike(0)
        }
      })
    }
    
    
  }

  return <View className='essayDetial-view'>
    <View className='title-view'>
      <View className='title-view-left'>
        <View className='title'>{data.etitle}</View>
        <View className='author'>{data.eauthor} {data.etime}</View>
      </View>
      <View className='title-view-right'>
        <Image onClick={goLike} src={isLike==0?collection:collectioned}></Image>

      </View>
    </View>

    <Image className='essay-img' src={data.eimg}></Image>

    <View className='essay-content'>
      <View className='content'>{data.edetails}</View>
    </View>

  </View>;
}

