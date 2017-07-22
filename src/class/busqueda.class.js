/**
 * Created by kolesnikov-a on 04/05/2017.
 */
import rp from 'request-promise';

class Busqueda {

	static buscarItems(param){
		const options = {
			uri: `https://api.mercadolibre.com/sites/MLA/search?q=${param}`,
			json: true // Automatically parses the JSON string in the response
		};
		return new Promise((resolve, reject) => {
			rp(options).then(data => {
				console.log(data);
				resolve(data);
			}).catch(error => {
				console.log(error);
				reject(error);
			});
		})
	}
}

export default Busqueda;