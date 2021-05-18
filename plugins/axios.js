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
      if ([401, 422].includes(code)) {
        return;
      }
    }
    if (code === 422) {
      window.alert("予期せぬエラーが発生しました");
      redirect("/");
    } else if ([404, 405, 500].includes(code)) {
      redirect("/error");
    } else if (code === 403) {
      redirect("/");
    } else {
      error = "アクセストークンが失効しています";
    }
  });
}
