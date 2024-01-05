/*
  Warnings:

  - Added the required column `message` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conversationId" INTEGER NOT NULL,
    "senderUserId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Chat" ("conversationId", "createdAt", "id", "senderUserId") SELECT "conversationId", "createdAt", "id", "senderUserId" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
