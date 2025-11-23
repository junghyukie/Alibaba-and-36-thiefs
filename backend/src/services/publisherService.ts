import * as PublisherModel from "../models/publisherModel";
import { AppError } from "../utils/appError";

export class PublisherService {
  static async getAll() {
    return PublisherModel.getPublishers();
  }

  static async getById(id: number) {
    const publisher = await PublisherModel.getPublisherById(id);
    if (!publisher) throw new AppError("Publisher not found", 404);
    return publisher;
  }
}