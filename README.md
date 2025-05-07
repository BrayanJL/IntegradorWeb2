Juego de preguntas y respuestas con 3 tipos de preguntas: 

1. Pregunta por la capital de un país.
2. Pregunta por la bandera de un país.
3. Pregunta por los paises limítrofes de un país.

Son 4 respuestas posibles (Una sola correcta) ordenadas al azar. Las respuestas correctas se pintan de verde mientras que las incorrectas de rojo.
Una vez contestada la pregunta se podrá pasar a la siguiente.

Las preguntas se cargan al cargarse la página o al finalizar una partida y se debe esperar a que estas se carguen 
antes de poder interactuar con la interfaz de inicio. Si una petición a la API produce un error entonces se hará una petición a un archivo local en su lugar.

Las preguntas son 10 en total, cada una preguntará en base a una subregión diferente cada vez. Las preguntas también son al azar.


Todo el programa corre dentro de la misma url pero el documento cambiará para presentar diferentes interfaces:

1. Interfaz de inicio.
2. Interfaz del jugador.
3. Interfaz del juego.
4. Interfaz de resultados de la partida.
5. Interfaz del ranking de jugadores.

Interfaz de inicio: 
Desde aquí se podrá ir a la interfaz del jugador y a la del ranking.

Interfaz del jugador: 
Desde aquí se podra nombrar al jugador. También se podrá volver al inicio y empezar a jugar yendo a la interfaz del juego.

Interfaz del juego: 
Aquí aparecerán las preguntas en la pantalla una a la vez hasta que se respondan 10. 
Una ves respondidas las 10 preguntas se cargara la interfaz de resultados de la partida.

Interfaz de resultados de la partida:
Está muestra una tabla con los respuestas correctas, incorrectas, el tiempo tardado por pregunta, el puntaje sumado por pregunta.
También las respuestas correctas e incorrectas totales, el tiempo tardado en responder todas las preguntas y el puntaje acumulado.
Además, desde esta interfaz se podra ir devuelta a la interfaz de inicio y a la interfaz del ranking de jugadores.

Interfaz del ranking de jugadores:
Esta muestra una tabla con las 20 mejores partidas. 
Cada fila contiene la posición en el ranking, el nombre del jugador, la cantidad de respuestas correctas, el tiempo tardado en total y el puntaje total.
La primera fila contiene la mejor partida y la fila 20 la peor del ranking.
El orden se decide en base al puntaje, respuestas correctas y el tiempo en ese orden.
Desde esta interfaz también se podrá volver a la interfaz de inicio.
