
import { View,Text } from '@tarojs/components'

import React,{useState,useEffect,Fragment} from 'react';
import Taro,{getCurrentInstance} from'@tarojs/taro'
import { AtInput,AtButton  } from 'taro-ui'
// import { nanoid } from 'nanoid'

import './index.scss'


export default function index() {

  let [data,setData]=useState()

  useEffect(()=>{
    let allData=getCurrentInstance().router.params
    console.log(allData)
    setData(allData)
  },[])
  

  return <View className='detail-view'>
        {
          data==undefined?'':
          <>
            <View className='item'>
              <Text>疾病名称</Text>
              <View className='hr'></View>
              <View className='content'>{data.name}</View>
            </View>
            <View className='item'>
              <Text>疾病简介</Text>
              <View className='hr'></View>
              <View className='content'>{data.introduce}</View>
            </View>
            <View className='item'>
              <Text>所属科室</Text>
              <View className='hr'></View>
              <View className='content'>{data.department}</View>
            </View>
            <View className='item'>
              <Text>易得人群</Text>
              <View className='hr'></View>
              <View className='content'>{data.easy_get}</View>
            </View>
            <View className='item'>
              <Text>治疗周期</Text>
              <View className='hr'></View>
              <View className='content'>{data.treat_period}</View>
            </View>
            <View className='item'>
              <Text>推荐药品</Text>
              <View className='hr'></View>
              <View className='content'>{data.drug}</View>
            </View>
            <View className='item'>
              <Text>推荐食材</Text>
              <View className='hr'></View>
              <View className='content'>{data.can_eat}</View>
            </View>
            <View className='item'>
              <Text>忌口食材</Text>
              <View className='hr'></View>
              <View className='content'>{data.not_eat}</View>
            </View>
            <View className='item'>
              <Text>疾病预防</Text>
              <View className='hr'></View>
              <View className='content'>{data.prevent}</View>
            </View>
            <View className='item'>
              <Text>疾病症状</Text>
              <View className='hr'></View>
              <View className='content'>{data.symptom}</View>
            </View>
            <View className='item'>
              <Text>疾病病因</Text>
              <View className='hr'></View>
              <View className='content'>{data.cause}</View>
            </View>
            <View className='item'>
              <Text>治疗细节</Text>
              <View className='hr'></View>
              <View className='content'>{data.treat_detail}</View>
            </View>
          </>
        }
    </View>
}