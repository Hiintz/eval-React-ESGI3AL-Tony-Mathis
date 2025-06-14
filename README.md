# Réseau Social - Frontend (eval)

Application React de réseau social développée avec Vite, permettant aux utilisateurs de partager des posts, réagir et interagir.

## Fonctionnalités

- **Authentification** : Pages d'inscription et connexion
- **Gestion des posts** : Créer, modifier, supprimer des publications
- **Images** : Upload et affichage d'images dans les posts (optionnel)
- **Réactions** : System de likes et réactions avec emojis

## Technologies

- **React (Vite)**
- **React Router**
- **CSS**
- **FontAwesome**

## Installation

```bash
# Cloner le projet
git clone https://github.com/Hiintz/eval-React-ESGI3AL-Tony-Mathis.git
cd frontend

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## Structure

```
src/
├── component/           # Composants réutilisables
│   ├── PostCard/        # Carte d'affichage des posts
│   ├── PostForm/        # Formulaire de création/édition
│   ├── PostList/        # Liste des posts
│   └── PasswordField/   # Champ mot de passe avec visibilité
├── page/                # Pages principales
│   ├── Home/            # Page d'accueil
│   ├── Login/           # Page de connexion
│   └── Signin/          # Page d'inscription
├── Utils/Hooks/         # Hooks personnalisés
│   ├── useGetRequest    # Hook pour requêtes GET
│   ├── usePostRequest   # Hook pour requêtes POST
│   ├── usePutRequest    # Hook pour requêtes PUT
│   └── useDeleteRequest # Hook pour requêtes DELETE
└── assets/              # Images et ressources
```

## Pages principales

- **`/`** - Feed principal avec posts paginés
- **`/login`** - Connexion utilisateur
- **`/signin`** - Inscription nouveau compte

## 🔧 Hooks personnalisés

Le projet utilise des hooks custom pour la gestion des requêtes API :
- Gestion automatique du loading et des erreurs
- Authentification automatique avec JWT
- Support FormData pour upload d'images

## API

Le frontend communique avec un backend Node.js/Express :
- Base URL : `http://localhost:3000`
- Authentification : JWT Bearer Token
- Endpoints : `/auth`, `/post`, `/user`, `/emoticon`

## 👥 Développé par

Mathis & Tony - ESGI3AL