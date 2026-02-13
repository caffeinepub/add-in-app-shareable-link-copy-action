/**
 * Formats an unknown error into a concise, developer-readable string
 */
export function formatError(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message || 'Unknown error';
    const stack = error.stack ? `\n${error.stack.split('\n').slice(0, 3).join('\n')}` : '';
    return `${message}${stack}`;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}
