import { Hotel } from "../../entities/hotel";
import { UpdateHotel } from "../updateHotel";
import { HotelRepository } from "../../../infra/repositories/IHotelRepository";


export class UpdateHotelImpl implements UpdateHotel{
  constructor(
    private readonly hotelRepository: HotelRepository
  ){}
  async execute(hotelId: number, hotel: Hotel): Promise<Hotel | null> {
    return this.hotelRepository.updateHotel(hotelId, hotel);
  }
}