# 📚 Notewise – Smarter Document Q&A for Students

**Notewise** is a student-first study assistant that lets users upload multiple documents (lecture notes, books, handouts) and ask rich, contextual questions like:

> *"What does each source say about the water cycle?"*

The app returns a **summarized answer with source attribution**, helping students learn faster and more effectively.

---

## 🚀 Features

- 📄 Upload PDFs and study materials.
- 🤖 Ask questions and get summarized answers using RAG (Retrieval-Augmented Generation).
- 🔍 Combines **semantic + keyword search** for accurate results.
- 🧠 Powered by vector embeddings with **Qdrant** and **Python RAG pipeline**.
- 📌 Source attribution for every chunk in the answer.
- 🧑‍🎓 Community section where students can share and discuss study insights.

---

## 🧰 Tech Stack

### 🔧 Frontend
- [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

### 💾 Backend
- [PostgreSQL (Neon)](https://neon.tech/) – Serverless database
- [Drizzle ORM](https://orm.drizzle.team/) – Type-safe database access
- [Qdrant](https://qdrant.tech/) – Vector search engine for document embeddings
- [Python](https://www.python.org/) – RAG pipeline using **LlamaIndex** or **Haystack**

---

## 🧠 How It Works

1. **Upload PDFs** → extracted and embedded via Python (using sentence transformers or Gemini for OCR).
2. **Indexed in Qdrant** → vector store enables semantic search.
3. **Ask a Question** → hybrid search (semantic + keyword) fetches top chunks.
4. **RAG pipeline** → generates answers with citation from matched chunks.
5. **Community Section** → powered by PostgreSQL + Drizzle for idea sharing.

---

## 🖥️ Running the Project

### 🌐 Frontend

```bash
npm install
npm run dev

🔌 WebSocket Server (connects frontend ↔ ML backend)
  node useWebSocket.js

📤 Upload Documents to Vector DB
  node uploadAction.js

🧠 Python RAG Server + Vector DB
# Start Python backend (main.py contains RAG logic)
python main.py

# Run Qdrant via Docker
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant

