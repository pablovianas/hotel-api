import { RoomRepository } from "../../../infra/repositories/IRoomRepository";
import { GetRoomsImpl } from "./getRoomsImpl";

describe('Get Room', () => {
    it('should call getRoom with correct values', async () => {
        const roomRepository = new RoomRepository();
        const sut = new GetRoomsImpl(roomRepository);
        roomRepository.getRooms = jest.fn();
        const hotelId = 1;
        await sut.execute(hotelId);
        expect(roomRepository.getRooms).toHaveBeenCalledWith(hotelId);
    });
});