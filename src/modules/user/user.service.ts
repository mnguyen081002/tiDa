import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { FindOptionsWhere } from "typeorm";
import { Repository } from "typeorm";

import {
  ManagerRegisterDto,
  MemberRegisterDto,
  StaffRegisterDto,
  UserRegisterDto,
} from "../auth/dto/UserRegisterDto";
import { UserEntity } from "../../entities/user.entity";
import { CustomHttpException } from "../../common/exception/custom-http.exception";
import { StatusCodesList } from "../../common/constants/status-codes-list.constants";
import { generateHash } from "../../common/utils";
import { UserRole } from "../../common/enum/user-role";

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOneById(id: string, password: boolean = false): Promise<UserEntity | null> {
    const u = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!u) {
      throw new CustomHttpException({
        code: StatusCodesList.UserNotFound,
        message: "Không tìm thấy người dùng",
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    if (!password) delete u.password;

    return u;
  }

  async findOne(
    findData: FindOptionsWhere<UserEntity>,
    password: boolean = false,
    settings: boolean = true,
  ): Promise<UserEntity | null> {
    const u = await this.userRepository.findOne({
      where: findData,
    });

    if (!password) delete u.password;

    if (!u) {
      throw new CustomHttpException({
        code: StatusCodesList.UserNotFound,
        message: "Không tìm thấy người dùng",
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return u;
  }

  deleteUserById(id: number) {
    return this.userRepository.delete(id);
  }

  async findByUsernameOrEmail(
    options: Partial<{ username: string; email: string }>,
  ): Promise<UserEntity | null> {
    const queryBuilder = this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.settings", "settings");

    if (options.email) {
      queryBuilder.orWhere("user.email = :email", {
        email: options.email,
      });
    }

    if (options.username) {
      queryBuilder.orWhere("user.username = :username", {
        username: options.username,
      });
    }

    return queryBuilder.getOne();
  }

  async createStaff(staffRegisterDto: StaffRegisterDto): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({
      where: {
        phone: staffRegisterDto.phone,
      },
    });
    const hashPassword = generateHash(staffRegisterDto.password);

    if (!findUser) {
      const user = this.userRepository.create({ ...staffRegisterDto, password: hashPassword });
      return await this.userRepository.save(user);
    }

    throw new CustomHttpException({
      code: StatusCodesList.EmailAlreadyExists,
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Số điện thoại ${staffRegisterDto.phone} đã tồn tại`,
    });
  }

  async createMember(memberRegisterDto: MemberRegisterDto): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({
      where: {
        phone: memberRegisterDto.phone,
      },
    });
    const hashPassword = generateHash(memberRegisterDto.password);

    if (!findUser) {
      const user = this.userRepository.create({ ...memberRegisterDto, password: hashPassword });
      return await this.userRepository.save(user);
    }

    throw new CustomHttpException({
      code: StatusCodesList.EmailAlreadyExists,
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Số điện thoại ${memberRegisterDto.phone} đã tồn tại`,
    });
  }

  async createManager(managerRegisterDto: ManagerRegisterDto): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({
      where: {
        phone: managerRegisterDto.phone,
      },
    });
    const hashPassword = generateHash(managerRegisterDto.password);

    if (!findUser) {
      const user = this.userRepository.create({ ...managerRegisterDto, password: hashPassword });
      return await this.userRepository.save(user);
    }

    throw new CustomHttpException({
      code: StatusCodesList.EmailAlreadyExists,
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Số điện thoại ${managerRegisterDto.phone} đã tồn tại`,
    });
  }

  async findManagerByPhone(phone: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        phone,
        role: UserRole.MANAGER,
      },
    });
  }

  async findStaffByPhone(phone: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        phone,
        role: UserRole.STAFF,
      },
    });
  }

  async findMemberByPhone(phone: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        phone,
        role: UserRole.MEMBER,
      },
    });
  }

  async findMemberByCardId(cardId: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: {
        card_id: cardId,
      },
    });
  }
}
