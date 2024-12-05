import * as OriginsApi from '../services/origins.api'
import Origin from '../model/origin.class'

export default class Origins {

    constructor() {

        this.data = [];

    }

    async populate() {

		const datos = await OriginsApi.getDBOrigins();
		this.data = datos.map(valor => new Origin(valor));
	}



}