import crypto from "crypto";
import { getLinkByShortCode, loadLinks, saveLinks } from "../services/shortener.services.js";
// import { getLinkByShortCode, loadLinks, saveLinks } from "../models/shortener.model.js";

export const getShortenerPage = async (req, res) => {
  try {
    const links = await loadLinks();
    console.log(links)
    return res.render("index", { links, host: req.host });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const link= await getLinkByShortCode(finalShortCode)

    if (link) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another.");
    }

    await saveLinks({url,shortCode:finalShortCode});
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
    const link= await getLinkByShortCode(shortCode)
    if (!link) return res.status(404).send("404 error occurred");

    return res.redirect(link.url);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};
