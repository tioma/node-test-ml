/**
 * Created by Artiom on 21/07/2017.
 */
mlApp.factory('busquedaFactory', ['$http', '$q', 'API_ENDPOINT', function($http, $q, API_ENDPOINT){
	"use strict";

	class Busqueda {

		buscar(param){
			const deferred = $q.defer();
			const inserturl = `${API_ENDPOINT}/items`;
			$http.get(inserturl, { params: {q: param} }).then(response => {
				deferred.resolve(response.data);
			}).catch(error => {
				console.log(error);
				deferred.reject()
			});
			return deferred.promise;
		}

		buscarPorId(id){
			const deferred = $q.defer();
			const inserturl = `${API_ENDPOINT}/items/${id}`;
			$http.get(inserturl).then(response => {
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