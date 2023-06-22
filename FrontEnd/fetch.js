fetch('http://localhost:5678/api/works')
  .then(function(APIreponse) {
    return APIreponse.json();
  })
  .then(function(tousProjetsJSON) {
    function afficheProjetsGalerie(projets) {
      const galleryElement = document.querySelector('.gallery');
      galleryElement.innerHTML = '';

      projets.forEach(function(projet) {
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const textElement = document.createElement('p');

        figureElement.setAttribute('data-projet', projet.id);
        imgElement.src = projet.imageUrl;
        imgElement.alt = projet.title;
        textElement.innerHTML = projet.title;

        figureElement.appendChild(imgElement);
        figureElement.appendChild(textElement);

        galleryElement.appendChild(figureElement);
      });
    }

    function filtrerProjetsParCategorie(categorieId) {
      const projetsFiltres = tousProjetsJSON.filter(function(projet) {
        return projet.categoryId === categorieId;
      });

      afficheProjetsGalerie(projetsFiltres);
    }

    function afficherTousLesProjets() {
      afficheProjetsGalerie(tousProjetsJSON);
    }

    afficheProjetsGalerie(tousProjetsJSON);

    const btnObjets = document.querySelector('#btn-objets');
    const btnAppartements = document.querySelector('#btn-appartements');
    const btnHotels = document.querySelector('#btn-hotels');
    const btnToutAfficher = document.querySelector('#btn-tout-afficher');

    btnObjets.addEventListener('click', function() {
      filtrerProjetsParCategorie(1); 
    });

    btnAppartements.addEventListener('click', function() {
      filtrerProjetsParCategorie(2);
    });

    btnHotels.addEventListener('click', function() {
      filtrerProjetsParCategorie(3); 
    });

    btnToutAfficher.addEventListener('click', function() {
      afficherTousLesProjets();
    });

    const categoriesUniques = new Set(tousProjetsJSON.map(function(projet) {
      return projet.categoryId;
    }));

    console.log(categoriesUniques);
  });
