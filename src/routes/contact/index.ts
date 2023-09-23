import { Router, Request, Response } from "express";

import { contactSchema } from "../../yupSchemas";
import sendContactAlertEmail from "../../utils/sendContactAlertEmail";

const router = Router();

router.post("/contact", async (req: Request, res: Response) => {
  const formData = req.body;

  try {
    try {
      const validatedContactData = await contactSchema.validate(formData, {
        abortEarly: false,
      });
      const mailResponse = sendContactAlertEmail(validatedContactData);
      res.status(200).json(mailResponse);
    } catch (error: any) {
      res
        .status(412)
        .json({ message: "validation error", errors: error?.errors });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
