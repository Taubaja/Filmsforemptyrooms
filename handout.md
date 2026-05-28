# Handout — Films for empty rooms

## Cartographie du site

```
/
  Page d'accueil — scroll infini sans footer
  ├── Ticker (contact défilant horizontal CSS, sans bordure)
  ├── 16 œuvres, titre + réalisateur centrés dans la page
  │   └── Clic → bandeau s'ouvre en dessous, scroll horizontal
  │       ├── ← flèche gauche (absolute, cercle blanc, left: 8px)
  │       ├── Panneau Synopsis (client + synopsis, min-width 420px)
  │       ├── Panneau Fiche technique (réalisateur, client, crédits)
  │       ├── Panneau Galerie (stills en ligne, overflow-x si > 3 photos)
  │       ├── Panneau Trailer (player Vimeo)
  │       └── → flèche droite (absolute, cercle blanc, right: 8px)
  ├── Croix × (fermeture manuelle, absolute top-right)
  ├── IntersectionObserver + sentinel → injection infinie de batches
  └── rAF polling → fermeture auto si bandeau sort du viewport

/contact (drawer)
  Panneau glissant depuis la droite (380px), fond semi-transparent
  Adresse (Montréal), Thomas Jabouley (Directeur executif),
  email, tel, Instagram

/contact (page)
  Page dédiée avec les mêmes infos, data-driven depuis studio.json

/talents/[slug]
  Page réalisateur — nom, bio, Instagram, liste verticale des films

/talents/[slug]/[film]
  Page projet — player Vimeo, CLIENT — TITRE, synopsis, crédits,
  galerie stills, 3 projets liés

/404
  Page introuvable
```

## Structure du projet

```
Filmsforemptyrooms/
  astro.config.mjs              — site URL + @astrojs/sitemap
  package.json                  — astro, lenis, @astrojs/sitemap
  vercel.json                   — déploiement Vercel
  netlify.toml                  — déploiement Netlify
  .github/workflows/deploy.yml  — CI/CD GitHub Actions
  public/
    favicon.svg
    og-image.svg
  src/
    data/
      directors.json            — 4 réalisateurs, 16 films (client, credits, stills)
      studio.json               — singleton (Montréal, Thomas Jabouley)
    layouts/
      Layout.astro              — shell global (nav, contact drawer, footer, Lenis, dark mode, cookies)
    pages/
      index.astro               — homepage (ticker + accordéon horizontal + scroll infini)
      contact.astro             — page contact data-driven
      404.astro
      talents/
        [slug].astro            — page réalisateur
        [slug]/[film].astro     — page projet
    styles/
      global.css                — tout le CSS
```

## Données actuelles

**studio.json**
- Nom : Films for empty rooms
- Adresse : Montréal
- Tagline : Creative production company.
- EP : Thomas Jabouley, Directeur executif
- Email : thomas@filmsforemptyrooms.com
- Tel : +1 514 555 0100

**directors.json**
- 4 réalisateurs : Sophie Marchand, Lucas Delcourt, Emma Lindqvist, Karim Benali
- 16 films avec client, synopsis, crédits, stills (placeholder)

## Comportement actuel

### Bandeau fermé
- Titre + réalisateur centrés dans la page
- Aucune bordure, aucune ligne de séparation
- Police : titre 24px, réalisateur 20px, body 19px

### Bandeau ouvert (clic)
- Le titre descend légèrement (margin-bottom: 16px)
- Les panneaux apparaissent en dessous avec animation scaleY + opacity
- Scroll horizontal natif (overflow-x: auto, scroll-snap-type: x mandatory)
- 4 panneaux de min-width 420px, qui s'étendent si le contenu déborde
- Galerie en flex-wrap: nowrap avec overflow-x auto
- Flèches ← → en absolute (cercles 44×44px) à gauche/droite
- Flèche gauche masquée au début, droite masquée à la fin
- Croix × en absolute top-right pour fermer
- Une seule ligne ouverte à la fois

### Fermeture automatique
- rAF polling vérifie getBoundingClientRect() de la ligne ouverte
- Si rect.bottom < 0 ou rect.top > window.innerHeight → close()
- Zéro dépendance externe

### Scroll infini
- IntersectionObserver sur une sentinel invisible (1px div)
- rootMargin: 200px desktop, 400px mobile
- Injection : clone du ticker + 16 œuvres avant la sentinel
- La sentinel reste au fond, repoussée à chaque injection

### Contact drawer
- Bouton "Contact" dans la nav ouvre un panneau 380px depuis la droite
- Fond semi-transparent (rgba(0,0,0,0.2)), page visible derrière
- Fermeture : croix ×, clic sur le fond, ou Escape

### Dark mode
- Toggle soleil/lune dans la nav
- CSS variables sur body.dark
- Persistance localStorage
- Transition 300ms sur background et color

### Ticker
- Ruban défilant horizontal CSS (animation ticker 30s linear infinite)
- Contient : adresse, email, EPs, Instagram
- Contenu dupliqué dans la track pour boucle seamless
- Sans bordure

## Ce qui a été fait

1. Scaffold Astro 5.x, design system monochrome, Lenis, drag-scroll
2. 4 réalisateurs, 16 films en JSON statique, getStaticPaths
3. Corrections scroll (preventDefault conditionnel, data-lenis-prevent)
4. Renommage MAISON POSTMERIDIAN → Films for empty rooms
5. Menu mobile, footer enrichi, studio.json, @astrojs/sitemap
6. Dark mode (CSS variables + localStorage)
7. Redesign DIPLOMATS (Inter, UPPERCASE, hash anchors)
8. URL scheme /talents/[slug]/[film]
9. Ticker infini CSS
10. Accordéon : hover → clic → sticky horizontal → vertical centré → horizontal avec flèches
11. Fermeture auto : IntersectionObserver → wheel → rAF polling
12. Scroll infini : clonage ×3 → wheel reset → IntersectionObserver + sentinel
13. Lenis npm (remplace CDN)
14. CI/CD (GitHub Actions, Vercel, Netlify)
15. Cookie banner RGPD
16. Contact drawer (remplace page contact comme accès principal)
17. Données réelles : Montréal, Thomas Jabouley
18. Suppression de toutes les bordures/lignes de séparation
19. Galerie en scroll horizontal natif
20. Flèches en absolute (fiables, toujours visibles)

## Ce qui a fonctionné

- Astro SSG : build ~560ms, 23 pages
- getStaticPaths : génération propre
- Lenis smooth scroll
- IntersectionObserver + sentinel : injection infinie fluide
- rAF polling : fermeture auto fiable, zéro race condition
- Dark mode toggle
- CSS ticker seamless
- Flèches en absolute : toujours visibles, jamais cachées incorrectement
- Données data-driven (studio.json, directors.json)
- Contact drawer : slide fluide, backdrop semi-transparent

## Ce qui n'a pas fonctionné (et solutions)

### Scroll bloqué sur les strips
- preventDefault() sur wheel empêchait le scroll vertical
- Solution : ne preventDefault que si le strip peut scroller

### Lenis vs scrollIntoView
- scrollIntoView ignoré par Lenis
- Solution : window.lenis.scrollTo()

### Scroll infini v1 (wheel + reset)
- Lenis clamp le scroll à [0, limit]
- Solution : écouter wheel natif

### Scroll infini v2 (clonage ×3 + rAF)
- Micro-saut visible au reset
- Abandonné pour IntersectionObserver

### Lenis module script timing
- type="module" est deferred, window.lenis undefined
- Solution : polling → puis rAF (plus de dépendance Lenis)

### Animation display:none ↔ flex
- display n'est pas animable
- Solution : max-height + opacity + scaleY

### Flèches dans le scroll container
- Flex children avec overflow:hidden, parfois invisibles
- Solution : flèches en absolute dans le row, en dehors du scroll

### Bloc CSS dupliqué
- Deux blocs .work-section__arrow, le second avec display:flex écrasait le premier
- Solution : suppression du bloc dupliqué

### Bordures quadrillage
- border-bottom, border-right partout donnait un effet grille
- Solution : suppression de toutes les bordures

---

## TODO

### Phase 1 — Contenu & lancement (bloquant — nécessite les données réelles)
- [ ] Remplacer les 30 images picsum.photos → vraies images (Imgix/CDN)
- [ ] Remplacer les 16 Vimeo IDs demo → vrais liens
- [ ] Remplacer les URLs Instagram placeholder → vrais comptes
- [ ] Remplacer contenu éditorial (bios, synopsis, noms réalisateurs)
- [ ] Créer favicon.ico + og-image.jpg 1200×630px
- [ ] Mettre à jour `site` dans astro.config.mjs → vrai domaine
- [x] Crédits design/développement dans le footer ✅
- [ ] Si reel vidéo existe, renseigner reelVimeoId dans studio.json

### Phase 2 — Polish technique
- [x] Lenis via npm ✅
- [x] CI/CD (GitHub Actions + Vercel/Netlify) ✅
- [x] Scroll infini mobile (rootMargin dynamique) ✅
- [x] Cookie banner RGPD ✅
- [x] Indicateur visuel cliquable (letter-spacing) ✅
- [x] Tests Playwright (9 smoke tests) ✅
- [ ] Optimisation images (WebP, AVIF) — après remplacement des placeholder

### Phase 3 — Optionnel
- [x] Logo SVG (inline dans la nav) ✅
- [ ] Ticker en bas plutôt qu'en haut
- [x] Splash screen (1.5s / 1.2s / 100ms selon contexte) ✅
- [x] Page /a-propos (tabs, 2 colonnes) ✅
- [x] Page /contact (tabs, 6 catégories) ✅
- [x] Lightbox galerie (clic photo → plein écran) ✅
- [x] Scroll logo fixe (après 300px, retour en haut) ✅
- [x] Nav clones tous les 3 cycles (logo seul + full nav) ✅
- [x] Dark mode (inversé : dark par défaut, light via .light) ✅
- [x] Contact drawer → remplacé par page /contact dédiée ✅

### Résumé
- **Fait** : 17/17 items techniques
- **Bloqué** : 6 items Phase 1 (données réelles)
- **Restant** : 1 optionnel (ticker en bas)
