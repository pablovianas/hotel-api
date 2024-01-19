
## Descrição

O projeto consiste na criação de um sistema de reserva de hotel.

## Tecnologias e requisitos

* NodeJS
* Docker para orquestar o ambiente da aplicação;
* Banco de dados MySQL;
* Testes;
* Mensageria;
* Utilize DDD, Clean Architecture;

## Como rodar o sistema: 

* Após baixar o zip ou git clone, basta rodar usando `npm install`, seguido do comando: `npm start`, porém no arquivo .env é importante mudar o MYSQL_DB_HOST para `localhost` em vez de `db` para ser rodado localmente. Caso for usar o docker, pode manter normalmente.


## Contexto do sistema

#### Administrator
- Cadastrar um novo hotel contendo: nome, endereço e quantidade de quartos disponíveis.
- Cadastrar um novo quarto de hotel contendo: numero do quarto, valor por noite e status (disponível/indisponível).
- Gerir quais quartos estão disponíveis e indisponíveis.

#### Cliente
- Poderá reservar em uma data especifica determinado quarto em determinado hotel se ele estiver disponível.
- Dois clientes não poderão reservar o mesmo quarto numa mesma data.
  
## Design do sistema

### Back-end

API Rest que terá os seguintes endpoints:

* POST /hotels - Realiza a criação de um novo hotel.
```json
{
    "name": "admin@user.com",
    "address": {
      "street": "",
      "zipcode": "",
      "country": "" 
    },
    "rooms_avaliable": 100,
    "rooms_booked": 98
}
```
* PUT /hotels/:hotel_id - Realiza a atualização de um hotel pelo ID.
```json
{
    "name": "admin@user.com",
    "price": {
      "street": "",
      "zipcode": "",
      "country": "" 
    },
    "rooms_avaliable": 150
}
```
* POST /hotels/:hotel_id/rooms - Realiza a criação de um novo quarto no hotel.
```json
{
    "number": 100,
    "price": 80,
    "status": "AVAILABLE" | "UNAVAILABLE"
}
```
* POST book/:hotel_id - Realiza a reserva de um quarto do hotel.
```json
{
    "room_number": 101,
    "start_date": "01/01/2023",
    "end_date": "04/01/2023",
}
```
* GET book/:hotel_id - Realiza a listagem de todos os quartos e respectivos status.
```json
[
    {
        "id": 1,
        "number": 101,
        "status": "AVAILABLE"
    },
    {
        "id": 2,
        "number": 120,
        "status": "UNAVAILABLE"
    }
]
```




