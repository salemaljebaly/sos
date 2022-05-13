import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/auth/enum/role.enum';
import { Report } from 'src/report/entities/report.entity';
import { About } from 'src/about/entities/about.entity';
import { PoliceOffice } from 'src/police-office/entities/police-office.entity';

@Entity()
export class User extends BaseEntity {
  // ----------------------------------------------------------------------------------- //
  @PrimaryGeneratedColumn()
  id: number;
  // ----------------------------------------------------------------------------------- //
  @Column()
  firstName: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  lastName: string;
  // ----------------------------------------------------------------------------------- //
  @Column({ unique: true })
  username: string;
  // ----------------------------------------------------------------------------------- //
  @Column({ unique: true })
  email: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  password: string;
  // ----------------------------------------------------------------------------------- //
  @Column({ default: true })
  isActive: boolean;
  // ----------------------------------------------------------------------------------- //
  // the date created
  @Column()
  @CreateDateColumn()
  createdAt: Date;
  // ----------------------------------------------------------------------------------- //
  // created when update record
  @Column()
  @UpdateDateColumn()
  updateAt: Date;
  // ----------------------------------------------------------------------------------- //
  // encrypt the password before inserted in database
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
  // ----------------------------------------------------------------------------------- //
  // check the password entered is correct
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
  // ----------------------------------------------------------------------------------- //
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role: Role
  // ----------------------------------------------------------------------------------- //
  @OneToMany(() => Report, (report: Report) => report.reporter)
  report : Report[];
  // ----------------------------------------------------------------------------------- //
  @OneToMany(() => About, (about: About) => about.user)
  about : About[];
  // ----------------------------------------------------------------------------------- //
  @OneToMany(() => PoliceOffice, (office: PoliceOffice) => office.user)
  policeOffices : PoliceOffice[];
}
