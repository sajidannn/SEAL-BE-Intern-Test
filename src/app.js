import express from 'express';
import { config } from 'dotenv';
import ClientError from './exception/ClientError.js';

//routes
import authRoute from './api/auth/auth.routes.js';
import userRoute from './api/users/user.routes.js';

// cors
import cors from 'cors';
import cookieParser from 'cookie-parser';

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

const app = express();
config();
app.use(cors(corsOptions));
const port = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//endpoints
app.use('/auth', authRoute);
app.use('/users', userRoute);

//error handling
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode || 400).json({
      status: 'fail',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    // ubah saat di production
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`App Running At http://localhost:${port}`);
});
