import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user/user.service";
import {
  ManagerRegisterDto,
  MemberRegisterDto,
  StaffRegisterDto,
} from "../auth/dto/UserRegisterDto";
import { UserEntity } from "../../entities/user.entity";

@Injectable()
export class UserManagementService {
  private readonly logger: Logger = new Logger(UserManagementService.name);
  constructor(private userService: UserService) {}

  async staffRegister(staffRegisterDto: StaffRegisterDto): Promise<UserEntity> {
    const user = await this.userService.createStaff(staffRegisterDto);
    return user;
  }

  async memberRegister(memberRegisterDto: MemberRegisterDto): Promise<UserEntity> {
    const user = await this.userService.createMember(memberRegisterDto);
    return user;
  }

  async managerRegister(managerRegisterDto: ManagerRegisterDto): Promise<UserEntity> {
    const user = await this.userService.createManager(managerRegisterDto);
    return user;
  }
}
