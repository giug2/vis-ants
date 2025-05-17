# 🐜 vis-ants
Progetto individuale per il corso di Visualizzazione delle Informazioni – A.A. 2024/2025

## Descrizione
Crea un file json con dei dati multivariati: ci sono 10 data-cases e ogni data-case ha sei variabili quantitative i cui valori sono tutti positivi. In base a questi dati disegna 10 formiche nell'area di disegno (ogni formica corrisponde ad un data-case). La prima variabile determina la posizione orizzontale della formica, la seconda variabile la posizione verticale, la terza variabile la dimensione dell'addome, la quarta variabile la lunghezza delle antenne, e così via. Facendo click con il pulsante sinistro su una formica, la formica rimane selezionata. Quando fai click su una seconda formica le due formiche si scambiano tutte le variabili, con eccezione di quelle utilizzate per la coordianta x e y. Fai in modo che i cambi di dimensioni delle formiche avvengano con una transizione fluida. Usa le scale di D3.js per mappare il dominio delle variabili (che deve poter essere arbitrario) nel range dei valori che ti servono, che invece è determinato dalla tua interfaccia.

### Caratteristiche principali
🔢 Dati multivariati: ogni formica rappresenta un data-case con 7 variabili quantitative.
La prima variabile determina la posizione orizzontale (x).
La seconda variabile determina la posizione verticale (y).
La terza variabile determina la grandezza dell'addome.
La quarta variabile determina la lunghezza delle antenne.
La quinta variabile determina la grandezza della testa.
La sesta variabile determina la lunghezza delle zampe.
La settima variabile determina il colore della formica.

#### Interazione:
Click sinistro su una formica → la seleziona.
Click su una seconda formica → le due si scambiano tutte le variabili, eccetto quelle usate per x e y.
