/**
 * Created by kolesnikov-a on 04/05/2017.
 */
import rp from 'request-promise';
import appConfig from '../config/config';
import Item from './item.class';

class Busqueda {

	static procesarDatosItems(datos, cantidad){
		let fullItems = datos.results.slice(0, cantidad);
		let sortedCategories  = datos.available_filters[0].values.sort((a, b) => {
			return a.results - b.results
		}).map(categorie => {
			return categorie.name;
		});

		let items = [];
		fullItems.forEach(fullItem => {
			let item = new Item(fullItem);
			item.address_city = fullItem.address.state_name;
			items.push(item)
		});

		const response = {
			author: appConfig.author,
			categories: sortedCategories,
			items: items
		};

		return response;
	}

	static buscarItems(param){
		const options = {
			uri: `https://api.mercadolibre.com/sites/MLA/search?q=${param}`,
			json: true
		};
		return new Promise((resolve, reject) => {
			rp(options).then(data => {
				resolve(data);
			}).catch(error => {
				reject(error);
			});
		})
	}

	static verDetalleItem(itemId){
		const optionsItemId = {
			uri: `https://api.mercadolibre.com/items/${itemId}`,
			json: true
		};
		const optionsItemDescription = {
			uri: `https://api.mercadolibre.com/items/${itemId}/description`,
			json: true
		};

		let apiCalls = [rp(optionsItemId), rp(optionsItemDescription)];

		return new Promise((resolve, reject) => {
			Promise.all(apiCalls).then((responses) => {
				const itemData = responses[0];
				const itemDescription = responses[1];

				const item = new Item(itemData);
				item.sold_quantity = itemData.sold_quantity;
				if (itemDescription.text){
					item.description = itemDescription.text
				} else {
					item.description = '';
					itemDescription.plain_text.split('\r\n').forEach((parrafo) => {
						item.description += `<p>${parrafo}</p>`;
					})
				}

				const response = {
					author: appConfig.author,
					item: item
				};
				resolve(response);
			}).catch((error) => {
				reject(error);
			})
		})
	}

	static obtenerCategoria(idCategoria){
		const options = {
			uri: `https://api.mercadolibre.com/categories/${idCategoria}`,
			json: true
		};
		return new Promise((resolve, reject) => {
			rp(options).then(data => {
				const categorias = data.path_from_root.map(categoria => {
					return categoria.name;
				});
				resolve(categorias);
			}).catch(error => {
				reject(error);
			});
		})
	}
}

export default Busqueda;