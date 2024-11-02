import { Body, Controller, Param, Post } from "@nestjs/common";
import { ResponseDefault } from "../../common/dto/response_default";
import { CoinService } from "./coin.service";
import { Auth } from "../../decorators";
import { UserRole } from "../../common/enum/user-role";

@Controller("coin")
export class CoinController {
  constructor(private coinService: CoinService) {}

  @Auth([UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF])
  @Post("/deposit/:card_id")
  async depositCoin(@Param("card_id") card_id: string, @Body() body: { coin: number }) {
    await this.coinService.topup(card_id, body.coin);
    // TODO: Update total coin in system
    return new ResponseDefault("Nạp tiền thành công");
  }
}
