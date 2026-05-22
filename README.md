# Passaggio Consegne - Anomalie Turno

Webapp PWA per registrare anomalie di turno e visualizzarle su layout interattivo della linea.

## Funzioni
- Inserimento anomalie per Zona 1, Zona 2, Zona 3 e Generale
- Layout interattivo con punti OP/Robot/Lavatrice/Porta
- Popup anomalia cliccando sui punti del layout
- Stato anomalia: Aperta, In lavorazione, Risolta
- Salvataggio locale con localStorage
- Esportazione testo e stampa/PDF
- Installabile come PWA su telefono e PC

## Come pubblicarla su GitHub Pages
1. Crea un nuovo repository GitHub.
2. Carica tutti i file del progetto.
3. Vai su Settings > Pages.
4. In Branch seleziona `main` e cartella `/root`.
5. Salva e attendi il link pubblico.

## Come modificare i punti del layout
Apri `app.js` e modifica le coordinate dentro `puntiLayout`.
Le coordinate `x` e `y` sono in percentuale sulla foto.
