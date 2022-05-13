import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Citizen } from "src/citizens/entities/citizen.entity";
import { AR } from "src/locale/ar";
import { User } from "src/users/entities/user.entity";
import { IsNull } from "typeorm";
import { FileTypes, ReportState, ReportType } from "../enums/reporttype";

export class CreateReportDto {
    
    @IsString({message: AR.IsString})
    @ApiProperty({type: String, description: 'desc'})
    desc: string
    
    @IsString({message: AR.IsString})
    @IsEnum(ReportType)
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, enum: ReportType})
    type: string;
    
    

    @IsString({message: AR.IsString})
    @IsEnum(ReportState)
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, enum: ReportState})
    state: string;


    @IsLongitude()
    @ApiProperty({type: String, description: 'longitude'})
    longitude: string

    @IsLatitude()
    @ApiProperty({type: String, description: 'latitude'})
    latitude: string

    // report attach
    @IsOptional()
    @IsString({message: AR.IsString})
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, nullable:true})
    reportFilePath: string;


    
    @IsOptional()
    @IsString({message: AR.IsString})
    @IsEnum(FileTypes)
    @IsNotEmpty({message: AR.IsNotEmpty})
    @ApiProperty({type: String, enum: FileTypes})
    fileType: string;

    reporter : Citizen;

    user : User;
}
