import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Picker,
  Input,
  Textarea
} from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import "./index.scss";

export default function index() {
  let [problemType, setProblemType] = useState();
  let [problemContent, setProblemContent] = useState();
  let [problemEmail, setProblemEmail] = useState();
  let [problemPhone, setProblemPhone] = useState();

  let allType = ["系统问题", "数据问题"];

  const typeChange = type => {
    setProblemType(allType[type.detail.value]);
  };

  const contentChange = content => {
    setProblemContent(content);
  };

  const emailChange = email => {
    setProblemEmail(email);
  };

  const phoneChange = email => {
    setProblemPhone(email);
  };
  const summit = () => {
    if (problemType && problemContent && problemEmail && problemPhone) {
      wx.showToast({
        title: "感谢您的反馈，我们会及时进行处理",
        icon: "none",
        duration: 1500
      });
    } else {
      wx.showToast({
        title: "请完成反馈信息",
        icon: "error",
        duration: 1500
      });
    }
  };
  return (
    <View className="feedback-view">
      <Text className="title">请填写反馈信息</Text>
      <Picker mode="selector" range={allType} onChange={typeChange}>
        <View className="out-view">
          <View className="left-title">问题类型</View>
          <View
            className="right-content"
            style={{
              color:
                problemType === "请选择问题类型"
                  ? "rgb(112, 112, 112)"
                  : "rgb(80, 77, 77)"
            }}
          >
            {problemType}
          </View>
        </View>
      </Picker>
      <View className="hr"></View>

      <View
        className="out-view"
        style={{ height: "33vw", alignItems: "normal" }}
      >
        <View className="left-title" style={{ marginTop: "3.5vw" }}>
          问题描述
        </View>
        <Textarea
          className="textarea"
          onBlur={e => contentChange(e.target.value)}
          maxlength={100}
          placeholder="请描述您的问题"
          style={{ marginTop: "4vw" }}
        ></Textarea>
      </View>
      <View className="hr"></View>

      <View className="out-view">
        <View className="left-title">联系邮箱</View>
        <Input
          onBlur={e => emailChange(e.target.value)}
          placeholder="请输入您的联系邮箱"
          className="right-content"
          style={{ marginTop: "0.8vw" }}
        ></Input>
      </View>
      <View className="hr"></View>

      <View className="out-view">
        <View className="left-title">手机号码</View>
        <Input
          type="tel"
          maxlength={11}
          onBlur={e => phoneChange(e.target.value)}
          placeholder="请输入您的手机号码"
          className="right-content"
          style={{ marginTop: "0.8vw" }}
        ></Input>
      </View>
      <View className="hr"></View>
      <View className="summit" onClick={summit}>
        提交
      </View>
    </View>
  );
}
