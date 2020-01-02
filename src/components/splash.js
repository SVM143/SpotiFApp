import React from "react";
import {  View, Image, Dimensions, StatusBar, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import Store from "../config/storage"
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
import {getAllData,setLocation} from "../ApiFetch/accountActions"
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';



const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width,
    height
  }
};

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      account_Details:undefined,
      user_Details:undefined
    }
    //console.log("this.props.data", this.props.data)
  }
  
  componentDidMount(){
    Geolocation.getCurrentPosition(
      position => {
       setLocation(position)
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
      setTimeout(() => {
      // this.state.account_Details && this.state.user_Details ? Actions.Home() : 
      // this.state.account_Details ? Actions.ProfileUpload() : Actions.login()
      Actions.Home();
      },2000)
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#455a64" barStyle="light-content" translucent={false} />
        <View>
          <Image
            source={require("../assets/images/recruit.jpg")}
            style={{ height: height, width: width }}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  }
}

export default (Splash);
