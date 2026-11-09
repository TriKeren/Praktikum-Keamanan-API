const express = require("express");
const users = require("./data/users");
const authenticateApiKey = require("./middleware/apikey");
const authorizeRoles = require("./middleware/authorization");
const anggota = require("./data/anggota");
const https = require("https");
const fs = require("fs");

const {
  activeTokens,
  generateToken,
  authenticateToken,
} = require("./middleware/auth");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Keamanan Komunikasi berhasil dijalankan",
  });
});

app.post("/api/login", authenticateApiKey, (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({
      message: "Username atau password salah",
    });
  }

  const token = generateToken();

  activeTokens.set(token, {
    id: user.id,
    username: user.username,
    nama: user.nama,
    role: user.role,
    nim: user.nim || null,
    ukmId: user.ukmId || null,
  });

  res.json({
    message: "Login berhasil",
    token: token,
    user: {
      id: user.id,
      nama: user.nama,
      role: user.role,
    },
  });
});

app.get("/api/profile", authenticateApiKey, authenticateToken, (req, res) => {
  res.json({
    message: "Berhasil mengambil profile",
    data: req.user,
  });
});

app.get(
  "/api/mahasiswa/:id",
  authenticateApiKey,
  authenticateToken,
  authorizeRoles("mahasiswa"),
  (req, res) => {
    if (Number(req.params.id) !== req.user.id) {
      return res.status(403).json({
        message: "Anda hanya boleh melihat biodata sendiri",
      });
    }

    res.json({
      message: "Berhasil mengambil biodata mahasiswa",
      data: {
        id: req.user.id,
        nama: req.user.nama,
        nim: req.user.nim,
      },
    });
  },
);

app.get(
  "/api/ukm/anggota",
  authenticateApiKey,
  authenticateToken,
  authorizeRoles("pengurus"),
  (req, res) => {
    const dataAnggota = anggota.filter((item) => item.ukmId === req.user.ukmId);

    res.json({
      message: "Berhasil mengambil anggota UKM",
      ukm: req.user.ukmId,
      data: dataAnggota,
    });
  },
);

app.get(
  "/api/admin/konfigurasi",
  authenticateApiKey,
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Berhasil mengakses konfigurasi sistem",
      data: {
        sistem: "Portal UKM",
        status: "Aktif",
        pengelolaan: ["Konfigurasi akses", "Pengelolaan API Key", "Audit log"],
      },
    });
  },
);

const options = {
    key: fs.readFileSync("cert/key.pem"),
    cert: fs.readFileSync("cert/cert.pem")
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`Server HTTPS berjalan di https://localhost:${PORT}`);
});