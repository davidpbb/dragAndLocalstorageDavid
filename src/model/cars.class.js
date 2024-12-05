import * as CarsApi from '../services/cars.api'
import Car from './car.class';

export default class Cars {

    constructor() {

        this.data = [];
    }


    async populate() {

		const datos = await CarsApi.getDBCars();
		this.data = datos.map(valor => new Car(valor));
	}

    async getCarById(id) {

        return await CarsApi.getDBCar(id);
    }

    async removeCar(id) {

        const index = this.data.findIndex(car => car.id == id);
        this.data.splice(index, 1);
        
        return await CarsApi.removeDBCar(id);

    }


}