import express from "express";
import cors from 'cors';
import bodyParser, { urlencoded } from 'body-parser';
import dotenv from 'dotenv';

import contactRoutes from "./routes/contactRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})