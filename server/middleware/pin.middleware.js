export const pinMiddleware = async (req, res, next)=> {
  const pin = req.body.pin;
  const ADMIN_PIN = process.env.ADMIN_PIN || '1234'; // fallback for demo
  if (!pin || pin !== ADMIN_PIN) {
    return res.status(403).json({ message: 'Invalid or missing PIN.' });
  }
  next();
}; 