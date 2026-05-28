# Architecture du site — Maison de production

## Pages publiques

### Pages principales
- `/` — Page d'accueil (roster des réalisateurs)
  - Hero (vidéo reel / image / animation / direct liste)
  - Tagline / claim de la boîte
  - Liste des réalisateurs (Layout A / B / C)
  - Footer
- `/[slug-realisateur]` — Page dédiée à chaque réalisateur
  - En-tête (nom, disciplines, portrait)
  - Biographie
  - Grille de projets
  - Distinctions & palmarès
  - CTA contact
- `/[slug-realisateur]/[slug-film]` — Page dédiée à chaque film/projet
  - Lecteur vidéo
  - Métadonnées du projet
  - Navigation projet précédent / suivant
  - Retour page réalisateur
  - Galerie complémentaire (stills)
- `/work` ou `/films` — Catalogue global cross-réalisateurs *(optionnel)*
  - Grille de tous les projets
  - Filtres (réalisateur / catégorie / année)
- `/contact` — Page contact
  - Infos EP / producteurs
  - Emails & réseaux
- `/a-propos` ou section inline home — Manifeste *(optionnel)*

---

## Pages système

- `404` — Page d'erreur dans le ton éditorial du site
- Splash screen / page de chargement *(optionnel)*
- Écran cookies / RGPD — minimaliste

---

## Composants globaux

### Navigation
- Header fixe pleine largeur
  - Logo / wordmark (lien vers `/`)
  - Liens desktop : Réalisateurs / Work / Contact
  - Switcher FR/EN *(optionnel)*
  - Menu mobile (burger ou inline)
    - Overlay plein écran ou drawer latéral
    - Bouton fermer (croix)

### Footer
- Email, ville, Instagram, copyright
- Crédits design / développement

---

## Structure CMS (contenu dynamique)

### Réalisateur
- Nom complet + slug URL
- Photo portrait (multi-formats)
- Biographie
- Disciplines (tags)
- Instagram / site perso
- Images preview home (strip 3–4 photos)
- Ordre d'affichage + statut visible/masqué

### Film / Projet
- Titre + slug URL
- Réalisateur (relation)
- URL Vimeo
- Thumbnail
- Année / catégorie / client
- Synopsis, sélections, crédits, galerie stills *(optionnel)*
- Épinglé en une + ordre d'affichage + statut visible/masqué

### Boîte (singleton)
- Nom, tagline, adresse, email général
- EP(s) : nom, rôle, email, téléphone
- Instagram, autres réseaux
- Vidéo reel home *(optionnel)*
- Texte "À propos" *(optionnel)*

---

## Assets & livrables

### Design (Figma)
- Design system (couleurs, typo, espacements, composants)
- Maquettes desktop & mobile de toutes les pages
- États interactifs (hover / focus / active / loading)
- Annotations transitions & animations
- Spécifications redline développeur
- Prototype cliquable *(optionnel)*

### Fichiers à livrer
- Logo SVG (toutes versions)
- Favicon `.ico` + PNG 32×32 / 180×180
- `og:image` 1200×630px
- Polices web `.woff2` + licences
- Tokens CSS *(optionnel)*