import { RoomRepository } from "../../../infra/repositories/IRoomRepository";
import { BookRoomImpl } from "./bookRoomImpl";
import { pool } from "../../../infra/adapters/db";
import { HotelRepository } from "../../../infra/repositories/IHotelRepository";
import { CreateHotelImp } from "./createHotelImpl";
import { Hotel } from "../../entities/hotel";

describe('Create hotel', () => {

  afterAll(() => {
    pool.end();
  })

  it('should call createHotel with correct values', async () => {
    const hotelRepository = new HotelRepository();
    const sut = new CreateHotelImp(hotelRepository);
    hotelRepository.createHotel = jest.fn();
    
    const hotel: Hotel = {
      id: 1,
      name: 'any_name',
      address: {
        street: 'any_street',
        zipcode: 'any_zipcode',
        country: 'any_country'
      },
      rooms_available: 10,
      rooms_booked: 0
    }
    await sut.execute(hotel);

    expect(hotelRepository.createHotel).toHaveBeenCalledWith(hotel);
  })
})