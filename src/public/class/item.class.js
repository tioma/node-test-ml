/**
 * Created by Artiom on 24/07/2017.
 */
mlApp.factory('Item', ['$http', '$q', 'API_ENDPOINT', function ($http, $q, API_ENDPOINT) {

	class Item {
		constructor(itemData){
			if (itemData) {
				angular.extend(this, itemData);
				this.getCategory();
			}
		}

		getCategory(){
			const uri = `${API_ENDPOINT}/categorias/${this.category_id}`;
			$http.get(uri).then(response => {
				this.categorias = response.data;
			}).catch(error => {
				this.categorias = [];
			})
		}

		comprar(){
			console.log('no implementado');
		}
	}

	return Item;

}]);