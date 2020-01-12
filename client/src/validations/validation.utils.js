import validationErrorMessages from "./validation-messages";
import validationRules from "./validation-rules";
export const getFormatedRule = (ruleName, msg, ruleValue) => {
  let defaultMessage = validationErrorMessages[ruleName];
  const originalRuleName = ruleValue ? `${ruleName}:${ruleValue}` : ruleName;
  return { name: originalRuleName, msg: { msg, defaultMessage: defaultMessage } };
};

export const getFormatedFieldRule = (rules) => {
  const rulesName = [];
  const rulesErrorMessage = [];

  rules.forEach((rule) => {
    console.info("rule", rules, rule);
    const formatedRule = validationRules[rule.ruleName](rule.msg, rule.ruleValue);
    rulesName.push(formatedRule.name);
    rulesErrorMessage.push(formatedRule.msg);
  });
  return { validators: rulesName, errorMessages: rulesErrorMessage };
};
