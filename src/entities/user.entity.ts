import { Column, Entity, OneToOne, OneToMany, ManyToMany } from "typeorm";
import { BaseEntity } from "../common/abstract.entity";
import { UserRole } from "../common/enum/user-role";
import { VirtualColumn } from "../decorators";
import { MemberRank } from "../common/enum/member-rank";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ enum: UserRole, default: UserRole.MEMBER })
  role: UserRole;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  address?: string;
  // ================== Staff ==================

  @Column({ nullable: true })
  shift?: string;

  // ================== Member ==================

  @Column({ nullable: true })
  card_id?: string;

  @Column({ nullable: true })
  cccd?: string;

  @Column({ nullable: true })
  birthday?: Date;

  @Column({ nullable: true })
  isMale?: boolean;

  @Column({ nullable: true })
  amount_deposited?: number;

  @Column({ nullable: true })
  current_coin?: number;

  @Column({ nullable: true })
  current_point?: number;

  @Column({ nullable: true, enum: MemberRank, default: MemberRank.MEMBER })
  member_rank?: MemberRank;

  toDto() {
    delete this.password;
    return {
      ...this,
    };
  }
}
