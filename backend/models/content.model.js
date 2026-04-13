import db from "../config/db.js";

export const findAllAnnouncements = async () => {
    const [rows] = await db.execute(
        `SELECT id, title, description, created_at
         FROM announcements
         ORDER BY created_at DESC`
    );

    return rows;
};

export const createAnnouncement = async ({ title, description }) => {
    const [result] = await db.execute(
        `INSERT INTO announcements (title, description)
         VALUES (?, ?)`,
        [title, description]
    );

    return result.insertId;
};

export const updateAnnouncementById = async (id, { title, description }) => {
    const [result] = await db.execute(
        `UPDATE announcements
         SET title = ?, description = ?
         WHERE id = ?`,
        [title, description, id]
    );

    return result.affectedRows;
};

export const deleteAnnouncementById = async (id) => {
    const [result] = await db.execute(
        "DELETE FROM announcements WHERE id = ?",
        [id]
    );

    return result.affectedRows;
};

export const createReport = async ({ userId, description }) => {
    const [result] = await db.execute(
        `INSERT INTO reports (user_id, description)
         VALUES (?, ?)`,
        [userId, description]
    );

    return result.insertId;
};

export const findReportsByUserId = async (userId) => {
    const [rows] = await db.execute(
        `SELECT id, user_id, description, status, created_at
         FROM reports
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
    );

    return rows;
};

export const findAllSchedules = async () => {
    const [rows] = await db.execute(
        `SELECT id, content, created_at
         FROM schedules
         ORDER BY created_at DESC`
    );

    return rows;
};

export const createSchedule = async ({ content }) => {
    const [result] = await db.execute(
        `INSERT INTO schedules (content)
         VALUES (?)`,
        [content]
    );

    return result.insertId;
};

export const updateScheduleById = async (id, { content }) => {
    const [result] = await db.execute(
        `UPDATE schedules
         SET content = ?
         WHERE id = ?`,
        [content, id]
    );

    return result.affectedRows;
};

export const deleteScheduleById = async (id) => {
    const [result] = await db.execute(
        "DELETE FROM schedules WHERE id = ?",
        [id]
    );

    return result.affectedRows;
};

export const findAllTips = async () => {
    const [rows] = await db.execute(
        `SELECT id, content, created_at
         FROM tips
         ORDER BY created_at DESC`
    );

    return rows;
};

export const createTip = async ({ content }) => {
    const [result] = await db.execute(
        `INSERT INTO tips (content)
         VALUES (?)`,
        [content]
    );

    return result.insertId;
};

export const updateTipById = async (id, { content }) => {
    const [result] = await db.execute(
        `UPDATE tips
         SET content = ?
         WHERE id = ?`,
        [content, id]
    );

    return result.affectedRows;
};

export const deleteTipById = async (id) => {
    const [result] = await db.execute(
        "DELETE FROM tips WHERE id = ?",
        [id]
    );

    return result.affectedRows;
};
