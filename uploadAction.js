// // server.js
// import express from "express";
// import multer from "multer";
// import { google } from "googleapis";
// import fs from "fs";
// import cors from "cors";

// const app = express();
// const upload = multer({ dest: "uploads/" });
// app.use(cors({ origin: "http://localhost:5173" }));

// // Google Auth Setup
// const auth = new google.auth.GoogleAuth({
//   keyFile: "./drive.json",
//   scopes: ["https://www.googleapis.com/auth/drive"],
// });

// const drive = google.drive({ version: "v3", auth });

// const PDF_FOLDER_ID = "1yfrjt3p7V6AIovwxMimUUBCktb2mk5BU";

// app.post("/upload", upload.single("pdf"), async (req, res) => {
//   try {
//     const fileMetadata = {
//       name: req.file.originalname,
//       parents: [PDF_FOLDER_ID],
//     };

//     const media = {
//       mimeType: "application/pdf",
//       body: fs.createReadStream(req.file.path),
//     };

//     const response = await drive.files.create({
//       resource: fileMetadata,
//       media,
//       fields: "id, webViewLink",
//     });

//     // Remove temp file
//     fs.unlinkSync(req.file.path);

//     res.json({ success: true, fileLink: response.data.webViewLink });
//   } catch (error) {
//     console.error("Error uploading to Drive:", error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// app.listen(3001, () => console.log("Server started on http://localhost:3001"));
// server.js
import express from "express";
import multer from "multer";
import { google } from "googleapis";
import fs from "fs";
import cors from "cors";

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors({ origin: "http://localhost:5173" }));

// Google Auth Setup
const auth = new google.auth.GoogleAuth({
  keyFile: "./drive.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

const PDF_FOLDER_ID = "1yfrjt3p7V6AIovwxMimUUBCktb2mk5BU";

// Upload endpoint
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const fileMetadata = {
      name: req.file.originalname,
      parents: [PDF_FOLDER_ID],
    };

    const media = {
      mimeType: "application/pdf",
      body: fs.createReadStream(req.file.path),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id, webViewLink",
    });

    fs.unlinkSync(req.file.path);

    res.json({ success: true, fileLink: response.data.webViewLink });
  } catch (error) {
    console.error("Error uploading to Drive:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// 📁 New endpoint to list PDFs from Drive
app.get("/files", async (req, res) => {
  try {
    const response = await drive.files.list({
      q: `'${PDF_FOLDER_ID}' in parents and mimeType='application/pdf' and trashed = false`,
      fields: "files(id, name, webViewLink, createdTime)",
      orderBy: "createdTime desc",
    });

    res.json({ files: response.data.files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

app.listen(3001, () => console.log("Server started on http://localhost:3001"));
