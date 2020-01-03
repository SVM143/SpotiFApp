import {Body, CardItem } from "native-base";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import renderIf from "./renderif";
import FastImage from "react-native-fast-image";
import {Constants} from "../../utils/constants"
export class ArtistPreivew extends React.Component {
    constructor(props) {
        super(props)
        this.state={
          url:  (this.props.previewLink && this.props.previewLink.album && this.props.previewLink.album.images 
                  && 
                  this.props.previewLink.album.images[0] 
                  && 
                  this.props.previewLink.album.images[0].url)
                 || 
                  Constants.placeholderUrl
        }
    }
    render() {
        return (
        <View style={{flex:1}}>
          <TouchableOpacity 
          style={{ paddingLeft: 10, paddingRight: 10, 
          paddingBottom: 2, height: 90, width: "100%"}}
          onPress={() => {
         }}
          >
          <CardItem style={{
              height: 90,
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
                        // Actions.HashTag({
                        //   hashTag: this.props.previewLink.id,
                        //   screen: this.props.screen == 'hashtag'?'playList':'hashtag',
                        //   headerName: this.props.previewLink.name.trim()
                        // })
                        // duration_ms
                        // popularity
                        // name
                    }}
                  >
                    {renderIf(this.props.previewLink && this.props.previewLink.artists && this.props.previewLink.artists[0].name,
                        <Text
                            style={{
                            flex: 1,
                            fontSize: 15,
                            fontFamily: "ProximaNova-Regular",
                            }}
                            numberOfLines={2}
                        >
                            {this.props.previewLink.artists[0].name && this.props.previewLink.artists[0].name.trim()}
                        </Text>
                      )} 
                      {renderIf(this.props.previewLink && this.props.previewLink.name,
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 15,
                                fontFamily: "ProximaNova-Regular",
                              }}
                              numberOfLines={2}
                            >
                              {this.props.previewLink.name && this.props.previewLink.name.trim()}
                            </Text>
                        )} 
                        <View style={{flexDirection:'row'}}>
                        {renderIf(this.props.previewLink && this.props.previewLink.duration_ms,
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 13,
                                fontFamily: "ProximaNova-Regular",
                              }}
                              numberOfLines={2}
                            >
                              Duration: {Math.floor(this.props.previewLink.duration_ms / 3600)} mins
                            </Text>
                        )}
                        <Image source={require('../../assets/images/like.png')} resizeMode="contain" style={{ width: 15, height: 15 }} />
                        <Text
                            style={{
                            flex: 1,
                            fontSize: 10,
                            paddingLeft:8,
                            fontFamily: "ProximaNova-Regular",
                            }}
                            numberOfLines={2}
                        >
                            {this.props.previewLink.popularity || 0} %
                        </Text>
                        </View> 
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
