# Onebox-Email-Aggregator-
# 📬 Onebox Email Aggregator

A feature‑rich **Onebox email aggregator** built with **Node.js (TypeScript)**, **React (TypeScript)**, and **Elasticsearch**.  
It synchronizes multiple IMAP accounts in real time, indexes emails for search, categorizes them, and integrates with Slack and webhooks.  

---

## Features

 **Real-Time Email Synchronization**
- Connects to multiple IMAP accounts.
- Fetches last 30 days of emails.
- Uses persistent IMAP (IDLE mode) — no cron jobs.

 **Searchable Storage**
- Stores emails in a locally hosted **Elasticsearch** instance (via Docker).
- Search by keyword (and can extend to account/folder filters).

  **AI-Based Categorization (Basic)**
- Categorizes emails into:
  - Interested
  - Meeting Booked
  - Not Interested
  - Spam
  - Out of Office

  **Integrations**
- **Slack notification** for every new **Interested** email.
- **Webhook trigger** (using [webhook.site](https://webhook.site)) when an email is marked as **Interested**.

 **Frontend Interface**
- Built with React & Tailwind CSS.
- View emails and their categories.
- Search functionality powered by Elasticsearch.

 **(Optional Advanced)** AI-powered suggested replies using RAG (Retrieval-Augmented Generation) — not implemented in this version, but the backend is extendable.

---

##   Tech Stack

- **Backend:** Node.js (TypeScript), Express, node-imap, Elasticsearch Client
- **Frontend:** React (TypeScript), Tailwind CSS
- **Search:** Elasticsearch (Docker)
- **Notifications:** Slack Webhook, Webhook.site
- **Language:** TypeScript

---

##  Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- IMAP-enabled email accounts (e.g., Gmail with App Password)
- Slack Incoming Webhook URL
- Webhook.site URL for testing

---

##   Setup & Running

### 1. **Start Elasticsearch**
In the project root:
```bash
docker-compose up -d
This starts Elasticsearch on http://localhost:9200.

2. Run Backend
Go to backend folder:

cd backend
npm install
npm run dev

 Backend runs on http://localhost:4000

Environment Notes:

Edit src/imap.ts to add your email accounts and app passwords.

Edit src/slack.ts to include your Slack webhook URL.

Edit src/webhook.ts to include your webhook.site URL.

3. Run Frontend
In a new terminal:

cd frontend
npm install
npm start
Frontend runs on http://localhost:3000

 Search API
Endpoint:


GET http://localhost:4000/search?q=<keyword>
Example:

http://localhost:4000/search?q=meeting

