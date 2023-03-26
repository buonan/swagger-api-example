import { Get, Route } from "tsoa";

interface PingResponse {
  message: string;
}

@Route("")
export default class HelloController {
  @Get("/")
  public async getHello(): Promise<PingResponse> {
    return {
      message: "Hello World!",
    };
  }
}
