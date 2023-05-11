var temaSopa="";
var inicio=0;
var timeout=0;
let animales = ["FOCA","BURRO", "OSO", "CABALLO", "BALLENA", "CISNE","ZORRO", "PULPO","LOBO", "TIGRE", "TORO", "CEBRA"];
let frutas = [ "BANANO", "MANZANA", "NARANJA","FRESA", "CEREZA","MANGO", "KIWI", "PERA", "MORA", "COCO", "PIÑA","UVAS"];
let capitales = ["QUITO","KABUL", "VIENA","OSLO","LONDRES", "MADRID", "LISBOA", "ROMA", "ATENAS","TOKIO","LIMA", "ARGEL"];
let letras=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z'];
let crear = 0;
//var contador =  0;
function generarTablero(filas, col,array) {
	if(crear==0){
		var imagen = document.getElementById("imagen").innerHTML='<img src="./imagenes/teclado.jpeg" width="290" height="150"/>';
		ponerPalabras(array);
		var tabla = document.getElementById("tabla");
		tabla.style.cssText='width: 538px;height: 538px;padding-left: 90px;padding-top: 50px;padding-bottom: 50px; margin-left: 90px; margin-top: 50px;padding-right: 0px;float: left; background-color: white; position: relative;';
		var contenedor = document.getElementById("contenedor");
		contenedor.style.setProperty('--grid-rows', filas);
		contenedor.style.setProperty('--grid-cols', col);
		for (i = 0; i < (filas * col); i++) {
			let celda = document.createElement("DIV");
			celda.style.cssText='height: 1px; width: 1px; background-color: white;';
			celda.id=i+1;
			if(celda.id % 16==0 || celda.id >= 240){
				celda.innerHTML="1";
			}
			else{
				celda.innerHTML="0";
			}
			contenedor.appendChild(celda).className = "grid-item";
		}
		tabla.appendChild(contenedor);
		crear++;
		colocarPalabrasH(array);
		colocarPalabrasV(array);
		rellenar();
	}
	else{
		cambiarPalabras(array);
		limpiarPalabras();
		colocarPalabrasH(array);
		colocarPalabrasV(array);
		rellenar();
	}  
}
//Función encargada de quitar las palabras mostradas en la sopa, poner 0 y 1 según corresponda.
function limpiarPalabras(){
	for(j=1; j<=256 ; j++){
		let celda = document.getElementById(j.toString());
		if(celda.id % 16==0 || celda.id >= 240){
			celda.innerHTML="1";
		}
		else{
			celda.innerHTML="0";
		}						
	}
}
//función encargada de poner las palabras en forma horizontal
function colocarPalabrasH(array){
	var texto,num,tam,palabra,arreglo,posicion;
	var final;
	var iter=0;
	for(i=0; i < 6; i++){
		final = true;
		do{
			final = false;
			num = Math.floor(Math.random()*246);
			//Se debe estar seguro que num no sea 0 ya que no esta el div0
			if(num==0){
				num = Math.floor(Math.random()*85);
			}
			tam = array[i].length;
			for(var k=num; k <(num+tam) ; k++){
				texto = document.getElementById(k.toString());
				//Verificar que el div se haya encontrado
				if(texto==null && iter<10){
					//Se busca 10 veces en aras de encontrarlo
					do{
						texto = document.getElementById(k.toString());
						console.log('buscando div '+k);
						iter++;
					}while(texto==null || iter<10);
					//Si en caso tal no se encuentra se imprime que no se encontró
					if(texto==null){
						console.log('div '+k+' no encontrado');
					}
				}else if(texto!=null){
					//Es seguro que el div se encontró
					if(texto.textContent != "0" ){
						final=true;
					}
				} 	
			}
			if(final==false){
				palabra = array[i];
				arreglo=palabra.split("");
				for(j=0; j< tam ; j++){
					posicion = document.getElementById(num.toString());
					posicion.innerHTML=arreglo[j];
					posicion.style.cssText='height: 1px; width: 1px;';
					num++;
				}
			}
		}while(final==true);
	}	
}
//función encargada de poner las palabras en forma vertical
function colocarPalabrasV(array){
	var texto,num,n,tam,palabra,arreglo,posicion;
	var final;
	let iter=0;
	for( var i=6; i < 12; i++){
		final = true;
		do{
			final = false;
			num = Math.floor(Math.random()*180);
			//Se debe estar seguro que num no sea 0 ya que no esta el div0
			if(num==0){
				num = Math.floor(Math.random()*180);
			}
			n=num;
			tam = array[i].length;
			for(var k=0; k < tam ; k++){
				texto = document.getElementById(n.toString());
				//Verificar que el div se haya encontrado
				if(texto==null && iter<10){
					//Se busca 10 veces en aras de encontrarlo
					do{
						texto = document.getElementById(n.toString());
						console.log('buscando div'+n);
						iter++;
					}while(texto==null || iter<10);

					//Si en caso tal no se encuentra se imprime que no se encontró
					if(texto==null){
						console.log('div '+k+' no encontrado');
					}
				}else if(texto!=null){
					//Es seguro que el div se encontró
					if(texto.textContent!="0" ){
						final=true;
					}
					n+=16;
				}
			}
			if(final==false){
				palabra = array[i];
				arreglo=palabra.split("");
				for(var j=0; j< tam ; j++){
					posicion = document.getElementById(num.toString());
					posicion.innerHTML=arreglo[j];
					posicion.style.cssText='height: 1px; width: 1px;';
					num+=16;
				}
			}	
		}while(final==true);
	}
}
//función encargada de rellenar la sopa de letras con letras luego de haber puesto las palabras en forma vertical y horizontal
function rellenar(){
	for (var i = 1; i <= 256; i++) {
		var posicion = document.getElementById(i.toString());
		if(posicion.textContent== "0" || posicion.textContent=="1"){
			var aleatorio = Math.floor(Math.random()*22);
			posicion.innerHTML = letras[aleatorio];
			posicion.style.cssText= 'background-color: white;height: 1px; width: 1px;';
		}
	}
}
	//Función encargada de poner las palabras que deben ser buscadas
	function ponerPalabras(array){
		var contenedor = document.getElementById("palabras");
		for (var i=0; i < 12; i++) {
			var divpequeño = document.createElement("DIV");	
			divpequeño.style.cssText='background-color: #83FA57;padding-left: 20px; margin-top: 5px; height: 25px; font-size: 18px; text-align: center;font-weight: bold;';
			divpequeño.id="P"+i;
			contenedor.appendChild(divpequeño);
			document.getElementById(divpequeño.id).innerHTML=array[i];
		}
	}
//Función encargada de cambiar las palabras que deben ser buscadas, dependiendo del tipo de sopa de letras, con el fin
//de evitar que se crearan más div's
function cambiarPalabras(array){
	for (var i=0; i <12; i++) {
		var num=i.toString();
		let pos = document.getElementById("P"+num);
		pos.innerHTML=array[i];
		pos.style.background='#83FA57';
	}
}
function empezarCronometro(){
	var contenedor = document.getElementById("cronometro");
	contenedor.style.cssText='background-color: black;';
	var texto = document.getElementById("crono");
	contenedor.appendChild(texto);
	document.getElementById("crono").innerHTML="00:00:00";
	// Obtenemos el valor actual
	inicio=vuelta=new Date().getTime();
	// iniciamos el proceso
	funcionando();
}

function funcionando(){
	// obtenemos la fecha actual
	var actual = new Date().getTime();
	// obtenemos la diferencia entre la fecha actual y la de inicio
	var diff=new Date(actual-inicio);
	// mostramos la diferencia entre la fecha actual y la inicial
	var result=LeadingZero(diff.getUTCHours())+":"+LeadingZero(diff.getUTCMinutes())+":"+LeadingZero(diff.getUTCSeconds());
	document.getElementById('crono').innerHTML = result;
	// Indicamos que se ejecute esta función nuevamente dentro de 1 segundo
	timeout=setTimeout("funcionando()",1000);
}
//Funcion que pone un 0 delante de un valor si es necesario 
function LeadingZero(Time) {
	return (Time < 10) ? "0" + Time : + Time;
}

var sopaActual=[];
function eventoclick(sopa,tema){
	sopaActual=sopa;
	var pa="";
	var click = false;
	var posicionesSeleccionadas = [];
	var randomColor;
	for (var i = 1; i <= 256; i++) {
		document.getElementById(i.toString()).addEventListener('mousedown',function(){
			randomColor = Math.floor(Math.random()*16777215).toString(16);
			this.style.backgroundColor = '#'+randomColor;
			click = true;
			posicionesSeleccionadas.push(this.id);
			//console.log(posicionesSeleccionadas);
			pa+=this.textContent;
		});
		document.getElementById(i.toString()).addEventListener('mouseover',function(){
			if(click==true){
				this.style.backgroundColor = '#'+randomColor;
				click=true;
				posicionesSeleccionadas.push(this.id);
				pa+=this.textContent;
			}
		});
		document.getElementById(i.toString()).addEventListener('mouseup',function(){
			this.style.backgroundColor = '#'+randomColor;
			click = false;
			//console.log("palabra de "+sopa+" que tiene = "+pa);
			validarPalabra(pa,posicionesSeleccionadas,sopaActual);
			pa="";
			//console.log("posicionesSeleccionadas : "+posicionesSeleccionadas);
			posicionesSeleccionadas.splice(0, posicionesSeleccionadas.length);
		});
	}						
	cargarBotones();
}
//Función encargada de invertir la palabra
function invertir(pala){
	var p= pala.split("");
	var tam=pala.length;
	var inv="";
	for (var i =(tam-1);i >=0; i--){
		inv+=p[i];
	}
	return inv;
}
/*Función encargada de validar la palabra, recibe los parámetros pala(palabra que se selecciona)
 arr(arreglo que contiene los id de los div seleccionados) y sopa(arreglo que contiene las palabras de cada sopa)
 */
 function validarPalabra(pala, arr, sopa){
 	console.log(pala);
 	var valido=false;
 	var palaInvertida = invertir(pala);
 	for (var i = 0; i < 12; i++) {
 		if(pala==sopa[(i)] || palaInvertida==sopa[(i)]){
 			let pos = document.getElementById("P"+(i));
 			pos.style.cssText='background-color: green;padding-left: 20px; margin-top: 5px; height: 25px; font-size: 18px; text-align: center;font-weight: bold;';
 			valido=true;
 		}
 		detener();
 	}
 	if(valido==false){
 		var letra = arr.shift();
 		let celda = document.getElementById(letra.toString());
 		do{
 			celda.style.background = 'white';
 			letra= arr.shift();
 			celda = document.getElementById(letra);

 		}while(celda!=undefined);
 		arr=[];
 		arr.splice(0,arr.length);
 		console.log(arr+" arreglo del validar");
 	}
 	return valido;			
}

 function detener(){
 	var contador=0;
 	for (i=0; i <12; i++) {
 		var num=i.toString();
 		let pos = document.getElementById("P"+num);
 		var color= pos.style.backgroundColor;
 		if(color=="green"){
 			contador++;
 		}
 		if(contador==12){
 			clearTimeout(timeout);
 			timeout=0;
 		}
 	}
 }
 function cargarBotones(){
 	var btnfrutas= document.getElementById("botonFrutas");
 	var btnanimales= document.getElementById("botonAnimales");
 	var btncapitales= document.getElementById("botonCapitales");
 	btnfrutas.setAttribute("onclick","botonUnico(frutas,'frutas')");
 	btnanimales.setAttribute("onclick","botonUnico(animales,'animales')");
 	btncapitales.setAttribute("onclick","botonUnico(capitales,'capitales')");
 }
 function botonUnico(lista,tema){
 	console.log("boton iniciado ",tema);
 	clearTimeout(timeout);
 	timeout=0;
 	empezarCronometro();
 	generarTablero(16,16,lista);
 	temaSopa=tema;
 	eventoclick(lista,temaSopa);
 } 
//Eventos para el teclado
var idAct=1;
var celda;
var estado=false;
var pa="";
var posicionesSeleccionadas = [];
var teclado = document.addEventListener('keydown',(event)=>{
	event.preventDefault();
	var sopaL;	
	switch(temaSopa){
		case 'frutas':
		sopaL=frutas;
		break;
		case 'animales':
		sopaL=animales;
		break;	
		case 'capitales':
		sopaL=capitales;
		break;
	}
	console.log(event.key);
	switch(event.key){
		case 'd': case 'D': case 'ArrowRight':
		if(idAct!=256){
			idAct++;
			celda = document.getElementById(idAct.toString());
			celdaAnt=document.getElementById((idAct-1).toString());
			celda.style.borderColor="orange";
			celdaAnt.style.borderColor='black';
			if(estado==false){
				celdaAnt.style.borderColor='black';
				celdaAnt.classList.remove("seleccionado");
			}else{
					celdaAnt.style.background='cyan';
					celdaAnt.classList.add("seleccionado");
					celda.style.borderColor='orange';
				}
				posicionesSeleccionadas.push(idAct);
				pa+=celda.textContent;
			}
		break;
		case 'w': case 'W': case 'ArrowUp':
		if( idAct>16){
			idAct-=16;
			celda = document.getElementById(idAct.toString());
			celdaAnt=document.getElementById((idAct+16).toString());
			celda.style.borderColor='orange';
				//celdaAnt.style.background='white';
			celdaAnt.style.borderColor='black';
				if(estado==false){
					celdaAnt.style.borderColor='black';
					celdaAnt.classList.remove("seleccionado");
				}else{
						celdaAnt.style.background='cyan';
						celdaAnt.classList.add("seleccionado");
					}
					posicionesSeleccionadas.push(idAct);
					pa+=celda.textContent;	
				}
			break;
			case 's':case 'S': case 'ArrowDown':
			if(idAct<240){

				idAct+=16;
				celda = document.getElementById(idAct.toString());
				celdaAnt=document.getElementById((idAct-16).toString());
				celda.style.borderColor='orange';
			//celdaAnt.style.background='white';
				celdaAnt.style.borderColor='black';
			if(estado==false){
				celdaAnt.style.borderColor='black';
				celdaAnt.classList.remove("seleccionado");
			}else{
					celdaAnt.style.background='cyan';
					celdaAnt.classList.add("seleccionado");
				}
				posicionesSeleccionadas.push(idAct);
				pa+=celda.textContent;
			}
		break;
		case 'a':case 'A': case 'ArrowLeft':
		if(idAct!=1 ){
			idAct--;
			celda = document.getElementById(idAct.toString());
			celdaAnt=document.getElementById((idAct+1).toString());
			celda.style.borderColor='orange';
				//celdaAnt.style.background='white';
				celdaAnt.style.borderColor='black';
				if(estado==false){
					celdaAnt.style.borderColor="black";
					celdaAnt.classList.remove("seleccionado");	
				}
				else{
						celdaAnt.style.background='cyan';
						celdaAnt.classList.add("seleccionado");
					}
					posicionesSeleccionadas.push(idAct);
					pa+=celda.textContent;	
				}
			break;
			case 'Shift':
			celda = document.getElementById(idAct.toString());
			celda.style.borderColor='orange';
			if(estado==false){
				pa="";
				posicionesSeleccionadas.splice(0, posicionesSeleccionadas.length);
				//posicionesSeleccionadas=[];
				estado=true;
				posicionesSeleccionadas.push(idAct);
				pa+=celda.textContent;								
			}else{
				var colorRan="#"+Math.floor(Math.random()*16777215).toString(16);	
				celda.classList.add("seleccionado");
				console.log("palabra "+pa);
				console.log("posicionesSeleccionadas.... "+posicionesSeleccionadas);
				var retorno=validarPalabra(pa,posicionesSeleccionadas,sopaL);
				if(retorno){
					for (var i = 1; i <= 256; i++) {
						celda = document.getElementById(i.toString());
						if(celda.classList.contains("seleccionado")){
							celda.style.background=colorRan;
							celda.classList.remove("seleccionado");
						}	
					}
				}else{
					for (var i = 1; i <= 256; i++) {
						celda = document.getElementById(i.toString());
						if(celda.classList.contains("seleccionado")){
							celda.style.background="white";
							celda.classList.remove("seleccionado");
						}	
					}
				}
				estado=false;
			}
				break;
		}
});