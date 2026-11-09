
const crypto = require("crypto");

// tempat nyimpan token sementara
const activeTokens = new Map();

// buat token acak disini
function generateToken() {
    return crypto.randomBytes(32).toString("hex");
}

// si middleware memeriksa token
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token tidak ditemukan"
        });
    }

    const token = authHeader.split(" ")[1];
    const user = activeTokens.get(token);

    if (!user) {
        return res.status(401).json({
            message: "Token tidak valid"
        });
    }

    req.user = user;
    next();
}

module.exports = {
    activeTokens,
    generateToken,
    authenticateToken
};
