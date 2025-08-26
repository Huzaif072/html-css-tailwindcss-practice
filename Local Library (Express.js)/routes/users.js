import express from 'express';
const router = express.Router();

// Example user API endpoint
router.get('/', (req, res) => {
  res.json({ message: 'User API endpoint' });
});

export default router;