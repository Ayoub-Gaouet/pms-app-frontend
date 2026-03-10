# PMS App Frontend

## Description du projet
Ce projet est une application de gestion de production (Production Management System) développée avec Angular. Elle permet la gestion des machines, produits, fournisseurs et techniciens dans un environnement industriel.

## Technologies utilisées
- Angular 21
- Bootstrap 5
- Nginx (pour servir l’application en production)
- Docker & Docker Compose

## Prérequis
- [Docker](https://www.docker.com/products/docker-desktop) installé
- [Docker Compose](https://docs.docker.com/compose/) installé

## Instructions d’installation et d’exécution

### 1. Cloner le dépôt
```bash
git clone <url-du-repo>
cd pms-app-frontend
```

### 2. Construire et lancer l’application avec Docker Compose
```bash
docker-compose up --build
```
L’application sera accessible sur [http://localhost:8080](http://localhost:8080)

### 3. Arrêter les conteneurs
```bash
docker-compose down
```

## Structure du projet
- `src/` : code source Angular
- `Dockerfile` : construction de l’image Docker
- `docker-compose.yml` : orchestration du conteneur
- `nginx.conf` : configuration du serveur Nginx

## Auteur
- Ayoub GAOUET

---

# PmsApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
