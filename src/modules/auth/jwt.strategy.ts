import { HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { TokenType } from "../../common/constants/token-type";
import { ApiConfigService } from "../../shared/services/api-config.service";
import type { UserEntity } from "../../entities/user.entity";
import { UserService } from "../user/user.service";
import { RedisClientType } from "redis";
import { CustomHttpException } from "../../common/exception/custom-http.exception";
import { StatusCodesList } from "../../common/constants/status-codes-list.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ApiConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.jwtSecret,
    });
  }

  async validate(args: { sub: string; type: TokenType }): Promise<UserEntity> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new CustomHttpException({
        code: StatusCodesList.TokenNotFound,
        message: "Token không hợp lệ",
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    const user = await this.userService.findOneById(args.sub, false);

    if (!user) {
      throw new CustomHttpException({
        code: StatusCodesList.UserNotFound,
        message: "Không tồn tại tài khoản",
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return user;
  }
}
