# Passaggio Consegne - V10 aree cliccabili precise

Questa versione mantiene la sincronizzazione Cloudflare Workers/D1 e corregge le aree cliccabili del layout tecnico.

## Novità V10

- Le aree cliccabili non sono più grandi come i macchinari.
- Ogni area è stata ridotta alla grandezza della scritta presente nel disegno tecnico.
- Ridotto il riconoscimento automatico del punto più vicino, per evitare aperture sbagliate quando si clicca tra due scritte.
- Rimane disponibile il menu **Seleziona punto** per scegliere manualmente la stazione.
- Il backend D1 resta compatibile con la V9. Non serve modificare il database.

## Pubblicazione

Carica tutti i file su GitHub Pages e apri il sito aggiungendo:

```text
?v=10
```

Esempio:

```text
https://marconeri70.github.io/passaggio-consegne/?v=10
```

Se vedi ancora la vecchia versione, svuota la cache o disinstalla/reinstalla la PWA.
