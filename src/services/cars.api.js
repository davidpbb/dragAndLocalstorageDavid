const URL = 'http://localhost:3000/cars'


export async function getDBCars() {
    
    const respuesta = await fetch(URL);
    return await respuesta.json();
}

export async function getDBCar(id) {

    const respuesta = await fetch(`${URL}?id=${id}`);
    return await respuesta.json();
}

export async function removeDBCar(id) {

    const respuesta = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
    return await respuesta.json();
}

export async function validateDBCar(libro, value) {
    
    const respuesta = await fetch(`${URL}/${libro.id}`, {
        method: 'PATCH',
        body: JSON.stringify({validated: value}),
        headers: {'Content-Type': 'application/json'}
    });
    return await respuesta.json();
}