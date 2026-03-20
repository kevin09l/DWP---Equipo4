import db from "../config/db.js";

export const findByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return rows[0];
};

export const findByWaterMeter = async (waterMeter) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE water_meter = ?",
        [waterMeter]
    );
    return rows[0];
};

export const createUser = async (user) => {
    const [result] = await db.query(
        `INSERT INTO users 
        (name, email, address, water_meter, password, role)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            user.name,
            user.email,
            user.address,
            user.water_meter,
            user.password,
            user.role
        ]
    );

    return result.insertId;
};

export const saveRefreshToken = async (userId, token, expiresAt) => {
    await db.query(
        `INSERT INTO refresh_tokens (user_id, token, expires_at)
         VALUES (?, ?, ?)`,
        [userId, token, expiresAt]
    );
};

export const deleteRefreshToken = async (token) => {
    await db.query(
        "DELETE FROM refresh_tokens WHERE token = ?",
        [token]
    );
};

export const findRefreshToken = async (token) => {
    const [rows] = await db.query(
        "SELECT * FROM refresh_tokens WHERE token = ?",
        [token]
    );
    return rows[0];
};

export const deleteAllUserTokens = async (userId) => {
    await db.query(
        "DELETE FROM refresh_tokens WHERE user_id = ?",
        [userId]
    );
};
