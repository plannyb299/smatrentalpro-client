import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/public/homes/byId/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest.get("/public/homeByPriceAndCity?" + query);
  console.log(postPromise);
  return defer({
    postResponse: postPromise,
  });
};


export const clientProfilePageLoader = async (args) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = userData ? userData.user_id : null;
  return profilePageLoader({ userId });
};

export const profilePageLoader = async ({ userId }) => {
  if (!userId) {
    throw new Error("User ID is not available");
  }

  const postPromise = apiRequest(`/host/bookedHomes/${userId}`);
  console.log(postPromise)
  return defer({
    postResponse: postPromise,
  });
};

export const userProfileLoader = async ({ request, params }) => {
  const username = localStorage.getItem('refresh_token');
  const postPromise = apiRequest(`/host/bookedHomes/?userId=${params.id}`);
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
