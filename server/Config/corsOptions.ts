export const corsOptions = {
  origin: ["http://localhost:3000", "http://10.10.211.151:3000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
