/*
 * 共通定義ファイル
 */

////////////////////////////////////////////////
// 画面関連
////////////////////////////////////////////////

// 一覧の1ページ内表示行数
const LIST_PAGE_COUNT = 30;
// 1か月あたりの週数
const WEEKS_PER_MONTH = 4;
// ユーザ権限
const USER_ROLE = {
  // コーチ権限
  "coach": {
    "code": 1,
    "name": "コーチ",
  },
  // バックオフィス権限
  "backOffice": {
    "code": 2,
    "name": "バックオフィス",
  },
  // 管理者権限
  "admin": {
    "code": 3,
    "name": "管理者",
  },
  // オーナー権限
  "owner": {
    "code": 4,
    "name": "オーナー",
  },
}

// 最大文字数
// ユーザ名
const MAX_LEN_USER_NAME = 32;
// メールアドレス
const MAX_LEN_USER_EMAIL = 256;
// パスワード
const MAX_LEN_USER_PASS = 32;

// コース名
const MAX_LEN_COURSE_NAME = 32;
// コース概要
const MAX_LEN_COURSE_SUMMARY = 256;

// ターム名
const MAX_LEN_TERM_NAME = 32;
// ターム概要
const MAX_LEN_TERM_SUMMARY = 256;

// 最小値、最大値
// コース期間：最小値
const MIN_COURSE_PERIOD = 1;
// コース期間：最大値
const MAX_COURSE_PERIOD = 53;
// ターム期間：最小値
const MIN_TERM_PERIOD = 1;
// ターム期間：最大値
const MAX_TERM_PERIOD = 26;

////////////////////////////////////////////////
// HTTPステータスコード
////////////////////////////////////////////////

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_PAYMENT_REQUIRED = 402;
const HTTP_FORBIDDEN = 403;
const HTTP_NOT_FOUND = 404;
const HTTP_METHOD_NOT_ALLOWED = 405;
const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_INTERNAL_SERVER_ERROR = 500;


// injectを使用してVueコンポーネントで共通化
export default (context, inject) => {
  // 画面関連
  inject('LIST_PAGE_COUNT', LIST_PAGE_COUNT)
  inject('WEEKS_PER_MONTH', WEEKS_PER_MONTH)
  inject('USER_ROLE', USER_ROLE)
  inject('MAX_LEN_USER_NAME', MAX_LEN_USER_NAME)
  inject('MAX_LEN_USER_EMAIL', MAX_LEN_USER_EMAIL)
  inject('MAX_LEN_USER_PASS', MAX_LEN_USER_PASS)
  inject('MAX_LEN_COURSE_NAME', MAX_LEN_COURSE_NAME)
  inject('MAX_LEN_COURSE_SUMMARY', MAX_LEN_COURSE_SUMMARY)
  inject('MAX_LEN_TERM_NAME', MAX_LEN_TERM_NAME)
  inject('MAX_LEN_TERM_SUMMARY', MAX_LEN_TERM_SUMMARY)
  inject('MIN_COURSE_PERIOD', MIN_COURSE_PERIOD)
  inject('MAX_COURSE_PERIOD', MAX_COURSE_PERIOD)
  inject('MIN_TERM_PERIOD', MIN_TERM_PERIOD)
  inject('MAX_TERM_PERIOD', MAX_TERM_PERIOD)

  // HTTPステータスコード
  inject('HTTP_OK', HTTP_OK)
  inject('HTTP_BAD_REQUEST', HTTP_BAD_REQUEST)
  inject('HTTP_UNAUTHORIZED', HTTP_UNAUTHORIZED)
  inject('HTTP_PAYMENT_REQUIRED', HTTP_PAYMENT_REQUIRED)
  inject('HTTP_FORBIDDEN', HTTP_FORBIDDEN)
  inject('HTTP_NOT_FOUND', HTTP_NOT_FOUND)
  inject('HTTP_METHOD_NOT_ALLOWED', HTTP_METHOD_NOT_ALLOWED)
  inject('HTTP_UNPROCESSABLE_ENTITY', HTTP_UNPROCESSABLE_ENTITY)
  inject('HTTP_INTERNAL_SERVER_ERROR', HTTP_INTERNAL_SERVER_ERROR)
}

// Vueコンポーネント以外で使用する定数を展開
export {
  // 画面関連
  USER_ROLE,

  // HTTPステータスコード
  HTTP_OK,
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
  HTTP_PAYMENT_REQUIRED,
  HTTP_FORBIDDEN,
  HTTP_NOT_FOUND,
  HTTP_METHOD_NOT_ALLOWED,
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_INTERNAL_SERVER_ERROR,
}
