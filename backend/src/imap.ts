
import Imap from 'node-imap';
import { indexEmail } from './elastic';
import { categorize } from './categorize';
import { sendSlack } from './slack';
import { triggerWebhook } from './webhook';

export function startIMAP() {
  const accounts = [
    {
      user: 'YOUR_EMAIL@gmail.com',
      password: 'YOUR_APP_PASSWORD',
      host: 'imap.gmail.com',
      port: 993,
      tls: true
    }
    // add more accounts if you want
  ];

  accounts.forEach(acc => {
    const imap = new Imap(acc);

    imap.once('ready', () => {
      imap.openBox('INBOX', true, () => {
        console.log(`📥 Listening on ${acc.user}`);
        imap.on('mail', () => {
          fetchNewMails(imap, acc.user);
        });
      });
    });

    imap.connect();
  });
}

function fetchNewMails(imap: Imap, account: string) {
  const fetcher = imap.seq.fetch('1:*', {
    bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
    struct: true
  });

  fetcher.on('message', (msg) => {
    let emailData: any = { account };
    msg.on('body', (stream) => {
      let buffer = '';
      stream.on('data', chunk => buffer += chunk.toString('utf8'));
      stream.on('end', () => {
        emailData.body = buffer;
      });
    });

    msg.once('end', async () => {
      emailData.category = categorize(emailData.body || '');
      await indexEmail(emailData);
      if (emailData.category === 'Interested') {
        await sendSlack(emailData);
        await triggerWebhook(emailData);
      }
    });
  });
}
