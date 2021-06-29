import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { CalculateDistanceDto } from './dto/calculate-distance.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find({});
  }

  async getOneLocation(name: string): Promise<Location> {
    const location = await this.locationRepository.findOne({ name });
    if (!location)
      throw new HttpException('Location not found', HttpStatus.NOT_FOUND);
    return location;
  }

  async addLocation(locationDTO: CreateLocationDto): Promise<Location> {
    const location = this.locationRepository.create(locationDTO);
    return this.locationRepository.save(location);
  }

  async calculateDistance(locationDTO: CalculateDistanceDto): Promise<any> {
    const [location1, location2] = await Promise.all([
      this.locationRepository.findOne({ name: locationDTO.location1 }),
      this.locationRepository.findOne({ name: locationDTO.location2 }),
    ]);

    if (!location1)
      throw new HttpException('Location 1 not found', HttpStatus.NOT_FOUND);
    if (!location2)
      throw new HttpException('Location 2 not found', HttpStatus.NOT_FOUND);

    const { lon: lon1, lat: lat1 } = location1.coordinate;
    const { lon: lon2, lat: lat2 } = location2.coordinate;

    return this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  }

  async editLocation(locationDTO: UpdateLocationDto): Promise<any> {
    return this.locationRepository.save(locationDTO);
  }

  async deleteLocation(name: string) {
    return this.locationRepository.delete({ name });
  }

  private getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
