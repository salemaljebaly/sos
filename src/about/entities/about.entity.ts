import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  @ManyToOne(() => User, (user: User) => user.about)
  user : About;

}
