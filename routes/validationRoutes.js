const express = require('express');
const prisma = require('@prisma/client');
const router = express.Router();

router.post('/validate', async (req, res) => {
  const { character, x, y } = req.body;

  // Fetch the correct coordinates for the character from DB
  const target = await prisma.character.findUnique({
    where: { name: character }
  });

  if (!target) {
    return res.status(404).json({ error: 'Character not found' });
  }

  // Define a range of allowed coordinates for error margin
  const margin = 20; // e.g., a box of 40px x 40px
  if (
    x >= target.xCoord - margin &&
    x <= target.xCoord + margin &&
    y >= target.yCoord - margin &&
    y <= target.yCoord + margin
  ) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false, error: 'Incorrect location' });
  }
});

module.exports = router;
