"use strict";
$("document").ready(function() {

  class jugadorUsuario {
    constructor(idimg) {
      this.idimg = idimg;
      this.credito=100;
      this.eleccionJugada="Piedra";
    }
    elegirJugada(eleccionJugada){
      this.eleccionJugada=eleccionJugada;
      $(this.idimg).attr("src",'images/'+this.eleccionJugada+'.jpg');
    }
  }
  class jugadorPc {
    constructor(idimg) {
      this.idimg=idimg;
      this.eleccionJugada="Piedra";

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

  }
  class juego {
    constructor() {
    this.usuario= new jugadorUsuario(".imagen_humano");
    this.pc= new jugadorPc(".imagen_maquina");
    }
    jugar(jugadahumano){
      this.usuario.elegirJugada(jugadahumano);
      this.pc.elegirJugada()
      if(this.usuario.eleccionJugada === this.pc.eleccionJugada)
      {
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
        console.log(alert);
      }
      else
      {
        alert("Perdiste");
        console.log(alert);
      };
    };
  };

  let jugada = new juego();
  $(".eleccion").on('click', function() {

        jugada.jugar($(this).attr("id"));
    });
});
