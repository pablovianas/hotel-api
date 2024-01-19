import { Hotel } from "../../entities/hotel";
import { CreateHotel } from "../createHotel";
import { HotelRepository } from "../../../infra/repositories/IHotelRepository";


export class CreateHotelImp implements CreateHotel {

  constructor(
    private readonly hotelRepository: HotelRepository) 
  {}
  async execute(hotel: Hotel): Promise<Hotel> {
    return this.hotelRepository.createHotel(hotel);
  }
}