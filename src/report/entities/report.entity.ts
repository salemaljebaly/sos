import { CreateCitizenDto } from 'src/citizens/dto/create-citizen.dto';
import { Citizen } from 'src/citizens/entities/citizen.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileTypes, ReportState, ReportType } from '../enums/reporttype';

@Entity()
export class Report extends BaseEntity {
  // ----------------------------------------------------------------------------------- //
  @PrimaryGeneratedColumn()
  id: number;
  // ----------------------------------------------------------------------------------- //
  @Column()
  desc: string;
  // ----------------------------------------------------------------------------------- //
  @Column({ type: 'enum', enum: ReportType, default: ReportType.FIRE })
  type: string;
  // ----------------------------------------------------------------------------------- //
  @Column({ type: 'enum', enum: ReportState, default: ReportState.PENDING })
  state: string;
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
  @Column()
  longitude: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  latitude: string;
  // ----------------------------------------------------------------------------------- //
  // report attach
  @Column({ nullable: true })
  reportFilePath: string;
  // ----------------------------------------------------------------------------------- //
  // report file type
  @Column({ nullable: true })
  fileType: string;
  // ----------------------------------------------------------------------------------- //
  // OneToMany relation ship between Citizen and Report
  @ManyToOne(() => Citizen, (citizen: Citizen) => citizen.report)
  reporter: CreateCitizenDto;
  // ----------------------------------------------------------------------------------- //
  // OneToMany relation ship between Citizen and Report
  @ManyToOne(() => User, (user: User) => user.report)
  user: CreateUserDto;
  // ----------------------------------------------------------------------------------- //
}
