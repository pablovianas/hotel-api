import { Request, Response } from 'express';
import { CreateHotel } from '../domain/use-cases/createHotel';
import { UpdateHotel } from '../domain/use-cases/updateHotel';

export class HotelController {
  constructor(
    private readonly createHotel: CreateHotel,
    private readonly updateHotel: UpdateHotel,
 
  ) { }
  async createHotelHandler(req: Request, res: Response): Promise<void> {
  
    const body = req.body

    console.log(body)
    try {
      const hotel = await this.createHotel.execute(body)
      res.json(hotel);

    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro interno no servidor' });

    }
  }
  async updateHotelHandler(request: Request, response: Response): Promise<void> {
    const body = request.body
    const hotelId = Number(request.params.id)
    try {
      const hotel = await this.updateHotel.execute(hotelId, body)
      if (hotel) {
        response.json(hotel);
      } else {
        response.status(404).json({ error: 'Hotel não encontrado' });
      }
    } catch (error) {
      response.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}