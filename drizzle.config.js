/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./configs/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_M0e5BKJUfZwS@ep-square-field-a58hkyfa-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
};
