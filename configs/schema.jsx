// import { integer, jsonb, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// export const Ideas = pgTable('ideas' , {
//     id:serial('id').primaryKey(),
//     content:varchar('content').notNull(),
//     name:varchar('name').notNull(),
//     vote:integer('vote').default(0),
//     createdAt : varchar('createdAt').notNull(),
//     comments: jsonb("comments").default([]), 
// })

import { integer, jsonb, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Ideas = pgTable("ideas", {
  id: serial("id").primaryKey(),
  content: varchar("content").notNull(),
  name: varchar("name").notNull(),
  vote: integer("vote").default(0),
  createdAt: varchar("createdAt").notNull(),
  comments: jsonb("comments").default([]),
  fileUrl: varchar("fileUrl"),
  fileType: varchar("fileType"), // Add this line
});
