// src/visit/dto/create-visit.dto.ts

import {
  IsDateString,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { IsFutureDateIfScheduled } from '../../meetings/dto/checkScheduale';



export class CreateVisitDto {
  @IsOptional()
  @IsDateString()
  date: string;


@IsOptional()
  @IsString()
  inventoryId: string;

  @IsOptional()
  @IsString()
  objections?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
