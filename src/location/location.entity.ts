import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Coordinate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lon: number;

  @Column()
  lat: number;
}

@Entity()
export class Location {
  @PrimaryColumn()
  name: string;

  @Column()
  description: string;

  @Column()
  website: string;

  @Column()
  phone: string;

  @Column()
  contactPerson: string;

  @OneToOne(() => Coordinate, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  coordinate: Coordinate;

  @Column({ default: true })
  isActive: boolean;
}
