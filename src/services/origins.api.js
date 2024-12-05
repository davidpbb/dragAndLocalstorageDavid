const URL = 'http://localhost:3000/origins';

export async function getDBOrigins() {

    const respuesta = await fetch(URL);
    return await respuesta.json();
}
