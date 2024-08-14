import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/connection";
import setupShutdownHandlers from "./utils/connectionManager";
import AgentModel from "./db/models/Agent.model";
import FileUploadRoutes from "./routes/uploads.ts/fileUpload.route";
import Routes from "./routes/index";
import apiLimiter from "./utils/rateLimiter";

dotenv.config();

class Server {
  private app: Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.configureMiddleware();
    this.defineRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json()); // Middleware to parse JSON bodies
    this.app.use(apiLimiter); // Limitter for per request made by user over a sent interval of time
  }

  private defineRoutes(): void {
    this.app.get("/", async (req: Request, res: Response) => {
      res.send("Hello, Server is on and ready to go");
    });

    this.app.use("/api", Routes.fileUploadRoute);
    this.app.use("/api", Routes.userRoute);
  }

  public async start(): Promise<void> {
    try {
      await connectToDatabase(); // Establish database connection

      this.app.listen(this.port, () => {
        console.log(`Server is running on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error("Error starting server:", error);
      process.exit(1); // Exit with failure
    }
  }
}

const server = new Server();
server.start();
setupShutdownHandlers();
