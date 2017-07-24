/**
 * Created by Artiom on 22/07/2017.
 */

function obtenerCantidadDecimales(precio){
	const numeroSeparado = precio.toString().split('.');
	if (numeroSeparado.length > 1){
		return numeroSeparado[1].length;
	} else {
		return 0;
	}
}

class Item {
	constructor(itemData = null){
		if (itemData) this.setData(itemData);
	}

	setData(itemData){
		this.id = itemData.id;
		this.title = itemData.title;
		this.price = {
			currency: itemData.currency_id,
			amount: itemData.price,
			decimals: obtenerCantidadDecimales(itemData.price)
		};
		this.picture = itemData.thumbnail;
		this.condition = itemData.condition;
		this.free_shipping = itemData.shipping.free_shipping;
	}


}

export default Item;