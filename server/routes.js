import { Router } from "express";
import appRoutes from "Modules/auth/auth.routes";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Connected" });
});

router.use("/auth", appRoutes);

export default router;
