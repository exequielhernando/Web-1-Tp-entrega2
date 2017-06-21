"use strict";
$("document").ready(function() {

  class jugadorUsuario {
    constructor(idimg) {
      this.idimg = idimg;
      this.credito=100;
      this.eleccionJugada="Piedra";
      this.contador=0;
      this.apuesta=5;

    }
    elegirJugada(eleccionJugada){
      this.eleccionJugada=eleccionJugada;
      $(this.idimg).attr("src",'images/'+this.eleccionJugada+'.jpg');
    }
    actualizarContador(){
      this.contador++;
      $(".js-partidasUsuario").html(this.contador);
      console.log("entro");
    }
    apostar(){
      this.credito-=this.apuesta;
      $(".js-credito").html(this.credito);
    }
    actualizarCredito(){
      this.credito+=(this.apuesta*2);
      $(".js-credito").html(this.credito);
    }
    spockfriendly(){
      this.credito+=(this.apuesta*4);
      $(".js-credito").html(this.credito);
    }

  }
  class jugadorPc {
    constructor(idimg) {
      this.idimg=idimg;
      this.eleccionJugada="Piedra";
      this.contador=0;

    }
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
    actualizarContador(){
      this.contador++;
      $(".js-partidasPc").html(this.contador);
      console.log("entro");
    }
  }
  class juego {
    constructor() {

    this.usuario= new jugadorUsuario(".imagen_humano");
    this.pc= new jugadorPc(".imagen_maquina");
    }
    jugar(jugadahumano){
      if(this.usuario.credito>=this.usuario.apuesta){
          this.usuario.apostar();
          if ($(".js-sheldon:checked").val()=="on") {
            this.pc.modosheldon();
          }
          else {
            this.pc.elegirJugada();
          }

          this.usuario.elegirJugada(jugadahumano);
          if(this.usuario.eleccionJugada === this.pc.eleccionJugada){
            alert("empataste");
            console.log(alert);
          }else if(this.usuario.eleccionJugada == "Piedra" && this.pc.eleccionJugada == "Tijera"
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
              this.usuario.actualizarCredito();
              this.usuario.actualizarContador();
            }

          }
          else
          {
            alert("Perdiste");
            console.log(alert);
            this.pc.actualizarContador();

          }
      }
      else
      {
        alert("No dispone de mas credito para jugar");
      };
    };
  }
  let jugada = new juego();
  $(".eleccion").on('click', function() {

        jugada.jugar($(this).attr("id"));
    });
});
