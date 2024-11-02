import { Body, Controller, Post } from "@nestjs/common";
import { ResponseDefault } from "../../common/dto/response_default";
import { UserManagementService } from "./user-management.service";
import {
  ManagerRegisterDto,
  MemberRegisterDto,
  StaffRegisterDto,
} from "../auth/dto/UserRegisterDto";
import { UserEntity } from "../../entities/user.entity";
import { Auth } from "../../decorators";
import { UserRole } from "../../common/enum/user-role";

@Controller("user-management")
export class UserManagementController {
  constructor(private userManagementService: UserManagementService) {}

  @Post("/create-staff")
  @Auth([UserRole.ADMIN, UserRole.MANAGER])
  async staffRegister(@Body() staffRegisterDto: StaffRegisterDto) {
    const user = await this.userManagementService.staffRegister(staffRegisterDto);
    return new ResponseDefault("Đăng ký thành công", user.toDto());
  }

  @Post("/create-member")
  @Auth([UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF])
  async memberRegister(@Body() memberRegisterDto: MemberRegisterDto) {
    const user = await this.userManagementService.memberRegister(memberRegisterDto);
    return new ResponseDefault("Đăng ký thành công", user.toDto());
  }

  @Auth([UserRole.ADMIN])
  @Post("/create-manager")
  async managerRegister(@Body() managerRegisterDto: ManagerRegisterDto) {
    const user = await this.userManagementService.managerRegister(managerRegisterDto);
    return new ResponseDefault("Đăng ký thành công", user.toDto());
  }
}
