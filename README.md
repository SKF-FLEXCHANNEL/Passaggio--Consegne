# Passaggio Consegne - Anomalie Turno

Webapp/PWA per registrare anomalie di linea e consegne tra turni.

## Funzioni
- Inserimento anomalie per Zona 1, Zona 2, Zona 3 o Generale
- Stato: Aperta, In lavorazione, Risolta
- Priorità: Alta, Media, Bassa
- Salvataggio locale nel browser
- Esportazione testo
- Stampa/PDF
- Installabile come PWA

## Pubblicazione su GitHub Pages
1. Crea un nuovo repository su GitHub.
2. Carica tutti questi file nella root del repository.
3. Vai su Settings > Pages.
4. In "Build and deployment" scegli:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /root
5. Premi Save.
6. Dopo qualche minuto l'app sarà online.

## File principali
- `index.html`: struttura della webapp
- `style.css`: grafica
- `app.js`: logica e salvataggio dati
- `manifest.json`: configurazione PWA
- `service-worker.js`: uso offline/cache
