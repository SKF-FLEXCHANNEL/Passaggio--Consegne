# Punti cliccabili V7

I punti cliccabili sono definiti in `app.js`, nella costante `ZONES`.

Ogni punto usa percentuali dell'immagine:

```js
p('ID','Etichetta','Descrizione', x, y, w, h)
```

Dove:

- `x` = posizione orizzontale sinistra in percentuale
- `y` = posizione verticale alta in percentuale
- `w` = larghezza area cliccabile
- `h` = altezza area cliccabile

In questa versione le aree sono posizionate sulle scritte del layout, non sui pallini o sulle macchine.
Per verificare l'allineamento, aprire il menu ☰ e selezionare **Mostra/Nascondi aree cliccabili**.
