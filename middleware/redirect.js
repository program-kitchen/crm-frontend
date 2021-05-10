export default function ({ route, redirect }) {
  // console.log(this.$auth.user);
  // console.log(this.$store.state.cource);
  const role = 'オーナー'; // storeからデータを取得するようにする
  const canPathUser = ['オーナー', '管理者'];
  if (canPathUser.includes(role)) {
    return
  } else {
    redirect('/');
  }
}