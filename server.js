import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());

// ✅ serve frontend build
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "build"))); // or "public" if you use plain HTML

app.get("/news", async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// ✅ catch-all to serve frontend index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html")); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
