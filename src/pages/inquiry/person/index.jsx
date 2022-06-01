
import { View, Image} from '@tarojs/components'

import React,{useState,useEffect} from 'react';
import Taro from'@tarojs/taro'
import person from '../../assets/personing.png';
import './index.scss'

export default function index() {

 

  return <View className='person-view'>
        <Image src={person}></Image>
        <View>人工问诊服务准备上线 尽情期待</View>
    </View>
}