import { View, Image, ScrollView } from "@tarojs/components";

import React, { useState, useEffect, useRef } from "react";
import Taro from "@tarojs/taro";
import { AtInput, AtButton } from "taro-ui";
import request from "../../request/request";
import intelUrl from "../../assets/intelUrl.png";

import "./index.scss";

const info = Taro.getSystemInfoSync();
let i = 1;
let j = 0;

export default function index() {
  let [disabled, setDisabled] = useState(true);
  let [sessionId, setSessionId] = useState("");
  let [inputValue, setInputValue] = useState("");
  let [bottom, setBottom] = useState("0");
  let [id, setId] = useState("low1");
  let [data, setData] = useState([]);
  let [userInfo, setUserInfo] = useState();
  let [button, setButton] = useState(0);

  const dataRef = useRef(data);
  const sidRef = useRef(sessionId);

  const goBottom = () => {
    if (i % 2 == 1) setId("low2");
    else setId("low1");
    i = i + 1;
  };

  const goMessage = (value, key = null) => {
    setTimeout(()=>{
      setInputValue(null);
    },100)
    let data1;
    if (key) data1 = [...data, { name: "person", content: key }];
    else data1 = [...data, { name: "person", content: value }];
    request({
      url: "https://wx.dotfyj.com:9999/chatting/algorithm",
      method: "post",
      data: {
        sender: sessionId,
        message: value
      },
      success: function(res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.length == 0) {
            setData([
              ...data1,
              { name: "intel", kind: "text", content: "我无法理解你说的话!" }
            ]);
          } else if (res.data[0].custom) {
            console.log( {
              name: "intel",
              kind: res.data[0].custom.kind,
              custom: res.data[0].custom
            })
            setData([
              ...data1,
              {
                name: "intel",
                kind: res.data[0].custom.kind,
                custom: res.data[0].custom
              }
            ]);
          } else {
            res.data.map((item, index) => {
              if (index > 0)
                data1.push({
                  name: "intel",
                  kind: "text",
                  content: res.data[index - 1].text
                });
              return setData([
                ...data1,
                { name: "intel", kind: "text", content: item.text }
              ]);
            });
          }
          setDisabled(false);
          goBottom();
        }
      }
    });
  };

  // 获取当前时间
  const getTime = () => {
    let now = new Date();
    let y = now.getYear();
    let clock = y + 1900 + "-";
    let m = now.getMonth() + 1;
    clock += m + "-";
    let d = now.getDate();
    clock += d + " ";
    let hh = now.getHours();
    let mm = now.getMinutes();
    let ss = now.getTime() % 60000;
    ss = (ss - (ss % 1000)) / 1000;
    clock += hh + ":";
    if (mm < 10) clock += "0";
    clock += mm + ":";
    if (ss < 10) clock += "0";
    clock += ss;
    return clock;
  };

  useEffect(() => {
    setUserInfo(Taro.getStorageSync("userInfo"));
    Taro.login({
      success: function(res) {
        let sid = res.code.substring(0, 22);
        setSessionId(sid);
        setData([
          ...data,
          {
            name: "intel",
            kind: "none",
            content:
              "欢迎使用指针健康医疗服务平台,您可以在此平台咨询相关健康问题,我们为您提供2种咨询方式,您可以在下面选择",
            select: ["根据症状推断相关疾病", "咨询已知疾病相关情况"]
          }
        ]);
      }
    });

    return () => {
      console.log(getTime());
      let result = dataRef.current;
      let sid = sidRef.current;
      let time = getTime();
      if (result.length >= 3) {
        request({
          url: "https://wx.dotfyj.com:9999/chatting/chattingRecord",
          method: "post",
          data: {
            sid: sid,
            time: time,
            record: JSON.stringify(result)
          },
          success: function(res) {
            console.log("record", res);
          }
        });
      }
    };
  }, []);

  useEffect(() => {
    setInputValue(" ");
  }, [j]);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    sidRef.current = sessionId;
  }, [sessionId]);

  const isFourceHeight = e => {
    setBottom(e.detail.height + "px");
    setTimeout(() => {
      goBottom();
    }, 200);
  };

  const textChange = value => {
    setInputValue(value);
  };

  const summit = () => {
    setData([
      ...data,
      {
        name: "person",
        content: inputValue
      }
    ]);
    setDisabled(true);
    goBottom();
    // setButton(button+1)
    j = j + 1;
    goMessage(inputValue);
  };

  const selectClick = (value, index) => {
    if (index != data.length - 1) return;
    // console.log(index)
    if (value == "根据症状推断相关疾病") {
      setData([
        ...data,
        {
          name: "person",
          content: value
        },
        {
          name: "intel",
          kind: "none",
          select: [],
          content: "请描述你想咨询的相关症状"
        }
      ]);
    } else if (value == "咨询已知疾病相关情况") {
      setData([
        ...data,
        {
          name: "person",
          content: value
        },
        {
          name: "intel",
          kind: "none",
          select: [],
          content: "请输入您想咨询的疾病名称"
        }
      ]);
    }
    goBottom();

    setDisabled(false);
  };

  const illDetail = value => {
    console.log(value);
    Taro.navigateTo({
      url: `/pages/inquiry/detail/index?name=${value.name}&introduce=${value.introduce}&department=${value.department}&easy_get=${value.easy_get}&treat_period=${value.treat_period}&drug=${value.drug}&can_eat=${value.can_eat}&not_eat=${value.not_eat}&prevent=${value.prevent}&symptom=${value.symptom}&cause=${value.cause}&treat_detail=${value.treat_detail}`
    });
  };

  const illPie = value => {
    Taro.navigateTo({
      url: `/pages/inquiry/pie/index?data=${JSON.stringify(value)}`
    });
  };

  const other = () => {
    setData([
      ...data,
      {
        name: "intel",
        kind: "none",
        content:
          "欢迎使用指针健康医疗服务平台,您可以在此平台咨询相关健康问题,我们为您提供2种咨询方式,您可以在下面选择",
        select: ["根据症状推断相关疾病", "咨询已知疾病相关情况"]
      }
    ]);
    setDisabled(true);
    goBottom();
  };

  const intelClick = async (key, value) => {
    setData([
      ...data,
      {
        name: "person",
        content: key
      }
    ]);
    goBottom();
    goMessage(value, key);
  };

  return (
    <View className="intel-view">
      <ScrollView
        scrollY
        scrollIntoView={id}
        className="text"
        style={{
          height:
            100 - (18 * info.safeArea.width) / info.safeArea.height + "vh",
          paddingBottom: bottom
        }}
      >
        {data.map((item, index) => {
          return (
            <View
              key={index}
              className="outView"
              style={{
                flexDirection: item.name === "intel" ? "row" : "row-reverse"
              }}
            >
              <View>
                <Image
                  src={item.name === "intel" ? intelUrl : userInfo.avatarUrl}
                ></Image>
              </View>
              <View>
                {item.name == "person" ? (
                  <View>
                    <View
                      className="content"
                      style={{
                        marginLeft: item.name === "intel" ? "2vw" : "15vw"
                      }}
                    >
                      {item.content}
                    </View>
                  </View>
                ) : item.kind == "text" ? (
                  <View>
                    <View
                      className="content"
                      style={{
                        marginLeft: item.name === "intel" ? "2vw" : "15vw"
                      }}
                    >
                      {item.content}
                    </View>
                  </View>
                ) : item.kind == "detail" ? (
                  <>
                    {item.custom.content.map(_item => {
                      return (
                        <View>
                          <View
                            className="content"
                            key={_item}
                            style={{
                              marginLeft: item.name === "intel" ? "2vw" : "15vw"
                            }}
                          >
                            {_item}
                          </View>
                        </View>
                      );
                    })}
                    <View>
                      <View
                        className="select"
                        onClick={() => illDetail(item.custom.detail)}
                      >
                        {item.custom.disease_name}
                      </View>
                    </View>
                  </>
                ) : item.kind == "pie" ? (
                  <>
                    <View>
                      <View
                        className="content"
                        style={{
                          marginLeft: item.name === "intel" ? "2vw" : "15vw"
                        }}
                      >
                        {item.custom.content.map(_item=>{
                          return _item
                        })}
                      </View>
                    </View>
                    <View>
                      <View
                        className="select"
                        onClick={() => illPie(item.custom.detail_list)}
                      >
                        疾病预测
                      </View>
                    </View>
                    <View>
                      <View className="select" onClick={other}>
                        问问其他的
                      </View>
                    </View>
                  </>
                ) : item.kind == "option" ? (
                  <>
                    {item.custom.content.map(_item => {
                      return (
                        <View>
                          <View
                            className="content"
                            key={_item}
                            style={{
                              marginLeft: item.name === "intel" ? "2vw" : "15vw"
                            }}
                          >
                            {_item}
                          </View>
                        </View>
                      );
                    })}
                    {item.custom.option.map(item => {
                      return (
                        <View key={item.value}>
                          <View
                            className="select"
                            onClick={() => intelClick(item.key, item.value)}
                          >
                            {item.key}
                          </View>
                        </View>
                      );
                    })}
                  </>
                ) : item.kind == "none" ? (
                  <>
                    <View
                      className="content"
                      style={{
                        marginLeft: item.name === "intel" ? "2vw" : "15vw"
                      }}
                    >
                      {item.content}
                    </View>
                    {item.select.map((_item, _index) => {
                      return (
                        <View>
                          <View
                            className="select"
                            key={item.content + _index}
                            onClick={() => selectClick(_item, index)}
                          >
                            {_item}
                          </View>
                        </View>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </View>
            </View>
          );
        })}
        <View style={{ height: "2vw" }} id={"low1"}></View>
        <View id={"low2"}></View>
      </ScrollView>
      <View className="footerButton" style={{ bottom: bottom }}>
        <AtInput
          className="input"
          adjustPosition={false} //键盘弹起时，是否自动上推页面
          onBlur={() => setBottom("0")}
          onKeyboardHeightChange={e => isFourceHeight(e)} //键盘高度发生变化的时候触发此事件
          onChange={textChange}
          value={inputValue}
        />
        <AtButton
          className="button"
          disabled={disabled}
          size="small"
          type="primary"
          onClick={summit}
        >
          发送
        </AtButton>
      </View>
    </View>
  );
}
