CREATE OR ALTER PROCEDURE createNoteProc(@title VARCHAR(50),@content VARCHAR(200))
AS
BEGIN
INSERT
INTO Notess(title,content)
VALUES (@title,@content)
END
