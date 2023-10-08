import cors from "cors";
import dotenv from "dotenv";
import serverlessHttp from "serverless-http";
import express, { Request, Response } from "express";

import { allowedOrigins } from "./src/config/cors";
import contactRoutes from "./src/routes/contact";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS options
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowedOrigins array or if it's undefined (e.g., from a same-origin request)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Use the CORS middleware with the configured options
app.use(cors(corsOptions));

app.use("/api", contactRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Server is listening at http://localhost:${3000}`);
});

const handler = serverlessHttp(app);

export { handler };
