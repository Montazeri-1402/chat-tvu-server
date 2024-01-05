var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

/* GET chats listing. */
router.get('/', async function (req, res, next) {
    let { conversationId } = req.query;
    conversationId = Number(conversationId);
    const chats = await prisma.chat.findMany({
        where: {
            conversationId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
    res.send(chats);
});

/* POST chat. */
router.post('/', async function (req, res, next) {
    const chat = req.body;
    const createdchat = await prisma.chat.create({
        data: chat,
    })
    res.send(createdchat);
});

module.exports = router;
