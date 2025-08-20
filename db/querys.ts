const habitsMigrationQuery: string = `
    PRAGMA journal_mode = 'wal';
    CREATE TABLE habit(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        color TEXT,
        goal INTEGER,
        frequency TEXT DEFAULT 'daily',
        reminder_time TEXT,
        icon TEXT,
        priority INTEGER DEFAULT 0,
        archived INTEGER DEFAULT 0,
        last_completed DATE,
        streak_count INTEGER DEFAULT 0,
        category TEXT,
        created_at DATE DEFAULT (DATE('now'))
    );
`;

const habitLogsMigrationQuery = `
    CREATE TABLE habit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habit_id INTEGER NOT NULL,
        date DATE NOT NULL,
        completed INTEGER DEFAULT 0,
        duration INTEGER,
        quantity REAL,
        FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE,
        UNIQUE(habit_id, date)
);
`;

const remindersMigrationQuery = `
    CREATE TABLE reminders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habit_id INTEGER NOT NULL,
        time TEXT NOT NULL,            -- e.g. "08:00"
        repeat TEXT DEFAULT 'daily',   -- daily, weekly, custom
        enabled INTEGER DEFAULT 1,     -- 1 = active, 0 = off
        FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
); `;

const categoriesMigrationQuery = `
    CREATE TABLE categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,     -- e.g. "Health", "Work"
        color TEXT                     -- optional for UI
); `;

export {
  habitLogsMigrationQuery,
  habitsMigrationQuery,
  remindersMigrationQuery,
  categoriesMigrationQuery,
};
