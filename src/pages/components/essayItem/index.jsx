import React, { useEffect } from 'react';
import { View, Text,Image } from '@tarojs/components'
import './index.scss';
import Taro,{ getCurrentInstance } from'@tarojs/taro'


export default function index(props) {

  const goDetial=(id,type)=>{
    return ()=>{
      Taro.navigateTo({
        url: `/pages/components/essayDetails/index?id=${id}&type=${type}`,
      })
    }
   
  }

  return <View className='essayItem-view' onClick={goDetial(props.data.eid,props.data.type)}>
          <View className='left-view'>
            <Image src={props.data.eimg}></Image>
          </View>
          <View className='right-view'>
              <View className='top-text'>{props.data.etitle}</View>
              <View className='bottom-text'>{props.data.eauthor} {props.data.etime}</View>
          </View>
  </View>;
}
