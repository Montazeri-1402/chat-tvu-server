var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

/* GET conversations listing. */
router.get('/', async function (req, res, next) {
    let { currentUserId, targetUserId } = req.query;
    currentUserId = Number(currentUserId);
    targetUserId = Number(targetUserId);
    const conversations = await prisma.conversation.findMany({
        where: {
            OR: [
                {
                    senderUserId: currentUserId,
                    receiverUserId: targetUserId,
                },
                {
                    receiverUserId: currentUserId,
                    senderUserId: targetUserId,
                },
            ]
        }
    });
    res.send(conversations);
});

/* GET conversations listing. */
router.get('/latest', async function (req, res, next) {
    let { currentUserId } = req.query;
    currentUserId = Number(currentUserId);
    let conversations = await prisma.conversation.findMany({
        where: {
            OR: [
                {
                    senderUserId: currentUserId,
                },
                {
                    receiverUserId: currentUserId,
                },
            ]
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
    for (const conversation of conversations) {
        const lastChat = await prisma.chat.findMany({
            where: {
                conversationId: conversation.id
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 1,
        });
        conversation._latestChat = lastChat[0];
    }
    // conversations = conversations.sort((a, b) => {
    //     const aTime = new Date(a._latestChat?.createdAt);
    //     const bTime = new Date(b._latestChat?.createdAt);
    //     if (aTime) return -1;
    //     else if (sort_o1_after_o2) return 1;
    //     else return 0;
    // });
    res.send(conversations);
});

/* POST conversation. */
router.post('/', async function (req, res, next) {
    const conversation = req.body;
    const createdconversation = await prisma.conversation.create({
        data: conversation,
    })
    res.send(createdconversation);
});

module.exports = router;
