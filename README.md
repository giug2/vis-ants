🐜 vis-ants
Progetto individuale per il corso di Visualizzazione delle Informazioni – A.A. 2024/2025

Descrizione
vis-ants è una visualizzazione interattiva realizzata con D3.js, in cui ogni formica rappresenta un data-case multivariato. A partire da un dataset JSON con 10 data-case e 6 variabili quantitative positive per ciascun caso, ogni formica viene disegnata nell’area grafica con attributi visivi derivati dai dati.

Caratteristiche principali
🔢 Dati multivariati: ogni formica rappresenta un data-case con 6 variabili quantitative.

📍 Posizionamento:

La prima variabile determina la posizione orizzontale (x).

La seconda variabile determina la posizione verticale (y).

🐜 Aspetto (mappato tramite le altre variabili):

Addome → dimensione determinata dalla terza variabile

Antenne → lunghezza determinata dalla quarta variabile

Altri dettagli (es. zampe, colore, spessore, ecc.) possono essere mappati usando la quinta e sesta variabile.

🖱️ Interazione:

Click sinistro su una formica → la seleziona.

Click su una seconda formica → le due si scambiano tutte le variabili, eccetto quelle usate per x e y.

🌐 Transizioni fluide: i cambiamenti nelle dimensioni o nell’aspetto della formica avvengono con animazioni fluide.

📏 Scale dinamiche: vengono usate scale di D3.js per mappare i valori arbitrari dei dati su range visivi coerenti con l'interfaccia.

Come iniziare
Clona il repository:

bash
Copia
Modifica
git clone https://github.com/tuo-username/vis-ants.git
cd vis-ants
Apri index.html in un browser per vedere la visualizzazione.

Struttura del progetto
graphql
Copia
Modifica
vis-ants/
├── data/
│   └── ants-data.json       # Dataset JSON con 10 data-case e 6 variabili ciascuno
├── css/
│   └── style.css            # Stili per l’interfaccia
├── js/
│   └── main.js              # Codice JavaScript con D3.js per visualizzazione e interazioni
└── index.html               # Entry point del progetto
Requisiti
Browser moderno (Chrome, Firefox, Edge)

Connessione locale (non richiede server backend)

Libreria D3.js v7+

Autore
[Tuo Nome]
Progetto per il corso di Visualizzazione delle Informazioni – Università degli Studi di [Nome Università], A.A. 2024/2025

