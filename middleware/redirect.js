export default function ({ route, redirect }) {
  const role = 'オーナー';
  const canPathUser = ['オーナー', '管理者'];
  if (canPathUser.includes(role)) {
    return
  } else {
    redirect('/');
  }
}