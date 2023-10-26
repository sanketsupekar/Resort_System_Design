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

export async function fetchGetAPI(url) {
  const respones = await fetch(url).catch((e) => console.log("Error : ", e));

  return respones;
}
export function isLoggedIn() {
  const token = window.localStorage.customer_token;
  //console.log(token);
  return token != undefined;
}
export function loggedOut() {
  window.localStorage.clear();
}
export const displayIcon = (name) => {
  switch (name) {
    case "breakfast":
      return "fas fa-concierge-bell";
    case "king bed":
      return "fas fa-bed";
    case "24/7 room service":
      return "fas fa-luggage-cart";
    case "bath":
      return "fas fa-bath";
    case "shower":
      return "fas fa-shower";
    case "sitting area":
      return "fas fa-couch";
    case "cofee/tea":
      return "fas fa-coffee";
    case "tv":
      return "fas fa-tv";
    case "swimming":
      return "fas fa-swimmer";
    case "cricket":
      return "fas fa-cricket";
    default:
      return "";
  }
};

export const amenitiesImage = (name) => {
  switch (name) {
    case "breakfast":
      return "amenity_breakfast.jpg";
    case "king bed":
      return "amenity_king_bed.jpg";
    case "24/7 room service":
      return "amenity_room_service.jpg";
    case "bath":
      return "amenity_bath.jpg";
    case "shower":
      return "amenity_shower.jpg";
    case "sitting area":
      return "amenity_seating_area.jpg";
    case "cofee/tea":
      return "amenity_tea.jpg";
    case "tv":
      return "amenity_tv.jpg";
    case "swimming":
      return "amenity_swimming.jpg";
    case "cricket":
      return "amenity_cricket.jpg";
    default:
      return "";
  }
};
