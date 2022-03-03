import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PoliceOffice  extends BaseEntity{
  // ----------------------------------------------------------------------------------- //
  @PrimaryGeneratedColumn()
  id: number;
  // ----------------------------------------------------------------------------------- //
  @Column()
  office_name: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  office_city: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  longitude: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  latitude: string;
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
}
