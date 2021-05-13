import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import ja from "vee-validate/dist/locale/ja.json";

// import all rules
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]); // eslint-disable-line
});

// カスタムルールの設定
// コース期間のところに独自メッセージを表示
extend('termCheck', {
    // エラーメッセージを設定する
    message: 'ターム登録は必須です',
    validate(value) {
      if (value >= 1) {
          return true;
      }
    }
});

localize("ja", ja);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
