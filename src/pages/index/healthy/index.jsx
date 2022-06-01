import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import EssayItem from "../../components/essayItem/index";
import request from "../../request/request";
import Search from "../../components/search/index";
export default function index() {
  let [allData, setAllData] = useState([]);
  const [searchDatas, setSearchDatas] = useState([]);
  useEffect(() => {
    request({
      url: "https://wx.dotfyj.com:9999/encyc/current/1/size/100",
      success: function(res) {
        setAllData(res.data.list);
      }
    });
  }, []);

  return ( 
    <View>
      <Search sort="encyc" setSearchDatas={setSearchDatas} allData={allData} />

      {searchDatas.length
        ? searchDatas.map((item, index) => {
            return (
              <EssayItem key={index} data={{ ...item, type: 1 }}></EssayItem>
            );
          })
        : allData.map((item, index) => {
            return (
              <EssayItem key={index} data={{ ...item, type: 1 }}></EssayItem>
            );
          })}
    </View>
  );
}
