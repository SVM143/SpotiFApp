import React from "react";
import { Body, Container, Drawer, Header, Icon, Left, Right, Tab, TabHeading, Tabs, Text, Button } from "native-base";
import { BackHandler, Image, StatusBar, ToastAndroid, TouchableOpacity, View, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
// import TrendingHashtags from "./TrendingHashTags";

var backButtonPressedOnceToExit = false;
import Timeline from './Timeline'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };

  handleBackButtonClick() {
    if (backButtonPressedOnceToExit) {
      BackHandler.exitApp();
    } else {
      if (Actions.currentScene !== "Home") {
        backButtonPressedOnceToExit = false;
        Actions.pop();
        return true;
      } else {
        backButtonPressedOnceToExit = true;
        ToastAndroid.show(
          "Press Back Button again to exit",
          ToastAndroid.SHORT
        );
        setTimeout(() => {
          backButtonPressedOnceToExit = false;
        }, 2000);
        return true;
      }
    }
  };
  render() {
    return (
        <Container>
          <Header style={{ backgroundColor: "#455a64", height: 40 }}>
            <StatusBar
              backgroundColor="#455a64"
              barStyle="light-content"
              translucent={false}
            />
            <Left/>
            <Body/>
            <Right style={{ height: "70%", alignItems: "center" }}>
              <TouchableOpacity
                transparent
                onPress={() => {
                 
                }}
                style={{ width: "40%", alignItems: "flex-end", height: "70%" }}
              >
                <Image
                  source={require("../assets/images/search.png")}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
            </Right>
          </Header>
          {/* <TrendingHashtags/> */}
          <Timeline screen="home"/>
        </Container>
    );
  }
}
const styles = StyleSheet.create({
  tabHeadingText: {
    color: "white",
    fontSize: 25,
    fontFamily: "ProximaNova-Regular"
  },
  tabContentBox: {
    flexDirection: "column",
    alignItems: 'center'
  },
  inactiveTab: {
    width: 18,
    height: 18,
    tintColor: '#a6a6a6',
    borderWidth: 1
  },
  activeTab: {
    width: 20,
    height: 20,
    tintColor: "#455a64",
    borderWidth: 1.2
  },
  touchables: {
    backgroundColor: 'white',
    flex: 1,
    height: 50,
    justifyContent: 'center'
  }
});
export default (Home);
