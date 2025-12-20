import { Request, Response } from "express";
import { TopBookResponse } from "../types/topBook";
import { topBookService } from "../services/userService";

export const topBookController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const period = req.query.period as string | undefined;
    const result: TopBookResponse = await topBookService(period);

    if (!result.success) {
      console.log("Lỗi controller");
      return res.status(400).json(result);
    }

    return res.status(200).json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
      data: null
    });
  }
};

