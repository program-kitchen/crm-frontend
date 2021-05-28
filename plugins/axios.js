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
    if (path.match(/.*(\/login)/) &&
        (code == HTTP_UNAUTHORIZED ||
         code == HTTP_UNPROCESSABLE_ENTITY)
    ) {
      return;
    }

    if (code == HTTP_BAD_REQUEST ||
        code == HTTP_UNPROCESSABLE_ENTITY) {
      // 400、422エラーの場合
      window.alert(error.response.data["errorMsg"]);
      return;
    } else if (code == HTTP_UNAUTHORIZED) {
      // 401エラーの場合
      window.alert(MSG_ERR_UNPROCESSABLE);
      redirect("/login");
    } else if (code == HTTP_FORBIDDEN) {
      // 403エラーの場合
      window.alert(MSG_ERR_FORBIDDEN);
      redirect("/");
    } else {
      // 上記以外のHTTPステータスコードは例外エラー画面へ
      redirect("/error");
    }
  });
}
