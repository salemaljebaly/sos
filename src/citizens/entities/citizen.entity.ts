import { BeforeInsert, Column, CreateDateColumn, Long, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

export class Citizen {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    username: string;
  
    @Column()
    email : string

    @Column()
    phone : string
    
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
        return bcrypt.compare(password, this.password);
    }

    @Column()
    city : string

    @Column()
    longitude : string

    @Column()
    latitude : string
}
