# Punti cliccabili

Questa versione usa aree trasparenti sopra le scritte già presenti nelle immagini.

Per ogni zona i punti sono definiti nel file `app.js`, dentro `const ZONES`.

Coordinate usate:

- `x` e `y` = centro dell'area cliccabile in percentuale.
- `w` e `h` = larghezza e altezza dell'area cliccabile in percentuale.

Esempio:

```js
{id:'OP30A', label:'OP30A - Magazzino sfere', x:24.5, y:29.5, w:7, h:5, type:'Magazzino sfere'}
```

Se un'area non prende bene il click:

1. attiva `Mostra aree cliccabili` nella webapp;
2. apri `app.js`;
3. modifica leggermente `x`, `y`, `w`, `h`;
4. salva e ricarica la pagina.
