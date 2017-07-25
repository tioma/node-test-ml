/**
 * Created by Artiom on 21/07/2017.
 */
mlApp.factory('busquedaFactory', ['$http', '$q', 'API_ENDPOINT', 'Item', function($http, $q, API_ENDPOINT, Item){
	"use strict";

	class Busqueda {

		buscar(param){
			const deferred = $q.defer();
			const inserturl = `${API_ENDPOINT}/items`;
			$http.get(inserturl, { params: {q: param} }).then(response => {
				response.data.items = response.data.items.map(itemData => {
					return new Item(itemData);
				});
				deferred.resolve(response.data);
			}).catch(error => {
				console.log(error);
				deferred.reject(error);
			});
			return deferred.promise;
		}

		buscarPorId(id){
			const deferred = $q.defer();
			const inserturl = `${API_ENDPOINT}/items/${id}`;
			$http.get(inserturl).then(response => {
				response.data.item = new Item(response.data.item);
				deferred.resolve(response.data);
			}).catch(error => {
				console.log(error);
				deferred.reject()
			});
			return deferred.promise;
		}

	}

	return new Busqueda();

}]);