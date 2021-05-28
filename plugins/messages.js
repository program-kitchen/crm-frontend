/*
 * メッセージ定義ファイル
 */

////////////////////////////////////////////////
// 共通メッセージ
////////////////////////////////////////////////

// 編集中画面移動
const MSG_MOVE_PAGE = '編集中の情報がすべて消えてしまいます。このページから移動してもよろしいですか？';

////////////////////////////////////////////////
// ログイン画面メッセージ
////////////////////////////////////////////////

// ログインエラー
const MSG_LOGIN_ERR = 'ユーザID、パスワードが一致しません。';

////////////////////////////////////////////////
// ユーザ一覧画面メッセージ
////////////////////////////////////////////////

// ユーザ削除確認
const MSG_CONF_DEL_USER = 'ユーザを削除します。よろしいですか？';
// ユーザ削除
const MSG_DEL_USER = 'ユーザを削除しました。';
// 複数ユーザ削除確認
const MSG_CONF_MULTI_DEL_USER = '選択したユーザを削除します。よろしいですか？';
// 複数ユーザ削除
const MSG_MULTI_DEL_USER = '選択したユーザを削除しました。';

////////////////////////////////////////////////
// ユーザ登録画面メッセージ
////////////////////////////////////////////////

// ユーザ登録
const MSG_REGISTER_USER = 'ユーザを仮登録しました。\r\n' +
                          '入力されたメールアドレスに認証メールを送信しましたのでご確認下さい。';

////////////////////////////////////////////////
// ユーザ編集画面メッセージ
////////////////////////////////////////////////

// ユーザ編集
const MSG_EDIT_USER = 'ユーザを編集しました。';
// パスワードリセットメール送信確認
const MSG_CONF_PASS_RESET = 'パスワードリセットメールを送信します。よろしいですか？';
// パスワードリセットメール送信
const MSG_PASS_RESET = 'パスワードリセットメールを送信しました。';

////////////////////////////////////////////////
// ユーザ有効化画面メッセージ
////////////////////////////////////////////////

// ユーザ有効化
const MSG_ACTIVATE_USER = '登録が完了しました。';

////////////////////////////////////////////////
// コース一覧画面メッセージ
////////////////////////////////////////////////

// コース削除確認
const MSG_CONF_DEL_COURSE = 'コースを削除します。よろしいですか？';
// コース削除
const MSG_DEL_COURSE = 'コースを削除しました。';
// 複数コース削除確認
const MSG_CONF_MULTI_DEL_COURSE = '選択したコースを削除します。よろしいですか？';
// 複数コース削除
const MSG_MULTI_DEL_COURSE = '選択したコースを削除しました。';

////////////////////////////////////////////////
// コース登録画面メッセージ
////////////////////////////////////////////////

// コース登録
const MSG_REGISTER_COURSE = 'コースを登録しました。';
// ターム削除確認
const MSG_CONF_DEL_TERM = 'タームを削除します。よろしいですか？';
// ターム削除
const MSG_DEL_TERM = 'タームを削除しました。';

////////////////////////////////////////////////
// コース編集画面メッセージ
////////////////////////////////////////////////

// コース編集
const MSG_EDIT_COURSE = 'コースを更新しました。';

////////////////////////////////////////////////
// ターム登録画面メッセージ
////////////////////////////////////////////////

// ターム登録
const MSG_REGISTER_TERM = 'タームを登録しました。';

////////////////////////////////////////////////
// ターム編集画面メッセージ
////////////////////////////////////////////////

// ターム編集
const MSG_EDIT_TERM = 'タームを更新しました。';

////////////////////////////////////////////////
// HTTP通信エラーメッセージ
////////////////////////////////////////////////

// 401エラー
const MSG_ERR_UNAUTHORIZED = 'ログインセッションが切れました。';
// 403エラー
const MSG_ERR_FORBIDDEN = '権限がありません。';

////////////////////////////////////////////////
// 入力エラーメッセージ
////////////////////////////////////////////////

// 必須入力エラー
const MSG_ERR_REQUIRED = '入力されていません。';
// メールアドレス形式エラー
const MSG_ERR_EMAIL_FORMAT = 'メールアドレス形式で入力してください。';
// パスワード形式エラー
const MSG_ERR_PASS_FORMAT = '半角英字、数字、記号を1つ以上含んでください。';
// パスワード文字数エラー
const MSG_ERR_PASS_LENGTH = '8文字以上15文字以下で入力してください。';
// ターム未登録エラー
const MSG_ERR_NO_TERM = 'ターム登録は必須です。';
// 最小値未満エラー
const MSG_ERR_MIN = '{min}以上でなければなりません。';
// 最大値超過エラー
const MSG_ERR_MAX = '{max}以下でなければなりません。';

// injectを使用してVueコンポーネントで共通化
export default (context, inject) => {
  // 共通メッセージ
  inject('MSG_MOVE_PAGE', MSG_MOVE_PAGE)

  // ログイン画面メッセージ
  inject('MSG_LOGIN_ERR', MSG_LOGIN_ERR)

  // ユーザ一覧画面メッセージ
  inject('MSG_CONF_DEL_USER', MSG_CONF_DEL_USER)
  inject('MSG_DEL_USER', MSG_DEL_USER)
  inject('MSG_CONF_MULTI_DEL_USER', MSG_CONF_MULTI_DEL_USER)
  inject('MSG_MULTI_DEL_USER', MSG_MULTI_DEL_USER)

  // ユーザ登録画面メッセージ
  inject('MSG_REGISTER_USER', MSG_REGISTER_USER)

  // ユーザ編集画面メッセージ
  inject('MSG_EDIT_USER', MSG_EDIT_USER)
  inject('MSG_CONF_PASS_RESET', MSG_CONF_PASS_RESET)
  inject('MSG_PASS_RESET', MSG_PASS_RESET)

  // ユーザ有効化画面メッセージ
  inject('MSG_ACTIVATE_USER', MSG_ACTIVATE_USER)

  // コース一覧画面メッセージ
  inject('MSG_CONF_DEL_COURSE', MSG_CONF_DEL_COURSE)
  inject('MSG_DEL_COURSE', MSG_DEL_COURSE)
  inject('MSG_CONF_MULTI_DEL_COURSE', MSG_CONF_MULTI_DEL_COURSE)
  inject('MSG_MULTI_DEL_COURSE', MSG_MULTI_DEL_COURSE)

  // コース登録画面メッセージ
  inject('MSG_REGISTER_COURSE', MSG_REGISTER_COURSE)
  inject('MSG_CONF_DEL_TERM', MSG_CONF_DEL_TERM)
  inject('MSG_DEL_TERM', MSG_DEL_TERM)

  // コース編集画面メッセージ
  inject('MSG_EDIT_COURSE', MSG_EDIT_COURSE)

  // ターム登録画面メッセージ
  inject('MSG_REGISTER_TERM', MSG_REGISTER_TERM)

  // ターム編集画面メッセージ
  inject('MSG_EDIT_TERM', MSG_EDIT_TERM)

  // HTTP通信エラーメッセージ
  inject('MSG_ERR_UNAUTHORIZED', MSG_ERR_UNAUTHORIZED)
  inject('MSG_ERR_FORBIDDEN', MSG_ERR_FORBIDDEN)
}

// Vueコンポーネント以外で使用する定数を展開
export {
  // HTTP通信エラーメッセージ
  MSG_ERR_UNAUTHORIZED,
  MSG_ERR_FORBIDDEN,

  // 入力エラーメッセージ
  MSG_ERR_REQUIRED,
  MSG_ERR_EMAIL_FORMAT,
  MSG_ERR_PASS_FORMAT,
  MSG_ERR_PASS_LENGTH,
  MSG_ERR_NO_TERM,
  MSG_ERR_MIN,
  MSG_ERR_MAX,
}
