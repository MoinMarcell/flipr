import axios from "axios";

const BASE_DIR_FLIPR_USER: string = "/api/users/"
const BASE_DIR_SINGLE_FLIPR_USER: string = BASE_DIR_FLIPR_USER + "/user"

const BASE_DIR_FLIPRS: string = "/api/fliprs/"

export function getAllFliprUsers(){
    return axios.get(BASE_DIR_FLIPR_USER)
        .then((response) => response.data);
}

export function getFliprUserByUsername(username: string){
    return axios.get(BASE_DIR_SINGLE_FLIPR_USER + "?username=" + username)
        .then((response) => response.data);
}

export function getFliprUserById(id: string){
    return axios.get(BASE_DIR_SINGLE_FLIPR_USER + "?id=" + id)
        .then((response) => response.data);
}

export function getAllFliprs(){
    return axios.get(BASE_DIR_FLIPRS)
        .then((response) => response.data);
}

export function getFliprById(id: string){
    return axios.get(BASE_DIR_FLIPRS + id)
        .then((response) => response.data);
}

export function deleteFliprById(id: string | undefined){
    return axios.delete("/api/fliprs/" + id)
        .then((response) => response.data);
}