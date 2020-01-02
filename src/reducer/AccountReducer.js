let account = {
  timeLineFeed: [],
  categoryList:[],
  playList:[]
};
const accountReducer = (state = account, action) => {
  console.log("actions",action.payload)
  switch (action.type) {
    case "NEWS_FEED":
      state = {
        ...state,
        timeLineFeed:state.timeLineFeed.concat(action.payload)
      };
      break;
    case "LIST_CAT":
      state = {
        ...state,
        categoryList:state.categoryList.concat(action.payload)
      };
      break;
    case "PLAYLIST":
      state = {
        ...state,
        playList:state.playList.concat(action.payload)
      };
      break;
    default:
  }
  return state;
};

export default accountReducer;
