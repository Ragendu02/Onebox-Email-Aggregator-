export function categorize(body: string): string {
  const text = body.toLowerCase();

  // Simple logic: adjust as needed
  if (text.includes('interested') || text.includes('let’s talk') || text.includes('send details')) {
    return 'Interested';
  }
  if (text.includes('not interested') || text.includes('unsubscribe')) {
    return 'Not Interested';
  }
  return 'Other';
}
