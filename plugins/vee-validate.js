import Vue from "vue";
import {
  MSG_ERR_REQUIRED,
  MSG_ERR_EMAIL_FORMAT,
  MSG_ERR_PASS_FORMAT,
  MSG_ERR_PASS_LENGTH,
  MSG_ERR_NO_TERM,
  MSG_ERR_MIN,
  MSG_ERR_MAX,
} from './messages.js';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from "vee-validate";
import ja from "vee-validate/dist/locale/ja.json";
import {
  email,
  required,
  min_value,
  max_value,
} from "vee-validate/dist/rules";

// import all rules
import * as rules from "vee-validate/dist/rules";
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]); // eslint-disable-line
});

// メール形式のルールのメッセージを変更
extend("email", {
  ...email,
  message: MSG_ERR_EMAIL_FORMAT
});

// 空欄チェックのルールのメッセージを変更
extend("required", {
  ...required,
  message: MSG_ERR_REQUIRED
});

// 最大値最小値チェックのルールのメッセージを変更
extend("min_value", {
  ...min_value,
  message: MSG_ERR_MIN
});
extend("max_value", {
  ...max_value,
  message: MSG_ERR_MAX
});

// 半角英字、数字、記号を含んでいるかのチェックするルールを作成
extend("password", {
  message: MSG_ERR_PASS_FORMAT,
  validate(value) {
    if (
      value.match(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!#%&( )+,-./;<=>?@\[\]^_{|}~])[a-zA-Z0-9!#%&( )+,-./;<=>?@\[\]^_{|}~]+$/
      )
    ) {
      return true;
    }
  }
});

// パスワードの文字数をチェックするルールを作成
extend("password_range", {
  message: MSG_ERR_PASS_LENGTH,
  validate(value) {
    if (value.match(/^[a-zA-Z0-9!#%&( )+,-./;<=>?@\[\]^_{|}~]{8,15}$/)) {
      return true;
    }
  }
});

// カスタムルールの設定
// コース期間のところに独自メッセージを表示
extend("termCheck", {
  // エラーメッセージを設定する
  message: MSG_ERR_NO_TERM,
  validate(value) {
    if (value > 0) {
      return true;
    }
  }
});

localize("ja", ja);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
