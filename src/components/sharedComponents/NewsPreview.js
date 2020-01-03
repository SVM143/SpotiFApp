import {Body, CardItem } from "native-base";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import renderIf from "./renderif";
import FastImage from "react-native-fast-image";
import {Constants} from "../../utils/constants"
import { Actions } from "react-native-router-flux";
export class NewsPreview extends React.Component {
    constructor(props) {
        super(props)
        this.state={
          url: (this.props.previewLink.icons 
                && 
                this.props.previewLink.icons[0] 
                && 
                this.props.previewLink.icons[0].url)
                ||
                (this.props.previewLink.images 
                  && 
                  this.props.previewLink.images[0] 
                  && 
                  this.props.previewLink.images[0].url)
                 || 
                Constants.placeholderUrl
        }
    }
    render() {
        return (
        <View style={{flex:1}}>
          <TouchableOpacity 
          style={{ paddingLeft: 10, paddingRight: 10, 
          paddingBottom: 2, height: 80, width: "100%"}}
          onPress={() => {
            // this.props.previewLink.url? openCustomTab(this.props.previewLink.url):null
         }}
          >
          <CardItem style={{
              height: 80,
              width:'100%',
              borderWidth: 0.3,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              overflow: 'hidden',
              paddingLeft: 0,
              paddingBottom: 0,
              paddingTop: 0,
              paddingRight: 0,
              marginTop:0,
              marginBottom:0,
              borderColor: '#bdb9c1',
              backgroundColor:"#ececec"
          }}>
              <Body style={{flexDirection:'row',flex:1}}>
                <TouchableOpacity
                    style={{height: 80, flex: 0.7, justifyContent: 'space-around', paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 0}}
                    onPress={() => {
                        Actions.HashTag({
                          hashTag: this.props.previewLink.id,
                          screen: this.props.screen == 'hashtag'?'playList':'hashtag',
                          headerName: this.props.previewLink.name.trim()
                        })
                    }}
                  >

                      {renderIf(this.props.previewLink.name,
                            <Text
                              style={{
                                flex: 2,
                                fontSize: 17,
                                fontFamily: "ProximaNova-Regular",
                              }}
                              numberOfLines={2}
                            >
                              {this.props.previewLink.name && this.props.previewLink.name.trim()}
                            </Text>
                        )} 
                        {renderIf(this.props.previewLink.description,
                          <Text
                            style={{
                              flex:2,
                              fontSize: 12,
                              fontFamily: "ProximaNova-Semibold",
                              color: "blue",
                            }}
                            numberOfLines={2}
                          >
                            {this.props.previewLink.description}
                          </Text>
                          )
                        }

                      {/* <Text
                        style={{
                          flex:1,
                          fontSize: 12,
                          fontFamily: "ProximaNova-Regular",
                          color: '#313131'
                        }}
                        numberOfLines={1}
                      >
                        {this.props.previewLink.author}
                      </Text> */}
                  </TouchableOpacity>
                      <View style={{height: 80, padding: 0, flex:0.3, marginLeft: 0, marginRight: 0,backgroundColor:"white" }}>
                      <FastImage
                        source={{uri: this.state.url}}
                        style={{height:80}}
                      />
                    </View>
              </Body>
          </CardItem>
      </TouchableOpacity>
      </View>
      )
    }

}
