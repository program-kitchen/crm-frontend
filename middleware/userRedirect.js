import { USER_ROLE } from '~/plugins/const.js';
import { MSG_ERR_FORBIDDEN } from '~/plugins/messages.js';

// ユーザー登録関連はバックオフィス以上のみアクセス可能
// それ以外の権限の人はトップページへリダイレクトさせる
// オーナー：4,管理者；3,バックオフィス：2
export default function({ redirect, $auth, route }) {
  const role = $auth.user.role;
  const path = route.path;
  const canPathUser = [
    USER_ROLE.backOffice.code,
    USER_ROLE.admin.code,
    USER_ROLE.owner.code,
  ];
  if (canPathUser.includes(role)) {
    return;
  } else {
    window.alert(MSG_ERR_FORBIDDEN);
    redirect('/');
  }
}
