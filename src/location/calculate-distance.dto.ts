import { IsString, IsNotEmpty } from 'class-validator';
export class CalculateDistanceDto {
  @IsString()
  @IsNotEmpty()
  location1: string;
  @IsString()
  @IsNotEmpty()
  location2: string;
}
