import db from "../config/db.js";

export const savePasswordResetToken = async (userId, tokenHash, expiresAt) => {
    await db.execute(
        `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
         VALUES (?, ?, ?)`,
        [userId, tokenHash, expiresAt]
    );
};

export const findValidPasswordResetToken = async (tokenHash) => {
    const [rows] = await db.execute(
        `SELECT id, user_id, token_hash, expires_at
         FROM password_reset_tokens
         WHERE token_hash = ?
           AND expires_at > NOW()
         LIMIT 1`,
        [tokenHash]
    );

    return rows[0];
};

export const deletePasswordResetTokenById = async (id) => {
    await db.execute(
        "DELETE FROM password_reset_tokens WHERE id = ?",
        [id]
    );
};

export const deletePasswordResetTokensByUserId = async (userId) => {
    await db.execute(
        "DELETE FROM password_reset_tokens WHERE user_id = ?",
        [userId]
    );
};

export const deleteExpiredPasswordResetTokens = async () => {
    await db.execute(
        "DELETE FROM password_reset_tokens WHERE expires_at <= NOW()"
    );
};
