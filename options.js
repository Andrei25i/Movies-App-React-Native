import Constants from "expo-constants";
const API_KEY = Constants.expoConfig.extra.API_KEY;

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};