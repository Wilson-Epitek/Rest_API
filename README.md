# Rest_API

## Description
Ce projet est une API REST permettant de gérer des items et des catégories dans une base de données MySQL. Il utilise Express.js et interagit avec MySQL via des requêtes CRUD (Create, Read, Update, Delete).

## Prérequis
Avant de commencer, assurez-vous d'avoir installé les éléments suivants :
- Node.js 
- MySQL 
-Mamp
- phpMyAdmin (optionnel)

## Installation

### Cloner le projet
Exécutez les commandes suivantes :
```bash
git clone <URL_DU_REPOSITORY>
cd <NOM_DU_REPOSITORY>
```

### Installer les dépendances
Dans le répertoire du projet, exécutez :
```bash
npm install
```

### Configurer la base de données MySQL
1. Créez une base de données appelée `restapi2`.
2. Importez la structure SQL suivante pour créer les tables `items`, `categories`, et `items_categories` :
```sql
CREATE TABLE items (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  price float NOT NULL,
  description text NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE categories (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE items_categories (
  id_item int(11) NOT NULL,
  id_categorie int(11) NOT NULL,
  FOREIGN KEY (id_item) REFERENCES items (id) ON DELETE CASCADE,
  FOREIGN KEY (id_categorie) REFERENCES categories (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

### Lancer le serveur
Exécutez la commande suivante :
```bash
node app.js
```
Le serveur sera lancé sur (http://localhost:3000)

## Routes API

1. **GET /items**
   - **Description** : Récupère tous les items de la base de données.
   - **URL** : http://localhost:3000/items
   - **Méthode HTTP** : GET
   - **Réponse** : Liste des items en JSON.

2. **POST /createitems**
   - **Description** : Crée un nouvel item.
   - **URL** : http://localhost:3000/createitems
   - **Méthode HTTP** : POST
   - **Body (exemple)** :
   ```json
   {
     "name": "Item 1",
     "price": 29.99,
     "id_category": 1,
     "description": "Description de l'item"
   }
   ```
   - **Réponse** : Retourne l'item créé.

3. **PUT /updateitems/:id**
   - **Description** : Met à jour un item existant.
   - **URL** : http://localhost:3000/updateitems/:id
   - **Méthode HTTP** : PUT
   - **Body (exemple)** :
   ```json
   {
     "name": "Item mis à jour",
     "price": 19.99,
     "id_category": 2,
     "description": "Nouvelle description"
   }
   ```
   - **Réponse** : Message de succès.

4. **DELETE /deleteItems/:id**
   - **Description** : Supprime un item selon son ID.
   - **URL** : http://localhost:3000/deleteItems/:id
   - **Méthode HTTP** : DELETE
   - **Réponse** : Message de confirmation ou erreur si l'item n'est pas trouvé.

5. **GET /getItems2**
   - **Description** : Récupère les items avec leurs catégories associées.
   - **URL** : http://localhost:3000/getItems2
   - **Méthode HTTP** : GET
   - **Réponse** : Liste des items et des catégories associées.
   - **Exemple de réponse** :
   ```json
   [
     {
       "item_id": 1,
       "item_name": "Item 1",
       "category_id": 1,
       "category_name": "Category A"
     }
   ]
   ```

## Structure des fichiers
- **app.js** : Fichier principal qui contient toutes les routes et la connexion à la base de données.
- **README.md** : Ce fichier, fournissant une documentation du projet.

## Technologies utilisées
- **Express.js** : Framework web pour Node.js.
- **MySQL** : Base de données relationnelle utilisée pour stocker les items et catégories.

## Lancer en développement
Utilisez `nodemon` pour redémarrer automatiquement le serveur à chaque modification :
```bash
npm install -g nodemon
nodemon app.js
```

En suivant ces instructions, vous devriez pouvoir voir le fichier `README.md` avec toutes les informations bien structurées dans VS Code.