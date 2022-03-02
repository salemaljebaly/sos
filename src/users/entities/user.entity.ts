import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column({unique : true})
    username: string;
  
    @Column({unique : true})
    email : string
    
    @Column()
    password: string;
  
    @Column({ default: true })
    isActive: boolean;

    // the date created
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    // created when update record
    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    // encrypt the password before inserted in database
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 8);
    }

    // check the password entered is correct
    async validatePassword(password: string) : Promise<boolean>{
        console.log(this.password)
        return bcrypt.compare(password, this.password);
    }
}
