import { Body, Controller, Post, Req } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/UserLoginDto";
import { JwtService } from "../jwt/jwt.service";
import { ResponseDefault } from "../../common/dto/response_default";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post("/login")
  async login(@Body() userLoginDto: UserLoginDto) {
    const userEntity = await this.authService.login(userLoginDto);
    const token = await this.jwtService.generateAuthToken(userEntity);
    return new ResponseDefault("Đăng nhập thành công", {
      user: userEntity.toDto(),
      token,
    });
  }
}
