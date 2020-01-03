let account = {
  timeLineFeed: [],
  categoryList:[],
  playList:[],
  recommendation:[]
};
const accountReducer = (state = account, action) => {
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
        categoryList:!action.payload?[]:state.categoryList.concat(action.payload)
      };
      break;
    case "PLAYLIST":
      state = {
        ...state,
        playList:!action.payload?[]:state.playList.concat(action.payload)
      };
      break;
    case "RECOMMENDATION":
      state = {
        ...state,
        recommendation:action.payload
      };
        break;
    default:
  }
  return state;
};

export default accountReducer;
