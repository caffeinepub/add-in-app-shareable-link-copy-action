/**
 * Logs a message with a clear step label for easier debugging
 */
export function logStep(step: string, message: string, error?: unknown): void {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${step}]`;
  
  if (error) {
    console.error(`${prefix} ERROR: ${message}`, error);
  } else {
    console.log(`${prefix} ${message}`);
  }
}

/**
 * Logs a successful step completion
 */
export function logStepSuccess(step: string, message: string): void {
  logStep(step, `✓ ${message}`);
}

/**
 * Logs a step failure
 */
export function logStepError(step: string, message: string, error: unknown): void {
  logStep(step, `✗ ${message}`, error);
}
