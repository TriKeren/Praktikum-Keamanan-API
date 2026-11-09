
const VALID_API_KEY = process.env.API_KEY || "POLIWANGI-API-2026";

function authenticateApiKey(req, res, next) {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        return res.status(401).json({
            message: "API Key tidak ditemukan"
        });
    }

    if (apiKey !== VALID_API_KEY) {
        return res.status(401).json({
            message: "API Key tidak valid"
        });
    }

    next();
}

module.exports = authenticateApiKey;
