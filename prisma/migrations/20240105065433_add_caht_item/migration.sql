-- CreateTable
CREATE TABLE "ChatItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderUserId" INTEGER NOT NULL,
    "receiverUserId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
