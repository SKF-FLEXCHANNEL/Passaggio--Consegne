# Passaggio Consegne - Layout Interattivo V4

Webapp per registrare anomalie di turno usando i layout ripuliti di Zona 1, Zona 2 e Zona 3.

## Correzione principale V4

Le scritte presenti nelle immagini JPG non sono veri testi HTML. Per renderle cliccabili, questa versione usa due sistemi insieme:

1. aree trasparenti sovrapposte alle scritte;
2. click su tutta l'immagine con selezione automatica del punto più vicino.

Quindi, anche se non tocchi esattamente l'area, l'app apre comunque il punto più vicino.

## File

```text
passaggio-consegne-click-fix-v4/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── service-worker.js
├── img/
│   ├── zona1.jpg
│   ├── zona2.jpg
│   └── zona3.jpg
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── data/
    └── punti-cliccabili.md
```

## Pubblicazione su GitHub Pages

1. Crea o apri il repository GitHub.
2. Carica tutti i file e le cartelle nella root del repository.
3. Vai su **Settings > Pages**.
4. Seleziona branch `main` e cartella `/root`.
5. Apri il link GitHub Pages.

## Dopo l'aggiornamento

Se sul telefono vedi ancora la vecchia versione, apri il sito aggiungendo `?v=4` alla fine del link oppure cancella la cache del sito da Chrome.

## Modifica punti cliccabili

I punti sono nel file `app.js`, dentro `ZONES`. Ogni punto ha:

```js
{id:'OP30A', label:'OP30A', x:22.2, y:27.0, w:6.8, h:4.5}
```

- `x` e `y` sono l'angolo alto sinistro in percentuale.
- `w` e `h` sono larghezza e altezza dell'area cliccabile in percentuale.
- Attiva **Mostra aree cliccabili** nella webapp per vedere i rettangoli.
