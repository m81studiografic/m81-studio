# M81 Studio — reguli de proiect

## Reguli permanente pentru conținut (Jurnal / articole)

1. **Fără autor / scriitor.** Nu se afișează niciodată numele autorului sau al scriitorului, nicăieri, chiar dacă apare în codul mockup-ului — se scoate. Autorul e implicit M81.

2. **Imagini DOAR din lumea branding / business / produse / servicii.** Fiecare imagine (copertă și corp) trebuie să arate clar branding, afaceri, produse sau servicii. INTERZIS: metafore din natură (frunze, plante, răsaduri, peisaje), instrumente muzicale, sport sau orice subiect care nu ține de business/branding. Coperta trebuie să reflecte CLAR subiectul articolului (ex: articol despre startupuri → echipă de startup / fondatori / lansare de afacere). „Creșterea" se ilustrează în context de business (scalare, sistem de brand aplicat, expansiune), NU cu plante.

3. **Imagini cu influențe românești / pentru publicul român.** Regula se aplică imaginilor **create/alese de noi** (coperți, figuri editoriale): NU trebuie să conțină text în limba engleză (sau altă limbă străină) vizibil și NU trebuie să afișeze prețuri în valută străină ($, €). Se preferă imagini cu senzație românească/locală (ex: piață, produse locale, lei/RON) sau imagini neutre fără text străin vizibil.
   - **Excepție: screenshot-urile subiectului analizat** (ex. site-ul evaluat într-un Design critique) reflectă realitatea — engleză, valută străină etc. sunt acceptate, fiindcă analizăm chiar materialul lor.

4. **Verificare vizuală obligatorie.** Înainte de a folosi orice imagine, se descarcă și se deschide efectiv (nu se alege doar după ID/descriere), ca să se confirme că respectă regulile 2 și 3.

5. **Imagini landscape.** Imaginile din corp și coperțile trebuie să fie landscape (lățime > înălțime). Scripturile de upload au un guard care respinge automat imaginile portret.

## Context tehnic

- Next.js 16 (App Router, Turbopack), next-intl (locale `ro`/`en`, default `ro`).
- CMS: Sanity (projectId `bkejlgaa`, dataset `production`, apiVersion `2025-05-30`).
- Articolele de jurnal: categorie `branding` ("Branding & Experience"), câmpuri RO + EN (titleRo/titleEn etc.), corp Portable Text (bodyRo/bodyEn) cu blocuri: lead (blockquote), h2, figure (cu captionRo/captionEn), pullQuote, callout, statement, liste bullet.
- Token Sanity local: `~/.config/sanity/config.json` → câmp `authToken`. Scripturile se rulează cu `SANITY_TOKEN=$(...) node scripts/<x>.mjs`.
- Deploy: Vercel din push pe `main`. Producție: m81studio.ro. Pagini ISR (`revalidate = 60`).
