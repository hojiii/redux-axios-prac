import axios from "axios";

const instance = axios.create({
  //어떤 기본 url을 달고 호출할것이냐
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1,
})

instance.interceptors.request.use(
  //요청을 보내기 전 수행되는 함수
  function(config){
    console.log('인터셉터 요청성공');
    return config;
  },
  //우류 요청을 보내기 전 수행되는 함수
  function(error){
    console.log('언터셉터 요청 오류!');
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(

  //응답을 내보내기 전 수행되는 함수
  function(response){
    console.log("인터셉터 응답 받았습니다.");
    return response
  },
  //오류응답을 내보내기 전 수행되는 함수
  function(error){
    console.log("인터셉터 응답 오류 발생")
    return Promise.reject(error)
  },
)

export default instance