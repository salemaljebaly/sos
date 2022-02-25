import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, Long, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Report } from "src/report/entities/report.entity";

@Entity()
export class Citizen extends BaseEntity{

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

    @OneToMany(() => Report, (report: Report) => report.reporter)
    public report : Report;
}
