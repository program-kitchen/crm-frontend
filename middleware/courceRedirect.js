import { USER_ROLE } from '~/plugins/const.js';
import { MSG_ERR_FORBIDDEN } from '~/plugins/messages.js';

// コース関連は管理者以上のみアクセス可能
// それ以外の権限の人はトップページへリダイレクトさせる
// オーナー：4,管理者；3
export default function ({ redirect, $auth }) {
  const role = $auth.user.role
  const canPathUser = [
    USER_ROLE.admin.code,
    USER_ROLE.owner.code,
  ];
  if (canPathUser.includes(role)) {
    return
  } else {
    window.alert(MSG_ERR_FORBIDDEN);
    redirect('/');
  }
}