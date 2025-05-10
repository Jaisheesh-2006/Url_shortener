import path from "path";
import { db } from "../config/db-client.js";
const DATA_FILE = path.join("data", "links.json");

export const loadLinks = async () => {
    const [rows]= await db.execute(`SELECT * FROM short_links`)
    return rows
};

export const saveLinks = async ({url,shortCode}) => {
  await db.execute(`INSERT INTO short_links(short_code,url) values(?,?)`,[
    shortCode,
    url
  ])
};
export const getLinkByShortCode=async (shortcode)=>{
   const [rows]=await db.execute(`
    SELECT * FROM short_links WHERE short_code=? 
    `,[shortcode])

    if(rows.length>0) return rows[0];
    else return null

}
