import React, { Component } from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Actions } from "react-native-router-flux";
import {getNewRelease} from '../ApiFetch/accountActions'
import { connect } from "react-redux";
class TrendingHashTags extends Component {
  componentDidMount(){
    this.props.getNewRelease()
  }
  loadTrendingHashTagMurmur = (item) => {
    Actions.HashTag({
      hashTag: item.split("#")[1],
      screen: 'hashtag'
    })
  }

  /**
   * Get random Colors for the trending HashTags
   */
  getRandomColor() {
    let randomIndex = Math.floor(Math.random() * this.randomColorArray.length);
    let randomColor = this.randomColorArray[randomIndex];
    return randomColor;
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.trendingHashTags}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item._id + index.toString()}
        //   renderItem={({ item }) => (
        //     <TouchableOpacity
        //       onPress={() => this.loadTrendingHashTagMurmur(item)}
        //     >
        //       <Badge style={styles.badgeStyle}>
        //         <Text style={[styles.textStyle, { color: this.getRandomColor() }]}>
        //           {item}
        //         </Text>
        //       </Badge>
        //     </TouchableOpacity>
        //   )
        //  }
        />
      </View>
    );
  };
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F4',
    height: 40
  },
  badgeStyle: {
    marginTop: 5,
    height: 30,
    paddingRight: 15,
    paddingLeft: 15,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#fff',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontFamily: 'ProximaNova-Regular'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    getNewRelease: () =>{
      dispatch(getNewRelease());
    },
  }
};
export default connect(
  null,
  mapDispatchToProps
)(TrendingHashTags);

