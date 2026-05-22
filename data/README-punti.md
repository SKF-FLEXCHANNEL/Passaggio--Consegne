# Punti inseriti nei layout

Le coordinate dei punti sono dentro `app.js`, nell'oggetto `ZONES`.
Sono espresse in percentuale rispetto all'immagine: `x` da sinistra a destra, `y` dall'alto verso il basso.

Esempio:
```js
{id:'OP30A', label:'OP30A', x:25.7, y:26.0, type:'Magazzino sfere'}
```

Se un punto va spostato leggermente:
- aumenta `x` per spostarlo a destra
- diminuisci `x` per spostarlo a sinistra
- aumenta `y` per spostarlo in basso
- diminuisci `y` per spostarlo in alto

Le immagini usate sono:
- `img/zona1.jpg`
- `img/zona2.jpg`
- `img/zona3.jpg`
