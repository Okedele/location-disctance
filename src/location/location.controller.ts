import { LocationService } from './location.service';
import { CreateLocationDto } from './create-location.dto';
import { UpdateLocationDto } from './update-location.dto';
import { CalculateDistanceDto } from './calculate-distance.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.locationService.findAll();
  }

  @Get('/:name')
  async getOneLocation(@Param('name') name: string): Promise<any> {
    return this.locationService.getOneLocation(name);
  }

  @Post()
  async addLocation(@Body() locationDTO: CreateLocationDto): Promise<any> {
    return this.locationService.addLocation(locationDTO);
  }

  @Post('/distance')
  async calculateDistance(
    @Body() locationDTO: CalculateDistanceDto,
  ): Promise<any> {
    const distance = await this.locationService.calculateDistance(locationDTO);
    return { distance };
  }

  @Put('')
  async editLocation(@Body() locationDTO: UpdateLocationDto): Promise<any> {
    return this.locationService.editLocation(locationDTO);
  }

  @Delete('/:name')
  async deleteLocation(@Param('name') name: string) {
    return this.locationService.deleteLocation(name);
  }
}
