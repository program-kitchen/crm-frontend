import {
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
  HTTP_FORBIDDEN,
  HTTP_NOT_FOUND,
  HTTP_METHOD_NOT_ALLOWED,
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_INTERNAL_SERVER_ERROR,
} from './const.js';
import {
  MSG_ERR_UNAUTHORIZED,
  MSG_ERR_FORBIDDEN,
  MSG_ERR_UNPROCESSABLE,
} from './messages.js';

// レスポンスエラーコード毎の対応処理を追加
export default function({ $axios, redirect, route }) {
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    const path = route.path;
    //ログイン時のエラーハンドリング
    if (path.match(/.*(\/login)/)) {
      if ([
        HTTP_UNAUTHORIZED,
        HTTP_UNPROCESSABLE_ENTITY
      ].includes(code)) {
        return;
      }
    }
    if (code === HTTP_UNPROCESSABLE_ENTITY ||
        code === HTTP_BAD_REQUEST) {
      window.alert(error["errorMsg"]);
    } else if (code === HTTP_FORBIDDEN) {
      window.alert(MSG_ERR_FORBIDDEN);
      redirect("/");
    } else if (code === HTTP_UNAUTHORIZED) {
      window.alert(MSG_ERR_UNPROCESSABLE);
      redirect("/login");
    } else {
      redirect("/error");
    }
  });
}
