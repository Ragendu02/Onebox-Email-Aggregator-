
import axios from 'axios';

// Replace with your Slack webhook URL
const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/XXX/YYY/ZZZ';

export async function sendSlack(email: any) {
  await axios.post(SLACK_WEBHOOK_URL, {
    text: `📩 New Interested email from ${email.account}: ${email.body?.substring(0, 100)}`
  });
}
