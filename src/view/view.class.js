export default class View {

    constructor() {

        this.originsSelect = document.getElementById('origin');
        this.cars = document.getElementById('cars');
        this.form = document.getElementById('form-car');
        this.errors = document.getElementById('errores');
        this.total = document.getElementById('total');
        this.singleCars = document.getElementsByClassName('card-body');
        this.formDiv = document.getElementsByClassName('col-sm-3')[0];
    }

    renderOrigins(origins) {

        origins.forEach(origin => {

            const option = document.createElement('option');
            option.value = origin.id;
            option.textContent = origin.descrip;
            this.originsSelect.appendChild(option);
        });
    }

    renderCar(car) {

        let origin;
        switch(car.origin) {

            case 1:
                origin = 'Particular'
                break;
            case 2:
                origin = 'Concesionario'
                break;
            case 3:
                origin = 'Empresa'
                break;
            case 4:
                origin = 'Flota'
                break;
            case 5:
                origin = 'Profesional'
                break;
            default:
                origin = 'No establecido'
                break;
        }

        const revisado = car.motor ? 'Revisado' : 'No revisado';
        const revisadoClass = car.motor ? 'bg-secondary' : 'bg-danger';

        const renderedCar = document.createElement('div');
        renderedCar.className = 'card h-100';
        renderedCar.setAttribute('car-id', car.id);
        renderedCar.setAttribute('draggable', true);
        renderedCar.innerHTML = `
        
            <img class="card-img-top" src="assets/photos/${car.img}" alt="${car.name}" />
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">${car.name}</h5>
                    <p>${car.price} €</p>
                    <p>${origin}</p>
                    <p>${car.km} km</p>
                    <p class="${revisadoClass}">${revisado}</p>
                </div>
                <button class="btn btn-sm btn-success"><span
                class="material-icons">check</span></button>
                <button class="btn btn-sm btn-success"><span
                class="material-icons">edit</span></button>
                <button class="btn btn-sm btn-success"><span
                class="material-icons">delete</span></button>
            </div>
        
        `;
        this.cars.appendChild(renderedCar);
    }

    unrenderCar(car, timeout) {

        if (timeout) {

            setTimeout(() => {

                this.cars.removeChild(car);
            }, 3000);
        } else {
            this.cars.removeChild(car);
        }
        
    }

    fillForm(car) {

        car = car[0];

        document.getElementById('id').value = car.id;
        document.getElementById('id').disabled = true;
        
        document.getElementById('name').value = car.name;
        document.getElementById('km').value = car.km;

        document.getElementById('price').value = car.price;
        document.getElementById('origin').value = car.origin;

        document.getElementById('img').value = car.img;
        document.getElementById('img').disabled = true;

        Array.from(document.getElementsByName('motor')).forEach(radio => {

            if (Boolean(radio.value) == car.motor) {radio.checked = true;}
        });

    }

    setCarValidateHandler(callback) {

        document.querySelectorAll('.card').forEach(card => {

            const botones = card.querySelectorAll('.btn');

            botones[0].addEventListener('click', event => {

                let disparador = event.target.closest('.card');

                callback(disparador);
            });
        });

    }

    setCarEditHandler(callback) {

        document.querySelectorAll('.card').forEach(card => {

            const botones = card.querySelectorAll('.btn');

            botones[1].addEventListener('click', event => {

                let disparador = event.target.closest('.card');

                callback(disparador);
            });
        });

    }

    setCarRemoveHandler(callback) {

        document.querySelectorAll('.card').forEach(card => {

            const botones = card.querySelectorAll('.btn');

            botones[2].addEventListener('click', event => {

                let disparador = event.target.closest('.card');

                callback(disparador);
            });
        });

    }

    setFormSubmitHandler() {

        const name = document.getElementById('name');
        let nameError = document.createElement('p');

        const km = document.getElementById('km');
        let kmError = document.createElement('p');

        const radios = document.getElementsByName('motor');
        let radiosError = document.createElement('p');

        const price = document.getElementById('price');
        let priceError = document.createElement('p');

        const origin = document.getElementById('origin');
        let originError = document.createElement('p');


        this.form.addEventListener('submit', event => {

            if (!this.form.checkValidity()) {

                event.preventDefault();

                
                nameError.textContent = this.customErrorValidationMessage(name)
                kmError.textContent = this.customErrorValidationMessage(km)
                priceError.textContent = this.customErrorValidationMessage(price)
                originError.textContent = this.customErrorValidationMessage(origin)
                
                const errors = [nameError, kmError, radiosError, priceError, originError]
                
                errors.forEach(element => {this.errors.appendChild(element);});

            }
        });
    }

    customErrorValidationMessage(input) {

        const etiqueta = input.parentElement.parentElement.childNodes[1].textContent;

        if (input.validity.valueMissing) {
            return `${etiqueta} El campo es obligatorio`;
        }

        if (input.validity.tooShort) {
            return `${etiqueta} Debe tener al menos ${input.minLength} caracteres` 
        }

        if (input.validity.rangeUnderflow) {
            return `${etiqueta} Debe tener un valor mayor a ${input.min}`
        }
        
        return '';
    }

    //exercisi drag, local i sessionstorage

    updateCounter() {

        this.total.innerHTML = localStorage.getItem('total') == null ? 0 : localStorage.getItem('total');;
    }

    setFormListeners() {

        this.formDiv.addEventListener('dragover', event => {
            event.preventDefault();
        });

        this.formDiv.addEventListener('drop', event => {

            event.preventDefault();

            document.getElementById('id').value = event.dataTransfer.getData('car-id');
            document.getElementById('name').value = event.dataTransfer.getData('car-name');
            document.getElementById('km').value = event.dataTransfer.getData('car-km');

            if (event.dataTransfer.getData('car-motor') == 'true') {

                document.getElementById('radio-true').checked = true;
            } else {

                document.getElementById('radio-false').checked = true;
            }

            document.getElementById('price').value = event.dataTransfer.getData('car-price');
            document.getElementById('origin').value = event.dataTransfer.getData('car-origin');
            document.getElementById('img').value = event.dataTransfer.getData('car-photo');

        });

    }

    setDragHandler(car) {

        const carDiv = document.querySelector(`[car-id="${car.id}"]`);

        carDiv.addEventListener('dragstart', event => {

            event.dataTransfer.setData('car-id', car.id);
            event.dataTransfer.setData('car-name', car.name);
            event.dataTransfer.setData('car-km', car.km);
            event.dataTransfer.setData('car-motor', car.motor);
            event.dataTransfer.setData('car-price', car.price);
            event.dataTransfer.setData('car-origin', car.origin);
            event.dataTransfer.setData('car-photo', car.img);

        });

    }




}