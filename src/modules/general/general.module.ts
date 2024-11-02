import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GeneralController } from "./general.controller";
import { UserEntity } from "../../entities/user.entity";
import { GeneralService } from "./general.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [GeneralController],
  exports: [GeneralService],
  providers: [GeneralService],
})
export class UserModule {}
