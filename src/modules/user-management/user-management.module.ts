import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserManagementController } from "./user-management.controller";
import { UserEntity } from "../../entities/user.entity";
import { UserManagementService } from "./user-management.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule],
  controllers: [UserManagementController],
  exports: [UserManagementService],
  providers: [UserManagementService],
})
export class UserManagementModule {}
