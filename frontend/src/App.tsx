
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [q, setQ] = useState('');
  const [emails, setEmails] = useState<any[]>([]);

  async function search() {
    const res = await axios.get(`http://localhost:4000/search?q=${q}`);
    setEmails(res.data);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📬 Onebox</h1>
      <div className="flex gap-2">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          className="border p-2"
          placeholder="Search emails..."
        />
        <button
          onClick={search}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <ul className="mt-6">
        {emails.map((e, i) => (
          <li key={i} className="border-b py-2">
            <p className="font-semibold">{e._source.category}</p>
            <p>{e._source.body?.substring(0, 100)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
