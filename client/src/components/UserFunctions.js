import { useStateValue } from "../Context/StateProvider";
import { actionTypes } from "../Context/reducer";


export async function fetchAPI(data, url, method) {
  const respones = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((e) => console.log("Error : ", e));

  return respones;
}
export function isLoggedIn()
{
  const token = window.localStorage.customer_token;
  //console.log(token);
  return (token != undefined);
}
export  function loggedOut()
{
  window.localStorage.clear();
}