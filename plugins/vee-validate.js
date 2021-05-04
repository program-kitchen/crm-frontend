import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from "vee-validate";
import ja from "vee-validate/dist/locale/ja.json";
import { email } from "vee-validate/dist/rules";
import { required } from "vee-validate/dist/rules";

// import all rules
import * as rules from "vee-validate/dist/rules";
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]); // eslint-disable-line
});

//メール形式のルールのメッセージを変更
extend("email", {
  ...email,
  message: "メールアドレス形式で入力してください"
});

//空欄チェックのルールのメッセージを変更
extend("required", {
  ...required,
  message: "入力されていません"
});

//半角英字、数字、記号を含んでいるかのチェックするルールを作成
extend("password", {
  message: "半角英字、数字、記号を1つ以上含んでください",
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

localize("ja", ja);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
