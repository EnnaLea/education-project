# Education Project
Questo progetto è un'applicativo JavaScript che utilizza le API di Open Library per cercare libri in base alla categoria e visualizzarne i risultati in formato di cards. È possibile ottenere ulteriori dettagli sui libri cliccando sul pulsante "Get Description", che aprirà un modal con la descrizione del libro.


# Link sito:
https://booksearchapp1one.netlify.app/


## Prerequisiti

- Node.js installato sul tuo sistema.
- NPM (Node Package Manager) installato sul tuo sistema.


## Istruzioni per l'installazione
1. Clona il repository da GitHub:

   ```bash
   git clone https://github.com/EnnaLea/education-project
   ```


# Inizializzazione progetto
- Aprire il file da linea di comando

bash:

- `npm init -y`
- `npm i -D webpack webpack-cli `


# Aprire il progetto nell' IDE


# Configurazione delle variabili d'ambiente
Crea un file .env nella radice del progetto e inserisci le seguenti variabili d'ambiente con i seguenti valori:

OPENLIBRARY_API_KEY = https://openlibrary.org

OPENLIBRARY_API_KEY_COVER = https://covers.openlibrary.org


## Cancellare il file index.js che si trova alla radice del progetto


## Copiare la cartella img che si trova in src nella cartella dist:
bash:

- `npm run build:dev`
- copiare la cartella img in dist


## Avviare l'applicazione
Una volta che le variabili d'ambiente sono configurate, puoi avviare l'applicazione con i seguente comandi:

bash -`npm run build`

- avvia il server locale per visualizzare l'applicazione: 
  -`npm run serve`
  L'applicazione sarà disponibile all'indirizzo http://localhost:8080 nel tuo browser.


## Utilizzo

    Inserisci una categoria nel campo di ricerca e premi il pulsante di ricerca.
    I risultati verranno visualizzati come cards contenenti informazioni sui libri.
    Clicca sul pulsante "Get Description" su una card per visualizzare una descrizione dettagliata del libro in un modal.


# Contribuire

Se desideri contribuire a questo progetto, segui questi passaggi:

    Forca il repository.
    Crea un nuovo branch (git checkout -b feature/nome-feature).
    Commit le tue modifiche (git commit -am 'Aggiungi nuove feature').
    Pusha il branch (git push origin feature/nome-feature).
    Apri una Pull Request.
