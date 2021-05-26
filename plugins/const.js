/*
 * 共通定義ファイル
 */

// 一覧の1ページ内表示行数
const LIST_PAGE_COUNT = 30;

// injectを使用してVueコンポーネントで共通化
export default (context, inject) => {
  inject('LIST_PAGE_COUNT', LIST_PAGE_COUNT)
}