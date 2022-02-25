import { Citizen } from "src/citizens/entities/citizen.entity";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReportState, ReportType } from "../enums/reporttype";

@Entity()
export class Report extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "enum", enum: ReportType, default: ReportType.Ambulance })
    type: string;

  
    @Column({ type: "enum", enum: ReportState, default: ReportState.pending })
    state: string;

    // the date created
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    // created when update record
    @Column()
    @UpdateDateColumn()
    updateAt: Date;


    @Column()
    longitude : string

    @Column()
    latitude : string

    //TODO add new files entity in app and make oneToMany relation
    // @Column()
    // files : string

    // OneToMany relation ship between Citizen and Report
    @ManyToOne(() => Citizen, (reporter: Citizen) => reporter.report)
    @Column()
    public reporter : Citizen
}
