import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Location } from './location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'LocationValidator', async: true })
@Injectable()
export class LocationValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async validate(name: string) {
    const location = await this.locationRepository.findOne({ name });
    if (location) return false;
    return true;
  }

  defaultMessage() {
    return 'Location already exists';
  }
}

export function IsUniqueLocation(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      async: true,
      name: 'LocationValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: LocationValidator,
    });
  };
}
