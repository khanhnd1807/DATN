import { Request, Response } from "express";
import multer from "multer";
import uploadService from "../services/uploadServices";

export function uploadController(req: Request, res: Response, next: Function) {
  uploadService.upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(405).send({ error: "avatar invalid" });
    } else if (err) {
      res.status(405).send({ error: "avatar invalid" });
    } else {
      res.status(200).send(req.file!.path);
    }
  });
}
