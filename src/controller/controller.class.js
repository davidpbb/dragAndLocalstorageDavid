import Cars from '../model/cars.class'
import View from '../view/view.class'
import Origins from '../model/origins.class';
import '../services/origins.api'


export default class Controller {

    constructor() {

        this.cars = new Cars();
        this.origins = new Origins();

        this.view = new View();

        this.noValidated = [];
        this.validated = [];
        this.validatedCount = 0;
    }

    async init() {

        await Promise.all([

            this.cars.populate(),
            this.origins.populate()
        ]);

        //renderiza el <select>
        this.view.renderOrigins(this.origins.data);

        //se filtra por los validados para renderizarlos
        this.noValidated = this.cars.data.filter(car => !car.validated);

        //se filtra por los validados para contar y guardar en localStorage
        this.validated = this.cars.data.filter(car => car.validated);

        //suma 1 al contador por cada coche validado
        this.validated.forEach(valor => {
            this.validatedCount++;
        });

        //guarda en localStorage el total de coches validados
        localStorage.setItem('total', this.validatedCount);

        //llama a la funcion que actualiza el contador con el valor almacenado en localStorage
        this.view.updateCounter();

        //se ordenan por precio ascendente
        this.noValidated.sort((elem1, elem2) => elem1.price - elem2.price);

        //renderiza los coches
        this.noValidated.forEach(car => {
            this.view.renderCar(car);
        });

        this.view.setCarValidateHandler(this.handleValidatedCar.bind(this));

        this.view.setCarEditHandler(this.handleEditCar.bind(this));

        this.view.setCarRemoveHandler(this.handleRemoveCar.bind(this));

        this.view.setFormSubmitHandler();

        this.view.setFormListeners();

        this.cars.data.forEach(car => {

            if (car.validated == false) {

                this.view.setDragHandler(car);
            }
        });
        
    }

    handleValidatedCar(car) {

        car.classList.add('bg-success');
        this.view.unrenderCar(car, true);
    }

    async handleEditCar(car) {

        const id = car.getAttribute('car-id');
        const obtainedCar = await this.cars.getCarById(id);

        this.view.fillForm(obtainedCar);
    }

    async handleRemoveCar(car) {

        const id = car.getAttribute('car-id');
        this.view.unrenderCar(car, false);
        this.cars.removeCar(id);
    }

}