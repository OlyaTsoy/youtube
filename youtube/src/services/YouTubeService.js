import axios from "axios";

// const apiKey = "AIzaSyCX-gdg6dXPNFUfTBu9Qvrrs-n-sCFLdv8";
const apiKey = 'AIzaSyCDWzret-XYX2SizNrWFiRg-1jVKF9o2-g';

const YouTubeService = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/search",
  params: {
    part: "snippet",
    key: apiKey,
    type: "video",
  },
});

export default YouTubeService;
