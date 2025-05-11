import pkg from "@prisma/client"
const { PrismaClient }=pkg;
const prisma=new PrismaClient()
export const loadLinks = async () => {
    // const [rows]= await db.execute(`SELECT * FROM short_links`)
    // return rows

    const links=await prisma.shortlink.findMany()
    return links
};

export const getLinkByShortCode=async (shortcode)=>{
//    const [rows]=await db.execute(`
//     SELECT * FROM short_links WHERE short_code=? 
//     `,[shortcode])

    const Link=await prisma.shortlink.findUnique({
        where:{shortCode:shortcode}
    })
    // console.log(shortLink)
    return Link
}
export const saveLinks = async ({url,shortCode}) => {
//   await db.execute(`INSERT INTO short_links(short_code,url) values(?,?)`,[
//     shortCode,
//     url
//   ])

await prisma.shortlink.create({
    data:{shortCode,url}
})
};