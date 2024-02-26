import cors from "cors";
import express from "express";

import DnD5eRoutes from "./routes/DnD5e.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT || 3000;

// ! Simulate a response
//   const response = simulateChatGPTResponse();
//   res.json({ response: response });
// } catch (error) {
//   res.status(500).json({
//     error: "A problem occurred while processing the request.",
//   });

app.use("/api/v1/dnd", DnD5eRoutes);

app.listen(port, () => {
  console.log(`Server runs at http://localhost:${port}`);
});

export default app;
