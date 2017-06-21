"use strict";
//Código de inicialización de eventos
$("document").ready(function() {
//Declaracion de la clase jugador y los atributos requeridos(La imagen correspondiente al jugadorUsuario,
//el crédito necesario para jugar, la eleccion del mismo, el contador de partidas ganadas, y la apuesta necesaria para jugar)
  class jugadorUsuario {
    constructor(idimg) {
      this.idimg = idimg;
      this.credito=100;
      this.eleccionJugada="Piedra";
      this.contador=0;
      this.apuesta=5;

    }
    //Elegimos la jugada mediante el atributo correspondiente al boton que apretemos y tomamos la url de la imagen para luego poder modificarla
    elegirJugada(eleccionJugada){
      this.eleccionJugada=eleccionJugada;
      $(this.idimg).attr("src",'images/'+this.eleccionJugada+'.jpg');
    }
    //Actualizamos el contador para el jugador que gane la partida y tambien colocamos el metodo para modificarlo en el html.
    actualizarContador(){
      this.contador++;
      $(".js-partidasUsuario").html(this.contador);
      console.log("entro");
    }
    //Esta funcion nos descuenta la apuesta del credito del jugador y tambien lo modifica en el html.
    apostar(){
      this.credito-=this.apuesta;
      $(".js-credito").html(this.credito);
    }
    //Actualizamos el credito en caso de que el jugador gane.
    actualizarCredito(){
      this.credito+=(this.apuesta*2);
      $(".js-credito").html(this.credito);
    }
    //Actualizamos el credito en caso de que el jugador gane tomando en cuenta la variacion que nos duplica el valor obtenido.
    spockfriendly(){
      this.credito+=(this.apuesta*4);
      $(".js-credito").html(this.credito);
    }

  }
  //Declaramos la clase jugador pc y sus atributos.
  class jugadorPc {
    constructor(idimg) {
      this.idimg=idimg;
      this.eleccionJugada="Piedra";
      this.contador=0;

    }
    //Declaramos la variacion modosheldon para que la eleccion sea distinta.
    modosheldon(eleccionJugada){
      let eleccion=Math.floor((Math.random()*2)+1);
        if (eleccion==1){
          this.eleccionJugada="Lagarto";
        }
        else {
          this.eleccionJugada="Spock";
        }
        $(this.idimg).attr("src",'images/'+this.eleccionJugada+'.jpg');
    }
    //Declaramos una funcion para que eliga una jugada al azar y tambien que nos modifique la imagen en el html.
    elegirJugada(eleccionJugada){
      let eleccion = Math.floor((Math.random()*5)+1);
        if (eleccion == 1) {
            this.eleccionJugada = "Piedra";
        } else if (eleccion == 2) {
            this.eleccionJugada = "Papel";
        }
        else if (eleccion == 3) {
            this.eleccionJugada = "Tijera";
        }else if (eleccion == 4) {
            this.eleccionJugada = "Lagarto";
        } else {
            this.eleccionJugada = "Spock";
        }
        $(this.idimg).attr("src",'images/'+this.eleccionJugada+'.jpg');
    }
    //Actualiza el contador de las partidas ganadas.
    actualizarContador(){
      this.contador++;
      $(".js-partidasPc").html(this.contador);
      console.log("entro");
    }
  }
  //Declaramos la clase donde sucede el juego
  class juego {
    //Creamos los objetos para empezar a jugar y tomamos la ubicacion de su imagen.
    constructor() {

    this.usuario= new jugadorUsuario(".imagen_humano");
    this.pc= new jugadorPc(".imagen_maquina");
  }

    jugar(jugadahumano){
      if(this.usuario.credito>=this.usuario.apuesta){//Preguntamos si el jugador usuario tiene credito suficiente para jugar.
          this.usuario.apostar();                   //En caso de que tenga credito, apuesta.
          if ($(".js-sheldon:checked").val()=="on") {//Preguntamos si el checkbox esta checkeado para utilizar la variacion modosheldon.
            this.pc.modosheldon();
          }
          else {                                    //Sino que eliga una jugada al azar.
            this.pc.elegirJugada();
          }

          this.usuario.elegirJugada(jugadahumano);   //Toma el valor que eligio el usuario.
          if(this.usuario.eleccionJugada === this.pc.eleccionJugada){//Los compara para ver si hay empate.
            alert("empataste");
            console.log(alert);
          }else if(this.usuario.eleccionJugada == "Piedra" && this.pc.eleccionJugada == "Tijera"//Sino, cualquiera de estas opciones son ganador.
                        ||
            this.usuario.eleccionJugada == "Piedra" && this.pc.eleccionJugada == "Lagarto"
                          ||
            this.usuario.eleccionJugada == "Papel" && this.pc.eleccionJugada == "Spock"
                          ||
            this.usuario.eleccionJugada == "Papel" && this.pc.eleccionJugada == "Piedra"
                          ||
            this.usuario.eleccionJugada == "Tijera" && this.pc.eleccionJugada == "Lagarto"
                          ||

            this.usuario.eleccionJugada == "Tijera" && this.pc.eleccionJugada == "Papel"
                          ||
            this.usuario.eleccionJugada == "Lagarto" && this.pc.eleccionJugada == "Spock"
                          ||
            this.usuario.eleccionJugada == "Lagarto" && this.pc.eleccionJugada == "Papel"
                          ||
            this.usuario.eleccionJugada == "Spock" && this.pc.eleccionJugada == "Piedra"
                          ||
            this.usuario.eleccionJugada == "Spock" && this.pc.eleccionJugada == "Tijera"
            )
          {
            alert("Ganaste");
            if (this.usuario.eleccionJugada=="Spock"){
              this.usuario.spockfriendly();
              this.usuario.actualizarContador();
            }
            else {
              this.usuario.actualizarCredito(); //Actualiza el contador y el credito.
              this.usuario.actualizarContador();
            }

          }
          else//Sino dice que el usuario perdio y actualiza el contador de la pc
          {
            alert("Perdiste");
            console.log(alert);
            this.pc.actualizarContador();

          }
      }
      else
      {
        alert("No dispone de mas credito para jugar"); //En caso de que no tenga mas credito para jugar le avisa mediante un alert.
      };
    };
  }
  let jugada = new juego();                     //Crea un objeto juego para comenzar a jugar.
  $(".eleccion").on('click', function() {       //Llama mediante el atributo id eleccion y pregunta si hizo click para ejecutar
                                                //siguiente funcion.    
        jugada.jugar($(this).attr("id"));
    });
});
