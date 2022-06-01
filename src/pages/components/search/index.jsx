import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import "./index.scss";
import { AtInput, AtButton } from "taro-ui";
import request from "../../request/request";
export default function index(props) {
  const { sort, setSearchDatas,allData } = props;
  let [inputValue, setInputValue] = useState("");
  const textChange = value => {
    setInputValue(value);
    if(!value){
        setSearchDatas(allData)
    }
  };
  const summit = () => {
    console.log(sort)
    inputValue?
    request({
      url: `https://wx.dotfyj.com:9999/${sort}/words/${inputValue}`,
      success: function(res) {
        if(res.data.length){
            setSearchDatas(res.data)
        }else{
            wx.showToast({
                title: '暂无此文章',
                icon: 'error',
                duration: 1500
              })
        }
      }
    }):wx.showToast({
        title: '请输入内容',
        icon: 'error',
        duration: 1500
      })
  };
  return (
    <View className="search_wrap">
      <View className="search">
        <AtInput
          className="input"
          adjustPosition={false}
          onChange={textChange}
          value={inputValue}
          placeholder="请输入文章名"
        />
        <AtButton
          className="button"
          size="small"
          type="primary"
          onClick={summit}
        >
          搜索
        </AtButton>
      </View>
    </View>
  );
}
