import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsString } from "class-validator";
import { Citizen } from "src/citizens/entities/citizen.entity";
import { FileTypes, ReportState, ReportType } from "../enums/reporttype";

export class CreateReportDto {
    
    @IsString()
    @ApiProperty({type: String, description: 'desc'})
    desc: string
    
    @IsString()
    @IsEnum(ReportType)
    @IsNotEmpty()
    @ApiProperty({type: String, enum: ReportType})
    type: string;
    
    

    @IsString()
    @IsEnum(ReportState)
    @IsNotEmpty()
    @ApiProperty({type: String, enum: ReportState})
    state: string;


    @IsLongitude()
    @ApiProperty({type: String, description: 'longitude'})
    longitude: string

    @IsLatitude()
    @ApiProperty({type: String, description: 'latitude'})
    latitude: string

    // report attach
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String})
    reportFilePath: string;


    
    @IsString()
    @IsEnum(FileTypes)
    @IsNotEmpty()
    @ApiProperty({type: String, enum: FileTypes})
    fileType: string;

    reporter : Citizen
}
