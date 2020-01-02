// export const spotifyCredentials = {
//     clientId: '9a08dd53b6ab495d8be82570cd337ba4',
//     clientSecret: '4526c53612ed48539e66a3f133950b33',
//     redirectUri: 'Your Redirect URI'
// }

const apiPrefix = 'https://accounts.spotify.com/api';
const base64credentials = 'OGNmNTM4MGY1ODhjNGVhMTg4NDk2ZTI1NGVkNjM3NjA6MjZjZjkxMTg2ZDdlNDBhMWI1ZmVlY2Y0NDlmNzk4MWI=';

export default  async () => {
  console.log('token begin');
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
  console.log('token is', newToken);
  return newToken;
}