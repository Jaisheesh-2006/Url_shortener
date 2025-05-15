import { and, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { shortLinksTable } from "../drizzle/schema.js";
import { usersTable } from "../drizzle/schema.js";
// import bcrypt from "bcrypt"
import argon2 from "argon2";
export const loadLinks = async (id) => {
  return await db
    .select()
    .from(shortLinksTable)
    .where(eq(shortLinksTable.userId, id));
};

export const getLinkByShortCode = async (shortCode) => {
  const [result] = await db
    .select()
    .from(shortLinksTable)
    .where(eq(shortLinksTable.shortCode, shortCode));
  return result;
};

export const saveLinks = async ({ url, shortCode, userId }) => {
  await db.insert(shortLinksTable).values({ url, shortCode, userId });
};
export const getUserbyEmail = async (email) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return user;
};

export const insertUser = async ({ name, email, hashedPassword }) => {
  return await db
    .insert(usersTable)
    .values({ name, email, password: hashedPassword })
    .$returningId();
};
export const hashPassword = async (password) => {
  return await argon2.hash(password); //! 10 is standard for iterations
};
export const verifyPassword = async (password, hashedPassword) => {
  return await argon2.verify(hashedPassword, password);
};
export const getLinkById = async (id) => {
  const [link] = await db
    .select()
    .from(shortLinksTable)
    .where(eq(shortLinksTable.id, id));
  return link;
};

export const updateIdData=async({id,url,shortCode,userId})=>{
    const res=await db.update(shortLinksTable).set({url,shortCode}).where(and(eq(shortLinksTable.userId,userId),eq(shortLinksTable.id,id)));
    return res;
}


