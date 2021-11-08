import { Router } from "express";

const router = Router();

// Get user informations
router.get("/", (req, res) => {
  const user = (req.user && req.user.hidePassword()) || null;
  res.status(200).send({ message: "User info successfully retreived", user });
});

export default router;
