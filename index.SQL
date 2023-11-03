CREATE TABLE NOTES (
    note_id VARCHAR(200),
    title VARCHAR(200),
    Content VARCHAR(200),
    created_at DATETIME DEFAULT GETDATE(),
)

