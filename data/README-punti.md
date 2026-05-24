# Punti cliccabili

I punti cliccabili sono definiti nel file `app.js`, dentro l'oggetto `ZONES`.
Ogni punto usa coordinate percentuali sull'immagine:

```js
p('ID', 'Etichetta', 'Descrizione', x, y, w, h)
```

Dove:
- `x` = distanza da sinistra in percentuale
- `y` = distanza dall'alto in percentuale
- `w` = larghezza area cliccabile in percentuale
- `h` = altezza area cliccabile in percentuale

Per controllare l'allineamento dall'app, attiva il comando **Mostra aree cliccabili**.
