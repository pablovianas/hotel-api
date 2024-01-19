import { HotelRepository } from "../../../infra/repositories/IHotelRepository";
import { Hotel } from "../../entities/hotel";
import { UpdateHotelImpl } from "./updateHotelImpl";

describe('Update Hotel', () => {
    it('should call updateHotel with correct values', async () => {
        const hotelRepository = new HotelRepository();
        const sut = new UpdateHotelImpl(hotelRepository);
        hotelRepository.updateHotel = jest.fn();
        const hotelId = 1;
        const hotel: Hotel = {
            id: 1,
            name: "Hotel Test",
            address: {
                street: "Rua Teste",
                zipcode: "00000000",
                country: "Brasil"
            },
            rooms_available: 10,
            rooms_booked: 0
        }
        await sut.execute(hotelId, hotel);
        expect(hotelRepository.updateHotel).toHaveBeenCalledWith(hotelId, hotel);
    });
})