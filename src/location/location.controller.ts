import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CalculateDistanceDto } from './dto/calculate-distance.dto';
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
    const locations = await this.locationService.findAll();
    return {
      status: 'success',
      message: 'Locations retrieved successfuly',
      data: locations,
    };
  }

  @Get('/:name')
  async getOneLocation(@Param('name') name: string): Promise<any> {
    const location = await this.locationService.getOneLocation(name);
    return {
      status: 'success',
      message: `Location with name ${name} gotten successfully`,
      data: location,
    };
  }

  @Post()
  async addLocation(@Body() locationDTO: CreateLocationDto): Promise<any> {
    const location = await this.locationService.addLocation(locationDTO);
    return {
      status: 'success',
      message: 'Location added successfully',
      data: location,
    };
  }

  @Post('/distance')
  async calculateDistance(
    @Body() locationDTO: CalculateDistanceDto,
  ): Promise<any> {
    const distance = await this.locationService.calculateDistance(locationDTO);
    return {
      status: 'success',
      message: 'Distance calculated successfully',
      data: distance,
    };
  }

  @Put('')
  async editLocation(@Body() locationDTO: UpdateLocationDto): Promise<any> {
    const edit_location = await this.locationService.editLocation(locationDTO);
    return {
      status: 'success',
      message: 'Location edited successfully',
      data: edit_location,
    };
  }

  @Delete('/:name')
  async deleteLocation(@Param('name') name: string) {
    await this.locationService.deleteLocation(name);
    return { status: 'success', message: 'Location deleted successfully' };
  }
}
