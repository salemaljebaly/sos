import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class FileTypes extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    key: string;

    @Column()
    fileType: string;
}