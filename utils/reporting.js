// Reporting helpers are useful for logs during test execution.
// They help explain what a test is doing when you are learning the framework.
export function logStep(stepName, details = '') {
  const message = details ? `${stepName}: ${details}` : stepName;
  console.log(`[Framework] ${message}`);
}

export function describeTestCase(name, callback) {
  return callback(name);
}
