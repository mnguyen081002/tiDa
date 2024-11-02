import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { UserEntity } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomHttpException } from "../../common/exception/custom-http.exception";
import { StatusCodesList } from "../../common/constants/status-codes-list.constants";

@Injectable()
export class CoinService {
  private readonly logger: Logger = new Logger(CoinService.name);
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async topup(card_id: string, coin: number) {
    const user = await this.userRepository.findOne({ where: { card_id } });
    if (!user) {
      throw new CustomHttpException({
        code: StatusCodesList.UserNotFound,
        message: "Không tìm thấy người dùng",
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    user.amount_deposited += coin;
    user.current_coin += coin;
    await this.userRepository.save(user);
  }
}
