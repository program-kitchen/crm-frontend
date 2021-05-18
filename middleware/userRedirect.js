// ユーザー登録関連はバックオフィス以上のみアクセス可能
// それ以外の権限の人はトップページへリダイレクトさせる
// オーナー：4,管理者；3,バックオフィス：2
export default function({ redirect, $auth, route }) {
  const role = $auth.user.role;
  const path = route.path;
  const canPathUser = [4, 3, 2];
  if (canPathUser.includes(role)) {
    return;
  } else {
    //オーナーが編集画面に直接アクセスしようとした場合はエラー画面へ遷移
    if (path.match(/.*(\/user\/).*(\/edit)/)) {
      redirect("/error");
    } else {
      redirect("/");
    }
  }
}
