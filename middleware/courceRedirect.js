// コース関連は管理者以上のみアクセス可能
// それ以外の権限の人はトップページへリダイレクトさせる
// オーナー：4,管理者；3
export default function ({ redirect, $auth }) {
  const role = $auth.user.role
  const canPathUser = [4, 3];
  if (canPathUser.includes(role)) {
    return
  } else {
    redirect('/');
  }
}