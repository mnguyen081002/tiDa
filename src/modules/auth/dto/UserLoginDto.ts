import { IsEmail, IsString, IsNotEmpty, IsEnum } from "class-validator";
import { UserRole } from "../../../common/enum/user-role";

export class UserLoginDto {
  @IsString()
  readonly phone: string;

  @IsString()
  readonly password: string;

  @IsEnum(UserRole)
  readonly role: UserRole;

  // @IsString()
  // @IsNotEmpty()
  // readonly requestFrom: string;
}
