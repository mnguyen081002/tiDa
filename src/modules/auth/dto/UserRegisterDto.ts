import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Length,
  MinLength,
} from "class-validator";
import { Column } from "typeorm";

import { Trim } from "../../../decorators/transform.decorators";

export interface UserRegisterDto {}
export class StaffRegisterDto implements UserRegisterDto {
  @IsString()
  @Trim()
  @IsOptional()
  readonly fullName: string;

  @IsString()
  @MinLength(6, {
    message: "Mật khẩu quá ngắn",
  })
  readonly password: string;

  @IsPhoneNumber("VN")
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  shift: string;
}

export class ManagerRegisterDto {
  @IsString()
  @Trim()
  @IsOptional()
  readonly fullName: string;

  @IsString()
  @MinLength(6, {
    message: "Mật khẩu quá ngắn",
  })
  readonly password: string;

  @IsString()
  @IsPhoneNumber("VN", {
    message: "Số điện thoại không hợp lệ",
  })
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export class MemberRegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 30, {
    message: "Tên phải có độ dài từ 8 đến 30 ký tự",
  })
  @Trim()
  readonly fullName: string;

  @IsString()
  @MinLength(6, {
    message: "Mật khẩu quá ngắn",
  })
  readonly password: string;

  @IsPhoneNumber("VN")
  phone: string;

  @IsEmail({}, { message: "Email không hợp lệ" })
  email: string;

  @IsString()
  card_id: string;

  @IsString()
  cccd: string;

  @IsDate()
  birthday: Date;

  @IsBoolean()
  isMale: boolean;

  @IsNumber()
  @IsPositive()
  amount_deposited: number;

  @IsNumber()
  @IsPositive()
  current_coin: number;

  @IsNumber()
  @IsPositive()
  current_point: number;
}
