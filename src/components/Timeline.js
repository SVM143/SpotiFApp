import { Container } from "native-base";
import React, { Component } from "react";
import {FlatList, View , ActivityIndicator,StyleSheet ,  Text } from "react-native";
import {NewsPreview} from "./sharedComponents/NewsPreview"
import {ArtistPreivew} from "./sharedComponents/ArtistPreview"
import {getNews,getCategoriesList,getPlayList} from "../ApiFetch/accountActions"
import {connect} from "react-redux";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state={
      loader:false,
      data:[],
      refreshing:false,
      offset:0
    }
  }

  componentDidMount(){
    if(this.props.screen == "home") 
        this.props.getNews();
    else if(this.props.screen == "hashtag")
        this.props.getCategoriesList(this.props.hashTag);
    else 
        this.props.getPlayList(this.props.hashTag);
  }

  lazyLoading(){
    if(this.props.screen == "home") 
    this.props.getNews(this.state.offset+1);
    else if(this.props.screen == "hashtag")
    this.props.getCategoriesList(this.props.hashTag,this.state.offset+1);
    else 
    this.props.getPlayList(this.props.hashTag,this.state.offset+1);
    this.setState({offset:this.state.offset+1})
  }
  componentWillReceiveProps(props){
    this.getData(props);
  }
  // static getDerivedStateFromProps(props, prevState) {
  // if(props.screen == "home" && props.timeLineFeed)
  // return {loader:true,data:props.timeLineFeed}
  // else if(props.screen == "hashtag" && props.categoryList)
  // return {loader:true,data:props.categoryList}
  // else 
  // return {loader:true,data:props.playList}
  // }

  onRefresh() {
    this.setState({ refreshing: true, offset: 0 });
    this.getData(this.props);
    this.setState({ refreshing: false });
  }

  getData(props){
  if(props.screen == "home" && props.timeLineFeed)
      this.setState({loader:true,data:props.timeLineFeed})
  else if(props.screen == "hashtag" && props.categoryList)
      this.setState({loader:true,data:props.categoryList})
  else 
      this.setState({loader:true,data:props.playList})
  }
  renderItem = ({ item, index }) => (
    this.props.screen == "playList"?
    <ArtistPreivew previewLink={item.track} screen={this.props.screen} />:
    <NewsPreview previewLink={item} screen={this.props.screen} />
  );

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 12,
          width: "86%",
        }}
      />
    );
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#f2f2f4", paddingTop: 0 }}>
        <View style={{ paddingTop: 10, flex: 1 }}>
          {this.state.loader?
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardDismissMode="on-drag"
              extraData={this.state}
              data={this.state.data}
              refreshing={this.state.refreshing}
              renderItem={this.renderItem}
              onEndReachedThreshold={0.7}
              windowSize={61}
              onRefresh={() => this.onRefresh()}
              onEndReached={() => this.lazyLoading()}
              ItemSeparatorComponent={this.renderSeparator}
            />
            :
            <View style={styles.MainContainer}>
            <ActivityIndicator size="large" color="#876eff" />
            <Text
              style={{
                textAlign: "center",
                fontFamily: "ProximaNova-Regular",
                color: "#bfbac0"
              }}
            >
              Loading Albums ...
            </Text>
          </View>
            }
       
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
const mapDispatchToProps = dispatch => {
  return {
    getNews: (data) =>{
      dispatch(getNews(data));
    },
    getCategoriesList:(id,value)=>{
      dispatch(getCategoriesList(id,value))
    },
    getPlayList:(id,value)=>{
      dispatch(getPlayList(id,value))
    }
  }
};

const mapStateToProps = (state) => {
  return {
    timeLineFeed: state.accountData.timeLineFeed,
    playList:state.accountData.playList,
    categoryList:state.accountData.categoryList
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
