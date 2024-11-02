import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  ValidationPipe,
} from "@nestjs/common";

import { Auth, AuthUser, UUIDParam } from "../../decorators";
import { UserEntity } from "../../entities/user.entity";
import { UserService } from "./user.service";
import { ResponseDefault } from "../../common/dto/response_default";
import { UserRole } from "../../common/enum/user-role";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Auth()
  @Get("/me")
  getCurrentUser(@AuthUser() user: UserEntity) {
    return new ResponseDefault("Lấy thông tin thành công", user.toDto());
  }

  @Get("/info/:id")
  async getUserInfo(@Param("id") id: string) {
    const user = await this.userService.findOne({ id });
    return new ResponseDefault("Lấy thông tin thành công", user.toDto());
  }

  @Get("/info-by-card-id")
  async getUserInfoByCardId(@Query("cardId") card_id: string) {
    const user = await this.userService.findOne({ card_id, role: UserRole.MEMBER });
    return new ResponseDefault("Lấy thông tin thành công", user.toDto());
  }

  @Get("/info-by-phone")
  async getUserInfoByPhone(@Query("phone") phone: string) {
    const user = await this.userService.findOne({ phone });
    return new ResponseDefault("Lấy thông tin thành công", user.toDto());
  }
}
