
import { Client } from '@elastic/elasticsearch';
const client = new Client({ node: 'http://localhost:9200' });

export async function indexEmail(email: any) {
  await client.index({
    index: 'emails',
    body: {
      account: email.account,
      body: email.body,
      category: email.category,
      date: new Date()
    }
  });
}

export async function searchEmails(query: string) {
  const result = await client.search({
    index: 'emails',
    query: {
      match: { body: query }
    }
  });
  return result.hits.hits;
}
