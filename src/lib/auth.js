import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// DB setup
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db("Job_Hunt");

// Email service


export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  // AUTH CONFIG
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        input: true,
      },
      plan: {
        defaultValue: "seeker_free",
      },
    },
  },
//  plugins: [admin()],
  // SOCIAL LOGIN
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});
