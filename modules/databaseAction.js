const IP = process.env.EXPO_PUBLIC_IP;
const port = process.env.EXPO_PUBLIC_PORT;
import { updateLikedStories } from "../reducers/stories";
import { updateRecentlyPlayed } from "../reducers/users";

export async function likeStory(story, token, dispatch) {
  const body = {
    token: token,
    storyId: story._Id,
  };
  try {
    const response = await fetch(`http://${IP}:${port}/stories/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("data", data);
    dispatch(updateLikedStories(story));
  } catch (error) {
    console.log("errorFromFetchlikeStory", error.message);
  }
}

export async function updateStoryCountAndRecentlyPlayed(token, story, dispatch) {
  console.log({ token });
  console.log({ story });
  const body = {
    token: token,
    storyId: story._id,
  };
  try {
    const response = await fetch(`http://${IP}:${port}/stories/play`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("data", data);
    dispatch(updateRecentlyPlayed(story));
  } catch (error) {
    console.log("error from updateStoryCountAndRecentlyPlayed", error.message);
  }
}
