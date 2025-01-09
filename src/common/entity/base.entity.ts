import { validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  BaseEntity as OrmBaseEntity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";


export abstract class BaseEntity extends OrmBaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ name: "created_at" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  public deletedAt: Date;

  @Column({ name: "is_deleted", type: "boolean", default: false })
  public isDeleted: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  validate() {
    return validateOrReject(this);
  }
}
