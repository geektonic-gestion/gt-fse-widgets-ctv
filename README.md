# GT Widgets CTOUTVERT

**Plugin WordPress pour afficher des widgets CTOUTVERT avec une gestion avancée des paramètres.**

## Description

Le plugin **GT Widgets CTOUTVERT** permet d'intégrer facilement divers widgets CTOUTVERT dans vos pages WordPress. Il offre une personnalisation avancée à travers des options configurables et des attributs data dynamiques. Ce plugin est compatible avec les versions 6.1 et supérieures de WordPress et nécessite PHP 7.0 ou supérieur.

## Fonctionnalités

- **Widgets configurables** : Choisissez parmi plusieurs widgets comme la liste, la barre de recherche, les produits, les cartes, les tarifs, et bien plus encore.
- **Support des attributs data** : Ajoutez des attributs data personnalisés pour chaque widget.
- **Options globales et par post** : Configurez des identifiants globaux et des options de groupe qui peuvent être surchargés au niveau de chaque post.
- **Support des meta-boxes** : Gère les meta-boxes pour tous les types de posts publics.
- **Compatible avec l'API REST** : Les meta-données peuvent être accessibles et modifiées via l'API REST de WordPress.

## Installation

1. Téléchargez et extrayez le dossier du plugin dans le répertoire `wp-content/plugins/` de votre installation WordPress.
2. Activez le plugin via l'interface d'administration de WordPress dans la section **Extensions**.
3. Configurez les options du plugin sous **Réglages > Widgets CTOUTVERT**.

## Utilisation

### Configuration

Après avoir activé le plugin, vous pouvez configurer les options globales dans **Réglages > Widgets CTOUTVERT**. Ces options incluent :

- **Identifiant global** : Un identifiant unique utilisé pour tous les widgets.
- **idGroup ?** : Une option permettant de spécifier si l'identifiant est un identifiant de groupe.

### Utilisation dans les Posts

Dans l'éditeur de blocs, vous pouvez ajouter un bloc **GT Widgets CTOUTVERT**. Sélectionnez le widget que vous souhaitez afficher et personnalisez-le en utilisant les différentes options disponibles.

### Data Attributes

Vous pouvez ajouter des attributs data personnalisés à chaque widget en utilisant le champ prévu à cet effet dans le panneau de configuration du bloc.

## Accès via l'API REST

Les meta-données `_gt_ctv_global_id` et `_gt_ctv_id_group` sont accessibles et modifiables via l'API REST de WordPress. Cela permet une gestion avancée via des applications externes.
