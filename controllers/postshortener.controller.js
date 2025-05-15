import crypto from "crypto";
import {
  getLinkByShortCode,
  loadLinks,
  saveLinks,
  getLinkById,
  updateIdData,
} from "../services/shortener.services.js";
import z from "zod";
// import { getLinkByShortCode, loadLinks, saveLinks } from "../models/shortener.model.js";

export const getShortenerPage = async (req, res) => {
  try {
    if (!req.user) return res.redirect("/user/login");
    const links = await loadLinks(req.user.id);
    // console.log(links)
    return res.render("index", {
      links,
      host: req.host,
      errors: req.flash("errors"),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const link = await getLinkByShortCode(finalShortCode);

    if (link) {
      // return res
      //   .status(400)
      //   .send("Short code already exists. Please choose another.");
      req.flash("errors", "Short code already exists. Please choose another.");
      return res.redirect("/");
    }

    await saveLinks({ url, shortCode: finalShortCode, userId: req.user.id });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    // const links = await loadLinks();
    const link = await getLinkByShortCode(shortCode);
    if (!link) return res.status(404).send("404 error occurred");

    return res.redirect(link.url);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

export const getEditShortenerPage = async (req, res) => {
  if (!req.user) return res.redirect("/user/login");
  const { userId,id } = req.params;
  const { data, errors } = z.coerce.number().int().positive().safeParse(id);
  if (errors) return res.redirect("/404");
  try {
    const shortLink = await getLinkById(data);
    if (!shortLink) res.redirect("/404");
    return res.render('edit-index',{
      id:shortLink.id,
      url:shortLink.url,
      shortCode:shortLink.shortCode,
      errors:req.flash("errors"),
      userId:userId
    })
  } catch (err) {
    // console.log(err.code)
    
    // console.error(err);
    return res.status(500).send("Internal server error");
  }
};

export const postEditShortenerPage=async(req,res)=>{
if (!req.user) return res.redirect("/user/login");
  const { userId,id } = req.params;
  const { data, errors } = z.coerce.number().int().positive().safeParse(id);
  if (errors) return res.redirect("/404");
  try {
    const {url,shortCode}=req.body
     const link = await getLinkByShortCode(shortCode);
    if (link) {
      if(link.id==id) return res.redirect("/")
      req.flash("errors", "Short code already exists. Please choose another.");
      return res.redirect(`/edit/${userId}/${id}`);
    }
    const shortLink = await updateIdData({id,url,shortCode,userId});
    res.redirect('/')
    } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
}


