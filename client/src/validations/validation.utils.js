import validationRules from "./validation-rules";

// eslint-disable-next-line import/prefer-default-export
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
