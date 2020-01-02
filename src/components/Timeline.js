import { Container } from "native-base";
import React, { Component } from "react";
import {FlatList, View , ActivityIndicator,StyleSheet ,  Text } from "react-native";
import {NewsPreview} from "./sharedComponents/NewsPreview"
import {getNews,getLikes,getBookMarks,getProfile,getCategoriesList,getPlayList} from "../ApiFetch/accountActions"
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
        this.props.getPlayList();
  }

  lazyLoading(){
    if(this.props.screen == "home") 
    this.props.getNews(this.offset+1);
    else if(this.props.screen == "hashtag")
    this.props.getCategoriesList(this.props.hashTag,this.offset+1);
    else 
    this.props.getPlayList(id,this.offset+1);
    this.setState({offset:this.offset+1})
  }
  // componentWillReceiveProps(props){
  //   this.getData(props);
  // }
  static getDerivedStateFromProps(props, prevState) {
  if(props.screen == "home" && props.timeLineFeed)
  return {loader:true,data:props.timeLineFeed}
  else if(props.screen == "hashtag" && props.categoryList)
  return {loader:true,data:props.categoryList}
  else 
  return {loader:true,data:props.profileData}
  }

  onRefresh() {
    this.setState({ refreshing: true, offset: 0 });
    this.getData(this.props);
    this.setState({ refreshing: false });
  }

  getData(props){
  if(props.screen == "home" && props.timeLineFeed)
      this.setState({loader:true,data:props.timeLineFeed})
  else if(props.screen == "like" && props.likedData)
      this.setState({loader:true,data:props.likedData})
  else if(props.screen == "bookMark" && props.bookMarkData)
      this.setState({loader:true,data:props.bookMarkData})
  else if(props.screen == "hashtag" && props.hashTagFeed)
      this.setState({loader:true,data:props.hashTagFeed})
  else 
      this.setState({loader:true,data:props.profileData})
  }
  renderItem = ({ item, index }) => (
   <NewsPreview previewLink={item} />
  );

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 12,
          width: "86%",
          // backgroundColor: "#CED0CE",
          // marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#f2f2f4", paddingTop: 0 }}>
        <View style={{ paddingTop: 0, flex: 1 }}>
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
  console.log("state",state)
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
