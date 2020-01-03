// import Store from "../config/storage";
import Geocoder from 'react-native-geocoder';
const apiPrefix = 'https://accounts.spotify.com/api';
const base64credentials = 'OGNmNTM4MGY1ODhjNGVhMTg4NDk2ZTI1NGVkNjM3NjA6MjZjZjkxMTg2ZDdlNDBhMWI1ZmVlY2Y0NDlmNzk4MWI=';
let location="US";

export async function setLocation(position) {
      let NY = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      await Geocoder.geocodePosition(NY).then(res => {
        location = res && res[0] && res[0].countryCode || "US"
      })
      .catch(err => console.log(err))
}

  export async function getNews(offset) {
    const uri = `https://api.spotify.com/v1/browse/categories?country=${location}&offset=${offset * 20 || 0}&limit=20`;
    return async dispatch =>{
    fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      }
    }).then(response => response.json())
    .then(responseJson => {
    if (responseJson && responseJson.categories.items) 
        dispatch({
          payload: responseJson.categories.items,
          type: "NEWS_FEED"
        });
    else 
        dispatch({
          payload: [],
          type: "NEWS_FEED"
        });
    })
    .catch((err)=>{
      console.log(err)
      dispatch({
        payload: [],
        type: "NEWS_FEED"
      });
    })
    }
  }
 
 export async function clearGetPlayList(){
  return async dispatch =>{
    dispatch({
      payload:undefined,
      type: "PLAYLIST"
    });
  }
 }

 export async function clearGetCategoriesList(){
  return async dispatch =>{
    dispatch({
      payload:undefined,
      type: "LIST_CAT"
    });
  }
 }

 export async function getCategoriesList(type,offset){
  const uri = `https://api.spotify.com/v1/browse/categories/${type}/playlists?${location}&offset=${offset * 20|| 0}&limit=20`
  return async dispatch =>{
  fetch(uri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    }
  }).then(response => response.json())
  .then(responseJson => {
  if (responseJson && responseJson.playlists.items) 
      dispatch({
        payload: responseJson.playlists.items,
        type: "LIST_CAT"
      });
  else 
      dispatch({
        payload: [],
        type: "LIST_CAT"
      });
    })
    .catch((err)=>{
      dispatch({
        payload: [],
        type: "LIST_CAT"
      });
    })
  }
 }

 export async function getPlayList(type,offset){
 const uri = `https://api.spotify.com/v1/playlists/${type}/tracks?country=${location}&offset=${offset * 20 || 0}&limit=20`
 return async dispatch =>{
 fetch(uri, {
   method: 'GET',
   headers: {
     Authorization: `Bearer ${await getToken()}`,
   }
 }).then(response => response.json())
 .then(responseJson => {
 if (responseJson && responseJson.items) 
     dispatch({
       payload: responseJson.items,
       type: "PLAYLIST"
     });
 else 
     dispatch({
       payload: [],
       type: "PLAYLIST"
     });
   })
   .catch((err)=>{
    dispatch({
      payload: [],
      type: "PLAYLIST"
    });
  })
 }
}

export async function getToken(){
  const res = await fetch(`${apiPrefix}/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const json = await res.json();
  const newToken = json.access_token;
  return newToken;
}

export async function getNewRelease(){
  const uri = `"https://api.spotify.com/v1/browse/new-releases?country=${location}`
 return async dispatch =>{
 fetch(uri, {
   method: 'GET',
   headers: {
     Authorization: `Bearer ${await getToken()}`,
   }
 }).then(response => response.json())
 .then(responseJson => {
 if (responseJson && responseJson.items) 
     dispatch({
       payload: responseJson.items,
       type: "RECOMMENDATION"
     });
 else 
     dispatch({
       payload: [],
       type: "RECOMMENDATION"
     });
   })
   .catch((err)=>{
    dispatch({
      payload: [],
      type: "RECOMMENDATION"
    });
  })
 }
}