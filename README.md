# Passaggio Consegne HMI

Webapp per registrare anomalie di turno usando i layout interattivi di Zona 1, Zona 2 e Zona 3.

## Funzioni

- Layout interattivo per Zona 1, Zona 2 e Zona 3
- Punti cliccabili su OP, robot, porte, lavatrici, quadri e controlli
- Inserimento anomalia con data/ora, turno, operatore, priorità, stato e consegna
- Stati: Aperta, In lavorazione, Risolta
- Storico anomalie
- Report passaggio consegne
- Esportazione TXT e JSON
- Importazione backup JSON
- Stampa / salvataggio PDF
- PWA installabile su telefono e PC
- Funziona anche offline dopo il primo caricamento

## Pubblicazione su GitHub Pages

1. Crea una repository su GitHub, ad esempio `passaggio-consegne`.
2. Carica tutti i file di questa cartella nella repository.
3. Vai su **Settings > Pages**.
4. In **Build and deployment**, seleziona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Salva.
6. Dopo qualche minuto apri il link GitHub Pages.

## Modifica dei punti

I punti sono nel file `app.js`, dentro `ZONES`.
Le coordinate sono percentuali, quindi restano allineate anche se l'immagine cambia dimensione.

Esempio:
```js
{id:'OP30A', label:'OP30A', x:25.7, y:26.0, type:'Magazzino sfere'}
```

## Nota importante

I dati vengono salvati nel browser con `localStorage`. Per non perderli, usa periodicamente **Esporta backup JSON**.
