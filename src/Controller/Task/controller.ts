import { Request, Response } from "express";
import { errorResponse } from "../../Routes/Middlewares/Error/errorResponse";
import { taskService } from "../../Model/Task/service";
import { create, update } from "./dto";

export class taskController {
  private service = new taskService();
  async create(req: Request, res: Response) {
    try {
      const { title, description }: create = req.body;

      if (!title || !description) {
        throw new errorResponse(400, "Title and description are required");
      }
      if (title.length < 3) {
        throw new errorResponse(400, "Title must be at least 3 characters");
      }
      if (description.length < 3) {
        throw new errorResponse(
          400,
          "Description must be at least 3 characters"
        );
      }
      try {
        const task = await this.service.create({ title, description });
        return res.status(201).json(task);
      } catch (error: any) {
        throw new errorResponse(500, "Error in Create Task");
      }
    } catch (error: any) {
      throw new errorResponse(
        error.code ?? 500,
        error.message ?? "Internal Server Error"
      );
    }
  }
  async findAll(req: Request, res: Response) {
    try {
      const tasks = await this.service.readAll();
      return res.status(200).json(tasks);
    } catch (error: any) {
      throw new errorResponse(
        error.code ?? 500,
        error.message ?? "Internal Server Error"
      );
    }
  }
  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const task = await this.service.read(id);

      return res.status(200).json(task);

    } catch (error: any) {
      throw new errorResponse(
        error.code ?? 500,
        error.message ?? "Internal Server Error"
      );
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { title, description }: update = req.body;

      const task = await this.service.update({ id, title, description });

      return res.status(200).json(task);
      
    } catch (error: any) {
      throw new errorResponse(
        error.code ?? 500,
        error.message ?? "Internal Server Error"
      );
    }
  }
  async complete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let task = await this.service.read(id);

      task.completed = true;

      task = await this.service.update(task);

      return res.status(200).json(task);

    } catch (error: any) {
      throw new errorResponse(
        error.code ?? 500,
        error.message ?? "Internal Server Error"
      );
    }
  }
  async exclude(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const task = await this.service.delete(id);

      return res.status(200).json(task);

    } catch (error: any) {
      throw new errorResponse(
        error.code ?? 500,
        error.message ?? "Internal Server Error"
      );
    }
  }
}
