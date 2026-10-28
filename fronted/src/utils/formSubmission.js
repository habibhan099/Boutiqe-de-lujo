const sensitiveFieldPattern = /password|token|secret/i;

export function myFormSubmissionFunction(data) {
  const safeData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      sensitiveFieldPattern.test(key) ? "[REDACTED]" : value,
    ]),
  );

  console.log("Form submitted.", safeData);
}
