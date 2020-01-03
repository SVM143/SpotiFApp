import React from "react";
import {
  StatusBar,
  Image
} from "react-native";
import {
  Container,
  // Tabs,
  // Tab,
  // TabHeading,
  Header,
  Left,
  Body,
  Right,
  // Title,
  Content,
  // Footer,
  // FooterTab,
  Button,
  Icon,
  Text,
  // List,
  // ListItem,
  // Switch,
  // Item,
  // Input,
  // Form,
  // DeckSwiper,
  Card,
  CardItem,
  // Thumbnail,
  View,
  Footer
} from "native-base";
import { Actions } from "react-native-router-flux";
import TimeLine from "./Timeline";
import {clearGetPlayList,clearGetCategoriesList} from '../ApiFetch/accountActions'
import { connect } from "react-redux";
class HashTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  back=()=>{
    this.props.screen == "playList"?
    this.props.clearGetPlayList():
    this.props.clearGetCategoriesList()
    Actions.pop()
  }
  render() {
      return (
        <Container style={{  backgroundColor: "#f2f2f4" }}>
          <Header style={{ backgroundColor: "#455a64" }}>
            <StatusBar backgroundColor="#455a64" barStyle="light-content" />
            <View style={{flex:1,flexDirection:"row",}}>
            <View style={{flex:0.1}}>
                <Button transparent style={{alignContent:"flex-start"}}onPress={() => this.back()}>
                    <Image source={require('../assets/images/back-arrow.png')} resizeMode="contain" style={{ width: 25, height: 25 }} />
                </Button>
            </View>
            <View style={{flex:0.8,justifyContent:"center",alignContent:"center",alignItems:"center"}}>
                <Text style={{ color: 'white', fontSize: 18, fontFamily: 'ProximaNova-Bold', lineHeight: 22}}>
                    {this.props.headerName}
                </Text>
            </View>
          </View>
          </Header>
          <View style={{ paddingTop: 0, flex: 1 }}>
            <TimeLine screen={this.props.screen} hashTag={this.props.hashTag}/>
          </View>
        </Container>
      )
  }
}
const mapDispatchToProps = dispatch => {
  return {
   clearGetPlayList: () =>{
      dispatch(clearGetPlayList());
    },
  clearGetCategoriesList  :()=>{
    dispatch(clearGetCategoriesList())
   } 
  }
};
export default connect(
  null,
  mapDispatchToProps
)(HashTag);
