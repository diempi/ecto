# ecto

Simple/fast node.js blogging system.

* * *

**ecto** is an educational project, which I wish to use as a support for node.js courses.

**Note:** The school where I teach, the HEPL from Liège, Belgium, is a french-speaking school. From this point, the instructions will be in french. Sorry.

* * *

**ecto** est un projet d'apprentissage, que j'aimerai utiliser comme support de cours sur node.js.

* * *

## Introduction

**ecto** va nous tenir occupé quelques semaines, et sera l'occasion de nous pencher sur plusieurs *technos*, certaines déjà vues au cours (avec moi ou dans d'autres cours), d'autres inédites.

## CDC

Le *cahier des charges* du projet est assez simple : nous voulons un moteur de blog simplissime, qui stockera les billets dans des fichiers (sans base de données, donc) en utilisant le format *markdown* pour l'encodage de la mise en forme des billets.

### Partie publique

La partie publique de notre système comportera deux pages : la **page d'accueil**, qui affichera une liste des billets publiés (un billet est publié si sa date est passée), et une **page de billet**, qui, comme son nom l'indique, affichera un billet en entier.

### Partie administration

L'administration sera assez simple et comportera un système **d'authentification** (via login/mot de passe) menant à l'affichage de la **liste des billets** (avec les traditionnelles options **d'ajout**, **d'édition** et **de suppression**).  
Chacune de ces fonctions sera implémentée d'abord de manière classique (avec rechargement complet de la page), puis via *AJAX*.

L'interface de **rédaction de billet** sera un peu spéciale et comportera deux volets côte à côte, le second affichant en direct et via *AJAX* une preview de la syntaxe *markdown* du billet en cours de rédaction.

### Langages et outils

#### Langages

Pour la réalisation de ce projet, nous utiliserons les langages et *frameworks* suivants :

Nos billets seront rédigés en [markdown](http://daringfireball.net/projects/markdown/).

La *logique serveur* sera en **javascript**, via [node.js](http://nodejs.org).  
Nous utiliserons le package [express](http://expressjs.com) pour le service et le routage, et les templates utiliseront le langage [jade](http://jade-lang.com).  
Pour convertir les billets du format *markdown* vers *html*, nous utiliserons le package [markdown.js](http://github.com/evilstreak/markdown-js).

Côté *client*, nous utiliserons [jQuery 2](http://jquery.com) pour nos scripts et [sass](http://sass-lang.com) pour nos feuilles de styles, avec l'aide du framework [bourbon](http://bourbon.io) et de son système de grille [neat](http://neat.bourbon.io).

#### Outils

Lors du développement de notre projet, nous allons utiliser [Vagrant](http://www.vagrantup.com/), un gestionnaire de machines virtuelles, afin d'avoir la certitude que nous aurons tous le même environnement de travail.

Nous utiliserons aussi [grunt](http://gruntjs.com), un *gestionnaire d'automation*, afin de contrôler en direct la qualité de notre code via [JSHint](http://www.jshint.com), ainsi que relancer notre serveur node via [nodemon](http://remy.github.io/nodemon/).

Et bien sûr, nous utiliserons [git](http://git-scm.com) via [github](http://github.com) comme gestionnaire de versions.

## Déroulement

Notre projet ne se fera bien entendu pas en une scéance, mais sera réparti sur plusieurs semaines de cours.

1. Présentation du projet et des outils
2. Partie publique
3. Interface d'administration
4. Styles du projet
5. Apport d'AJAX dans l'interface d'administration

* * *

## Mise en place

### Environnement

Afin de commencer à travailler sur **ecto**, il vous faut d'abord installer [Vagrant](http://www.vagrantup.com/).

Une fois cela fait et le repo de **ecto** cloné sur votre machine, utilisez la ligne de commande et entrez :

    $> vagrant up && vagrant ssh

Lors de la procédure, il est possible que Vagrant vous demande de choisir une interface réseau : entrez le numéro de l'interface qui est actuellement connectée à internet.  
Une fois la procédure d'installation terminée (ça peut prendre quelques minutes), vous serez connectés à la machine virtuelle d'**ecto**, entrez les commandes suivantes pour commencer à travailler :

    $> cd /vagrant
    $> grunt work

Vous devriez pouvoir vous connecter à l'adresse [http://10.0.1.50/](http://10.0.1.50/) et voir le `Hello, World !` de **ecto**.

Tant que la tâche *grunt* n'est pas interrompue, à chaque modification d'un fichier de code, *grunt* passera votre projet à *JSHint* puis relancera le server, afin que vous puissiez voir immédiatement les modifications en rechargeant la page du navigateur.

### Fonctionnement du repo

La branche **master** du repo [leny/ecto](http://github.com/leny/ecto) contient les fichiers de configuration et les toutes petites bases du projet.
C'est cette branche que vous devez utiliser comme base pour commencer votre travail.

La branche **dev** du repo [leny/ecto](http://github.com/leny/ecto) contient le "*corrigé*" : c'est sur cette branche que je réalise le project de mon côté.
