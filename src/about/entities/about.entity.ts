import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class About extends BaseEntity {
  // ----------------------------------------------------------------------------------- //
  @PrimaryGeneratedColumn()
  id: number;
  // ----------------------------------------------------------------------------------- //
  @Column()
  key: string;
  // ----------------------------------------------------------------------------------- //
  @Column()
  value: string;
  // ----------------------------------------------------------------------------------- //
}
