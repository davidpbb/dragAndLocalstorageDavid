export default class Car {

    constructor({id, name, km, price, validated, origin, motor, img = 'nofoto.jpg'}) {

        this.id = id;
        this.name = name;
        this.km = km;
        this.price = price;
        this.validated = validated;
        this.origin = origin;
        this.motor = motor;
        this.img = img;
    }
}