// Featch call for images set by the onswer
const imageLoading = document.getElementById('loader')
const gallerRow = document.getElementById('GalleryRow')
//console.log(imageLoading.length)
window.addEventListener('load', () => {
  
	fetch('http://sms-api.softsubversion.com/v1/gallery/', {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		}
	})
	//check responce 
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
      
    }
    
    return response.json();
  })

  .then(data => {
    imageLoading.hidden = true
    for(let indexGal = 0; indexGal < data.length; indexGal++) {
      // create the col for each galler
      const galCol = document.createElement('div')
      galCol.classList.add('col-12', 'mt-2', 'mb-2')
      galCol.onclick = function(){
        window.location.href = `/gallery-view.html?gal=${data[indexGal].slug}&name=${data[indexGal].name}`;
      }
      // create card
      
      const galCard = document.createElement('div')
      const checkSide = leftOrRight((indexGal + 1))
      if (checkSide === 'right') {
        galCard.classList.add('card', 'card-attrs', 'card-attrs-right')
      } else {
        galCard.classList.add('card', 'card-attrs', 'card-attrs-left')
      }
      
      // create text with name of header
      const galP = document.createElement('p')
      galP.classList.add('p-p','text-center', 'gal-title')
      galP.innerHTML = data[indexGal].name
      // create image loaders
      const cardHead = document.createElement('div')
      cardHead.classList.add('card-shot')

      const imgDiv = document.createElement('img')
      imgDiv.classList.add('img-fluid')
      imgDiv.src = data[indexGal].header_image
     
      cardHead.appendChild(imgDiv)
      galCard.appendChild(galP)
      galCard.appendChild(cardHead)

      galCol.appendChild(galCard)
      gallerRow.appendChild(galCol)

    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
	
});

// left or right
function leftOrRight (number) {
  return number % 2 === 0 ? 'left' : 'right';
  
}
