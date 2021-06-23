import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from './location.service';
import { Location, Coordinate } from './location.entity';
import { LocationValidator } from './location.validation';
import { LocationController } from './location.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Coordinate])],
  providers: [LocationService, LocationValidator],
  controllers: [LocationController],
})
export class LocationModule {}
