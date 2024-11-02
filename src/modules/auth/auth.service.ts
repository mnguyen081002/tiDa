import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { StatusCodesList } from "../../common/constants/status-codes-list.constants";
import { TokenType } from "../../common/constants/token-type";
import { CustomHttpException } from "../../common/exception/custom-http.exception";
import { generateHash, validateHash } from "../../common/utils";

import { UserEntity } from "../../entities/user.entity";
import { UserService } from "../user/user.service";
import type { UserLoginDto } from "./dto/UserLoginDto";
import {
  ManagerRegisterDto,
  MemberRegisterDto,
  StaffRegisterDto as StaffRegisterDto,
} from "./dto/UserRegisterDto";
import { JwtService } from "../jwt/jwt.service";
@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<UserEntity> {
    try {
      const user = await this.userService.findOne(
        {
          phone: userLoginDto.phone,
          role: userLoginDto.role,
        },
        true,
      );

      if (!user) {
        throw new Error("Không tìm thấy tài khoản");
      }

      const isPasswordValid = await validateHash(userLoginDto.password, user.password);

      if (!isPasswordValid) {
        throw new Error("Mật khẩu không đúng");
      }
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new CustomHttpException({
        statusCode: HttpStatus.UNAUTHORIZED,
        code: StatusCodesList.EmailOrPasswordIncorrect,
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const t = await this.verifyToken(TokenType.VERIFY_EMAIL_TOKEN, token);
  }

  private async verifyToken(type: TokenType, token: string) {
    const payload = this.jwtService.verifyToken(token, type);

    return payload;
  }

  // async forgotPassword(body: ForgotPasswordDto): Promise<void> {
  //   const user = await this.userService.findOne({
  //     email: body.email,
  //   });

  //   if (!user) {
  //     throw new CustomHttpException({
  //       statusCode: HttpStatus.NOT_FOUND,
  //       code: StatusCodesList.UserNotFound,
  //       message: "User not found",
  //     });
  //   }
  // }
}
