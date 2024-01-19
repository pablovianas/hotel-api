
import express from 'express';
import bodyParser from 'body-parser';
import { HotelController } from '../controllers/hotelController';
import { CreateHotelImp } from '../domain/use-cases/implementations/createHotelImpl';
import { UpdateHotelImpl } from '../domain/use-cases/implementations/updateHotelImpl';
import { RoomController } from '../controllers/roomController';
import { CreateHotel } from '../domain/use-cases/createHotel';
import { UpdateHotel } from '../domain/use-cases/updateHotel';
import { BookRoomImpl } from '../domain/use-cases/implementations/bookRoomImpl';
import { GetRoomsImpl } from '../domain/use-cases/implementations/getRoomsImpl';
import { CreateRoomImpl } from '../domain/use-cases/implementations/createRoomImpl';
import { CreateRoom } from '../domain/use-cases/createRoom';
import { BookRoom } from '../domain/use-cases/bookRoom';
import { GetRooms } from '../domain/use-cases/getRooms';
import { HotelRepository } from '../infra/repositories/IHotelRepository';
import { RoomRepository } from '../infra/repositories/IRoomRepository';

export const createExpressApp = (): express.Express => {
  const app = express();

  const PORT = 8080;

  const hotelRepository = new HotelRepository() 
  const roomRepository = new RoomRepository()

  const createHotel: CreateHotel = new CreateHotelImp(hotelRepository);
  const updateHotel: UpdateHotel = new UpdateHotelImpl(hotelRepository);

  const createRoom: CreateRoom = new CreateRoomImpl(roomRepository);
  const bookRoom: BookRoom = new BookRoomImpl(roomRepository);
  const getRooms: GetRooms = new GetRoomsImpl(roomRepository);

  const hotelAdapter = new HotelController(createHotel, updateHotel)
  const roomAdapter = new RoomController(createRoom, bookRoom, getRooms)

  app.use(bodyParser.json());

  app.post('/hotels', (req, res) => hotelAdapter.createHotelHandler(req, res));
  app.put('/hotels/:hotel_id', (req, res) => hotelAdapter.updateHotelHandler(req, res));
  app.post('/hotels/:hotel_id/rooms', (req, res) => roomAdapter.createRoomHandler(req, res));
  app.post('/book/:hotel_id', (req, res) => roomAdapter.bookRoomHandler(req, res));
  app.get('/book/:hotel_id', (req, res) => roomAdapter.getRoomsHandler(req, res));

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
  

  return app;
};
