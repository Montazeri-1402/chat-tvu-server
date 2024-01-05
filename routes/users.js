var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await prisma.user.findMany();
  res.send(users);
});

/* POST user. */
router.post('/', async function(req, res, next) {
  const user = req.body;
  const createdUser = await prisma.user.create({
    data: user,
  })
  res.send(createdUser);
});

module.exports = router;
