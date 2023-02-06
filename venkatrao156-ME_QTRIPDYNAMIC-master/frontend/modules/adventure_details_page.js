import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  if (search !== "") {
    let Id = search.split("=")[1].trim();
    return Id;
  } else {
    // Place holder for functionality to work in the Stubs
    return null;
  }
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {

    let respose = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    let data=await respose.json();
    return data;
  } catch (error) {

    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
    document.getElementById("adventure-name").textContent=`${adventure.name}`
    document.getElementById("adventure-subtitle").textContent=`${adventure.subtitle}`
    adventure.images.forEach((element)=>{
     document.getElementById("photo-gallery").innerHTML+=
          `<div class="activity-card-image"><img src=${element}></div>`
    })
    
   document.getElementById("adventure-content").textContent=`${adventure.content}`
  
  }
  

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML=
  `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner ">

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
   `
  
  images.forEach((element,index) => {
    document.querySelector(".carousel-inner").innerHTML+=` <div class="carousel-item activity-card-image ${index==0?'active':''}">
    <img src="${element}" class="d-block w-100" alt="...">
  </div>`
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display="none"
    document.getElementById("reservation-panel-available").style.display="block"
    document.getElementById("reservation-person-cost").textContent=`${adventure.costPerHead}`
  }
  else{
    document.getElementById("reservation-panel-available").style.display="none"
    document.getElementById("reservation-panel-sold-out").style.display="block"
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
      document.getElementById("reservation-cost").textContent=`${persons*adventure.costPerHead}`
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  let reservedDataToSend ={
  name:'',
  date:'',
  person:'',
  adventure:adventure.id
  }
  let myform= document.getElementById("myForm");
  myform.addEventListener('submit',async(e)=>{
    e.preventDefault();
    reservedDataToSend.name=myform.elements["name"].value;
    reservedDataToSend.date=myform.elements["date"].value;
    reservedDataToSend.person=Number(myform.elements["person"].value)
    console.log(JSON.stringify(reservedDataToSend))
    try {
      const response = await fetch(`${config.backendEndpoint}/reservations/new`,
       {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservedDataToSend)
      });
     
    let data = await response.json();
      alert("Success!")
      window.location.reload(true);
    } catch (error) {
      alert("Failed!")
    }
  })
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
   
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display="block"
  }else{
    document.getElementById('reserved-banner').style.display="none"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
