import React, { useEffect, useState } from "react";
import { View, Text, Button } from "@tarojs/components";
import EssayItem from "../../components/essayItem/index";
import request from "../../request/request";
import Search from "../../components/search/index";
export default function index() {
  let [allData, setAllData] = useState([]);
  const [searchDatas, setSearchDatas] = useState([]);
  useEffect(() => {
    request({
      url: "https://wx.dotfyj.com:9999/recom/current/1/size/100",
      success: function(res) {
        console.log(res);
        setAllData(res.data.list);
      }
    });
  }, []);

  return (
    <View>
      <Search sort="recom" setSearchDatas={setSearchDatas} allData={allData} />
      {searchDatas.length
        ? searchDatas.map((item, index) => {
            return (
              <EssayItem
                key={index}
                data={{
                  eauthor: item.rauthor,
                  edetails: item.rdetails,
                  eid: item.rid,
                  eimg: item.rimg,
                  etime: item.rtime,
                  etitle: item.rtitle,
                  type: 2
                }}
              ></EssayItem>
            );
          })
        : allData.map((item, index) => {
            return (
              <EssayItem
                key={index}
                data={{
                  eauthor: item.rauthor,
                  edetails: item.rdetails,
                  eid: item.rid,
                  eimg: item.rimg,
                  etime: item.rtime,
                  etitle: item.rtitle,
                  type: 2
                }}
              ></EssayItem>
            );
          })}
    </View>
  );
}
