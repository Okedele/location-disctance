import { OmitType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends OmitType(CreateLocationDto, [
  'name',
] as const) {
  @IsNotEmpty()
  @IsString()
  name: string;
}
