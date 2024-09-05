import { Banners } from "../models/banner";

export async function getAllBanners(req, res) {
// app.get('/api/v1/banners', async (req, res) => {
    try {
      const banners = await Banners.find();
      res.status(200).send(banners);
    } catch (error) {
      res.status(400).send(error);
    }
}