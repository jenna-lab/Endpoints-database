CREATE TABLE NOTES (
    note_id VARCHAR(200),
    notetitle VARCHAR(200),
    noteContent VARCHAR(200),
    created_at DATETIME DEFAULT GETDATE(),
)

