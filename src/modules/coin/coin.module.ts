import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CoinController } from "./coin.controller";
import { UserEntity } from "../../entities/user.entity";
import { CoinService } from "./coin.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [CoinController],
  exports: [CoinService],
  providers: [CoinService],
})
export class CoinModule {}
