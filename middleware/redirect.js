export default function ({ route, redirect }) {
  const role = 'オーナー'; // storeからデータを取得するようにする
  const canPathUser = ['オーナー', '管理者'];
  if (canPathUser.includes(role)) {
    return
  } else {
    redirect('/');
  }
}