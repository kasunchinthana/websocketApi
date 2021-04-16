import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    
    @Column()
    id: Number;
    
    @Column()
    first_name: string;
    
    @Column()
    last_name: string;
    
    @Column()
    email: string;
    
    @Column()
    car_make: string;
    
    @Column()
    car_model: string;
    
    @Column()
    vin_number: string;
    
    @Column()
    manufactured_date: string;
    
    @Column()
    age_of_vehicle: string;
  }