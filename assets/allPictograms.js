const pictograms = [
  // Colores
  {
    text: 'Amarillo',
    img: require('./images/pictos/colores/amarillo.png'),
    sound: require('./sounds/colores/amarillo.mp3'),
    category: 'Colores',
    timesUsed: 0
  },
  {
    text: 'Azul',
    img: require('./images/pictos/colores/azul.png'),
    sound: require('./sounds/colores/azul.mp3'),
    category: 'Colores',
    timesUsed: 0
  },
  {
    text: 'Rojo',
    img: require('./images/pictos/colores/rojo.png'),
    sound: require('./sounds/colores/rojo.mp3'),
    category: 'Colores',
    timesUsed: 0
  },
  {
    text: 'Blanco',
    img: require('./images/pictos/colores/blanco.png'),
    sound: require('./sounds/colores/blanco.mp3'),
    category: 'Colores',
    timesUsed: 0
  },
  {
    text: 'Negro',
    img: require('./images/pictos/colores/negro.png'),
    sound: require('./sounds/colores/negro.mp3'),
    category: 'Colores',
    timesUsed: 0
  },
  {
    text: 'Verde',
    img: require('./images/pictos/colores/verde.png'),
    sound: require('./sounds/colores/verde.mp3'),
    category: 'Colores',
    timesUsed: 0
  },
  // Alimentos
  {
    text: 'Agua',
    img: require('./images/pictos/alimentos/agua.png'),
    sound: require('./sounds/alimentos/agua.mp3'),
    category: 'Alimentos',
    timesUsed: 10
  },
  {
    text: 'Fiambre',
    img: require('./images/pictos/alimentos/fiambre.png'),
    sound: require('./sounds/alimentos/fiambre.mp3'),
    category: 'Alimentos',
    timesUsed: 0
  },
  {
    text: 'Fruta',
    img: require('./images/pictos/alimentos/fruta.png'),
    sound: require('./sounds/alimentos/fruta.mp3'),
    category: 'Alimentos',
    timesUsed: 0
  },
  {
    text: 'Zumo',
    img: require('./images/pictos/alimentos/zumo.png'),
    sound: require('./sounds/alimentos/zumo.mp3'),
    category: 'Alimentos',
    timesUsed: 0
  },
  {
    text: 'Helado',
    img: require('./images/pictos/alimentos/helado.png'),
    sound: require('./sounds/alimentos/helado.mp3'),
    category: 'Alimentos',
    timesUsed: 10
  },
  {
    text: 'Lentejas',
    img: require('./images/pictos/alimentos/lentejas.png'),
    sound: require('./sounds/alimentos/lentejas.mp3'),
    category: 'Alimentos',
    timesUsed: 0
  },
  {
    text: 'Yogur',
    img: require('./images/pictos/alimentos/yogur.png'),
    sound: require('./sounds/alimentos/yogur.mp3'),
    category: 'Alimentos',
    timesUsed: 0
  },
  // Sentimientos
  {
    text: 'Asco',
    img: require('./images/pictos/sentimientos/asco.png'),
    sound: '', //require('./sounds/sentimientos/yogur.mp3'),
    category: 'Sentimientos',
    timesUsed: 0
  },
  {
    text: 'Contento',
    img: require('./images/pictos/sentimientos/contento.png'),
    sound: '', //require('./sounds/sentimientos/yogur.mp3'),
    category: 'Sentimientos',
    timesUsed: 0
  },
  {
    text: 'Enfadado',
    img: require('./images/pictos/sentimientos/enfadado.png'),
    sound: '', //require('./sounds/sentimientos/yogur.mp3'),
    category: 'Sentimientos',
    timesUsed: 0
  },
  {
    text: 'Mareado',
    img: require('./images/pictos/sentimientos/mareado.png'),
    sound: '', //require('./sounds/sentimientos/yogur.mp3'),
    category: 'Sentimientos',
    timesUsed: 0
  },
  {
    text: 'Me molesta el ruido',
    img: require('./images/pictos/sentimientos/me_molesta_el_ruido.png'),
    sound: require('./sounds/sentimientos/me_molesta_el_ruido.mp3'),
    category: 'Sentimientos',
    timesUsed: 0
  },
  {
    text: 'No te entiendo',
    img: require('./images/pictos/sentimientos/no_te_entiendo.png'),
    sound: require('./sounds/sentimientos/no_te_entiendo.mp3'),
    category: 'Sentimientos',
    timesUsed: 10
  },
  {
    text: 'Nostálgico',
    img: require('./images/pictos/sentimientos/nostalgico.png'),
    sound: '', //require('./sounds/sentimientos/yogur.mp3'),
    category: 'Sentimientos',
    timesUsed: 0
  },
  {
    text: 'Risa',
    img: require('./images/pictos/sentimientos/risa.png'),
    sound: '', //require('./sounds/sentimientos/yogur.mp3'),
    category: 'Sentimientos',
    timesUsed: 0
  },
  {
    text: 'Sed',
    img: require('./images/pictos/sentimientos/sed.png'),
    sound: require('./sounds/sentimientos/sed.mp3'),
    category: 'Sentimientos',
    timesUsed: 10
  },
  {
    text: 'Sorprendido',
    img: require('./images/pictos/sentimientos/sorprendido.png'),
    sound: '', //require('./sounds/sentimientos/yogur.mp3'),
    category: 'Sentimientos',
    timesUsed: 0
  },
  {
    text: 'Temor',
    img: require('./images/pictos/sentimientos/temor.png'),
    sound: require('./sounds/sentimientos/temor.mp3'),
    category: 'Sentimientos',
    timesUsed: 0
  },
  {
    text: 'Tímido',
    img: require('./images/pictos/sentimientos/timido.png'),
    sound: require('./sounds/sentimientos/timido.mp3'),
    category: 'Sentimientos',
    timesUsed: 0
  },
  // Ropa
  {
    text: 'Camiseta',
    img: require('./images/pictos/ropa/camiseta.png'),
    sound: require('./sounds/ropa/camiseta.mp3'),
    category: 'Ropa',
    timesUsed: 0
  },
  {
    text: 'Chanclas',
    img: require('./images/pictos/ropa/chanclas.png'),
    sound: require('./sounds/ropa/chanclas.mp3'),
    category: 'Ropa',
    timesUsed: 0
  },
  {
    text: 'Chaqueta',
    img: require('./images/pictos/ropa/chaqueta.png'),
    sound: require('./sounds/ropa/chaqueta.mp3'),
    category: 'Ropa',
    timesUsed: 0
  },
  {
    text: 'Ropa interior',
    img: require('./images/pictos/ropa/ropa_interior.png'),
    sound: require('./sounds/ropa/ropa_interior.mp3'),
    category: 'Ropa',
    timesUsed: 0
  },
  {
    text: 'Sudadera',
    img: require('./images/pictos/ropa/sudadera.png'),
    sound: require('./sounds/ropa/sudadera.mp3'),
    category: 'Ropa',
    timesUsed: 0
  },
  {
    text: 'Zapatillas',
    img: require('./images/pictos/ropa/zapatillas.png'),
    sound: require('./sounds/ropa/zapatillas.mp3'),
    category: 'Ropa',
    timesUsed: 0
  },
  // Verbos
  {
    text: 'Bañar',
    img: require('./images/pictos/verbos/bañar.png'),
    sound: require('./sounds/verbos/bañar.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Beber',
    img: require('./images/pictos/verbos/beber.png'),
    sound: require('./sounds/verbos/beber.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Besar',
    img: require('./images/pictos/verbos/besar.png'),
    sound: '', //require('./sounds/verbos/besar.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Coger',
    img: require('./images/pictos/verbos/coger.png'),
    sound: require('./sounds/verbos/coger.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Comer',
    img: require('./images/pictos/verbos/comer.png'),
    sound: require('./sounds/verbos/comer.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Dormir',
    img: require('./images/pictos/verbos/dormir.png'),
    sound: require('./sounds/verbos/dormir.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  
  {
    text: 'Escuchar música',
    img: require('./images/pictos/verbos/escuchar_musica.png'),
    sound: require('./sounds/verbos/escuchar_musica.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Ir',
    img: require('./images/pictos/verbos/ir.png'),
    sound: require('./sounds/verbos/ir.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Lavar la cara',
    img: require('./images/pictos/verbos/lavar_cara.png'),
    sound: require('./sounds/verbos/lavar_cara.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Lavar las manos',
    img: require('./images/pictos/verbos/lavar_manos.png'),
    sound: require('./sounds/verbos/lavar_manos.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Lavar el pelo',
    img: require('./images/pictos/verbos/lavar_pelo.png'),
    sound: require('./sounds/verbos/lavar_pelo.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Llamar',
    img: require('./images/pictos/verbos/llamar.png'),
    sound: require('./sounds/verbos/llamar.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  {
    text: 'Ver la tele',
    img: require('./images/pictos/verbos/ver_tele.png'),
    sound: require('./sounds/verbos/ver_tele.mp3'),
    category: 'Verbos',
    timesUsed: 0
  },
  // Lugares
  {
    text: 'Clase',
    img: require('./images/pictos/lugares/clase.png'),
    sound: require('./sounds/lugares/clase.mp3'),
    category: 'Lugares',
    timesUsed: 0
  },
  {
    text: 'Casa',
    img: require('./images/pictos/lugares/casa.png'),
    sound: require('./sounds/lugares/casa.mp3'),
    category: 'Lugares',
    timesUsed: 0
  },
  {
    text: 'Clase',
    img: require('./images/pictos/lugares/parque.png'),
    sound: require('./sounds/lugares/parque.mp3'),
    category: 'Lugares',
    timesUsed: 0
  },
  // General
  // Personas
  {
    text: 'Abuela',
    img: require('./images/pictos/personas/abuela.png'),
    sound: require('./sounds/personas/abuela.mp3'),
    category: 'Personas',
    timesUsed: 0
  },
  {
    text: 'Abuelo',
    img: require('./images/pictos/personas/abuelo.png'),
    sound: require('./sounds/personas/abuelo.mp3'),
    category: 'Personas',
    timesUsed: 0
  },
  {
    text: 'Yo',
    img: require('./images/pictos/personas/yo.png'),
    sound: require('./sounds/personas/yo.mp3'),
    category: 'Personas',
    timesUsed: 0
  },
  // Juguetes
  {
    text: 'Coche_juguete',
    img: require('./images/pictos/juguetes/coche_juguete.png'),
    sound: require('./sounds/juguetes/coche_juguete.mp3'),
    category: 'Juguetes',
    timesUsed: 0
  },
  {
    text: 'Cuento',
    img: require('./images/pictos/juguetes/cuento.png'),
    sound: require('./sounds/juguetes/cuento.mp3'),
    category: 'Juguetes',
    timesUsed: 0
  },
  {
    text: 'Damas',
    img: require('./images/pictos/juguetes/damas.png'),
    sound: require('./sounds/juguetes/damas.mp3'),
    category: 'Juguetes',
    timesUsed: 0
  },
  {
    text: 'Pelota',
    img: require('./images/pictos/juguetes/pelota.png'),
    sound: require('./sounds/juguetes/pelota.mp3'),
    category: 'Juguetes',
    timesUsed: 0
  },
  {
    text: 'Puzzle',
    img: require('./images/pictos/juguetes/puzzle.png'),
    sound: require('./sounds/juguetes/puzzle.mp3'),
    category: 'Juguetes',
    timesUsed: 0
  },
  // Formas
  {
    text: 'Cono',
    img: require('./images/pictos/formas/cono.png'),
    sound: require('./sounds/formas/cono.mp3'),
    category: 'Formas',
    timesUsed: 0
  },
  {
    text: 'Cuadrado',
    img: require('./images/pictos/formas/cuadrado.png'),
    sound: require('./sounds/formas/cuadrado.mp3'),
    category: 'Formas',
    timesUsed: 0
  },
  {
    text: 'Cubo',
    img: require('./images/pictos/formas/cubo.png'),
    sound: require('./sounds/formas/cubo.mp3'),
    category: 'Formas',
    timesUsed: 0
  },
  {
    text: 'Esfera',
    img: require('./images/pictos/formas/esfera.png'),
    sound: require('./sounds/formas/esfera.mp3'),
    category: 'Formas',
    timesUsed: 0
  },
  {
    text: 'Estrella',
    img: require('./images/pictos/formas/estrella.png'),
    sound: require('./sounds/formas/estrella.mp3'),
    category: 'Formas',
    timesUsed: 0
  },
  {
    text: 'Prisma',
    img: require('./images/pictos/formas/prisma.png'),
    sound: require('./sounds/formas/prisma.mp3'),
    category: 'Formas',
    timesUsed: 0
  },
  {
    text: 'Rombo',
    img: require('./images/pictos/formas/rombo.png'),
    sound: require('./sounds/formas/rombo.mp3'),
    category: 'Formas',
    timesUsed: 0
  },
  {
    text: 'Tetraedro',
    img: require('./images/pictos/formas/tetraedro.png'),
    sound: require('./sounds/formas/tetraedro.mp3'),
    category: 'Formas',
    timesUsed: 0
  },
  {
    text: 'Trapecio',
    img: require('./images/pictos/formas/trapecio.png'),
    sound: require('./sounds/formas/trapecio.mp3'),
    category: 'Formas',
    timesUsed: 0
  },
  // Números
  {
    text: 'Cero',
    img: require('./images/pictos/numeros/0.png'),
    sound: require('./sounds/numeros/cero.mp3'),
    category: 'Números',
    timesUsed: 0
  },
  {
    text: 'Uno',
    img: require('./images/pictos/numeros/1.png'),
    sound: require('./sounds/numeros/uno.mp3'),
    category: 'Números',
    timesUsed: 0
  },
  {
    text: 'Dos',
    img: require('./images/pictos/numeros/2.png'),
    sound: require('./sounds/numeros/dos.mp3'),
    category: 'Números',
    timesUsed: 0
  },
  {
    text: 'Tres',
    img: require('./images/pictos/numeros/3.png'),
    sound: require('./sounds/numeros/tres.mp3'),
    category: 'Números',
    timesUsed: 0
  },
  {
    text: 'Cuatro',
    img: require('./images/pictos/numeros/4.png'),
    sound: require('./sounds/numeros/cuatro.mp3'),
    category: 'Números',
    timesUsed: 0
  },
  {
    text: 'Cinco',
    img: require('./images/pictos/numeros/5.png'),
    sound: require('./sounds/numeros/cinco.mp3'),
    category: 'Números',
    timesUsed: 0
  },
  {
    text: 'Seis',
    img: require('./images/pictos/numeros/6.png'),
    sound: require('./sounds/numeros/seis.mp3'),
    category: 'Números',
    timesUsed: 0
  },
  {
    text: 'Siete',
    img: require('./images/pictos/numeros/7.png'),
    sound: require('./sounds/numeros/siete.mp3'),
    category: 'Números',
    timesUsed: 0
  },
  {
    text: 'Ocho',
    img: require('./images/pictos/numeros/8.png'),
    sound: require('./sounds/numeros/ocho.mp3'),
    category: 'Números',
    timesUsed: 0
  },
  {
    text: 'Nueve',
    img: require('./images/pictos/numeros/9.png'),
    sound: require('./sounds/numeros/nueve.mp3'),
    category: 'Números',
    timesUsed: 0
  },
  // Abecedario
  {
    text: 'A',
    img: require('./images/pictos/abecedario/A.png'),
    sound: require('./sounds/abecedario/A.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'B',
    img: require('./images/pictos/abecedario/B.png'),
    sound: require('./sounds/abecedario/B.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'C',
    img: require('./images/pictos/abecedario/C.png'),
    sound: require('./sounds/abecedario/C.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'D',
    img: require('./images/pictos/abecedario/D.png'),
    sound: require('./sounds/abecedario/D.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'E',
    img: require('./images/pictos/abecedario/E.png'),
    sound: require('./sounds/abecedario/E.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'F',
    img: require('./images/pictos/abecedario/F.png'),
    sound: require('./sounds/abecedario/F.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'G',
    img: require('./images/pictos/abecedario/G.png'),
    sound: require('./sounds/abecedario/G.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'H',
    img: require('./images/pictos/abecedario/H.png'),
    sound: require('./sounds/abecedario/H.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'I',
    img: require('./images/pictos/abecedario/I.png'),
    sound: require('./sounds/abecedario/I.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'J',
    img: require('./images/pictos/abecedario/J.png'),
    sound: require('./sounds/abecedario/J.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'K',
    img: require('./images/pictos/abecedario/K.png'),
    sound: require('./sounds/abecedario/K.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'L',
    img: require('./images/pictos/abecedario/L.png'),
    sound: require('./sounds/abecedario/L.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'M',
    img: require('./images/pictos/abecedario/M.png'),
    sound: require('./sounds/abecedario/M.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'N',
    img: require('./images/pictos/abecedario/N.png'),
    sound: require('./sounds/abecedario/N.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'O',
    img: require('./images/pictos/abecedario/O.png'),
    sound: require('./sounds/abecedario/O.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'P',
    img: require('./images/pictos/abecedario/P.png'),
    sound: require('./sounds/abecedario/P.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'Q',
    img: require('./images/pictos/abecedario/Q.png'),
    sound: require('./sounds/abecedario/Q.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'R',
    img: require('./images/pictos/abecedario/R.png'),
    sound: require('./sounds/abecedario/R.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'S',
    img: require('./images/pictos/abecedario/S.png'),
    sound: require('./sounds/abecedario/S.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'T',
    img: require('./images/pictos/abecedario/T.png'),
    sound: require('./sounds/abecedario/T.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'U',
    img: require('./images/pictos/abecedario/U.png'),
    sound: require('./sounds/abecedario/U.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'V',
    img: require('./images/pictos/abecedario/V.png'),
    sound: require('./sounds/abecedario/V.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'W',
    img: require('./images/pictos/abecedario/W.png'),
    sound: require('./sounds/abecedario/W.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'X',
    img: require('./images/pictos/abecedario/X.png'),
    sound: require('./sounds/abecedario/X.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'Y',
    img: require('./images/pictos/abecedario/Y.png'),
    sound: require('./sounds/abecedario/Y.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  {
    text: 'Z',
    img: require('./images/pictos/abecedario/Z.png'),
    sound: require('./sounds/abecedario/Z.mp3'),
    category: 'Abecedario',
    timesUsed: 0
  },
  // Enfermedades
  {
    text: 'Dolor de cabeza',
    img: require('./images/pictos/enfermedades/dolor_cabeza.png'),
    sound: require('./sounds/enfermedades/dolor_cabeza.mp3'),
    category: 'Enfermedades',
    timesUsed: 0
  },
  {
    text: 'Dolor de garganta',
    img: require('./images/pictos/enfermedades/dolor_garganta.png'),
    sound: require('./sounds/enfermedades/dolor_garganta.mp3'),
    category: 'Enfermedades',
    timesUsed: 0
  },
  {
    text: 'Dolor de muela',
    img: require('./images/pictos/enfermedades/dolor_muela.png'),
    sound: require('./sounds/enfermedades/dolor_muela.mp3'),
    category: 'Enfermedades',
    timesUsed: 0
  },
  {
    text: 'Dolor de tripa',
    img: require('./images/pictos/enfermedades/dolor_tripa.png'),
    sound: require('./sounds/enfermedades/dolor_estomago.mp3'),
    category: 'Enfermedades',
    timesUsed: 0
  },
  {
    text: 'Resfriado',
    img: require('./images/pictos/enfermedades/resfriado.png'),
    sound: require('./sounds/enfermedades/resfriado.mp3'),
    category: 'Enfermedades',
    timesUsed: 0
  }
  // Útiles
]

export default pictograms
