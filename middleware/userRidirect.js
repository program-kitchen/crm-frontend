
export default function ({ redirect, $auth }) {
  const role = $auth.user.role
  const canPathUser = [4, 3, 2];
  if (canPathUser.includes(role)) {
    return
  } else {
    redirect('/');
  }
}