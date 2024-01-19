import { Request, Response } from 'express';
import { BookRoom } from "../domain/use-cases/bookRoom";
import { CreateRoom } from "../domain/use-cases/createRoom";
import { GetRooms } from "../domain/use-cases/getRooms";

export class RoomController {
  constructor(
    private readonly createRoom: CreateRoom,
    private readonly bookRoom: BookRoom,
    private readonly getRooms: GetRooms
  ){

  }

  async createRoomHandler(req: Request, res: Response): Promise<void> {
    try {
      const hotelId = parseInt(req.params.hotel_id, 10);
      const room = await this.createRoom.execute(hotelId, req.body);
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
  async bookRoomHandler(req: Request, res: Response): Promise<void> {
    try {
      const hotelId = parseInt(req.params.hotel_id, 10);
    
      const reservation = await this.bookRoom.execute(hotelId, req.body);
     
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async getRoomsHandler(req: Request, res: Response): Promise<void> {
    try {
      const hotelId = parseInt(req.params.hotel_id, 10);
      const rooms = await this.getRooms.execute(hotelId);
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

}