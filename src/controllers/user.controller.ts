import {
  Get, Route, Controller, Security,
  Post, Body, Path, Put, Delete,
} from "tsoa";
import UserService from '../services/user.service';
import { IUser } from '../models/user.model';

@Route("users")
@Security("api-key")
export class HelloController extends Controller {
  private service = new UserService();

  @Post("/")
  public async create(@Body() body: IUser): Promise<IUser> {
    return this.service.create(body);
  }

  @Get("/")
  public async getAll(): Promise<IUser[]> {
    return this.service.getAll();
  }

  @Get("{id}")
  public async getOne(@Path() id: string): Promise<IUser | null> {
    return this.service.getOne(id);
  }

  @Put("{id}")
  public async update(@Path() id: string, @Body() body: IUser): Promise<IUser | null> {
    return this.service.update(id, body);
  }

  @Delete("{id}")
  public async delete(@Path() id: string): Promise<void> {
    this.service.delete(id);
  }
}
