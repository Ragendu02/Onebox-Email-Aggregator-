
import axios from 'axios';

// Replace with your webhook.site URL
export async function triggerWebhook(email: any) {
  await axios.post('https://webhook.site/YOUR-ID', { email });
}
