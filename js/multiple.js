
const loadCategoryName = async()=>{
 const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
 const data = await res.json()
 const categories = data?.data
 displayShowName(categories)
}


const displayShowName = (categories) =>{
  const tabContainer = document.getElementById('tab-container')
  
  categories.forEach(category =>{
  const tabDiv = document.createElement('div')
   tabDiv.classList = `ml-4`
  tabDiv.innerHTML = `
   <a onclick="handlerIdLoad('${category?.category_id}')" class="tab btn-ghost normal-case bg-slate-200 rounded" > ${category?.category} </a> 
   
   `
  tabContainer.appendChild(tabDiv)

  })

}

let sortingItems;

// handler categoryId 
const handlerIdLoad= async(categoryId="1000") =>{
   const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
   const data = await res.json()
    let categories = data.data;
   
    handlerCategoryCard(categories)

    const stortingSystem = document.getElementById('sortingId');
    stortingSystem.addEventListener('click', ()=>{
      let otherSorting =[...categories]
      otherSorting = otherSorting?.sort(function(a, b){return b.others?.views?.slice(0,3) - a.others?.views?.slice(0,3)});
      handlerCategoryCard(otherSorting)
    })
}

//default id call 
handlerIdLoad()


const handlerCategoryCard = (categories) =>{
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
 
  // Error Message Not found
  const errorMessage = document.getElementById('error-message')

  if(categories.length === 0){
     errorMessage.classList.remove('hidden')
  }else{
       errorMessage.classList.add('hidden')
  }



   categories.forEach(category =>{
      
   const number = category?.others?.posted_date || ' ';
   const numberConvert = parseInt(number);
   
// convert Hours and Minute
   const  convertHoursMinute = (numberConvert) =>{
      if(!isNaN(numberConvert)){
            const hour = numberConvert / 60 ;
            const houred = Math.floor(hour);
            const hours = houred / 60 ;
            const currentHours = Math.floor(hours)
            const minute = Math.floor(hour % 60) ;
           return ` ${currentHours} hrs   ${minute} minute ago `
         
      }
    
   }
   
  const result =  convertHoursMinute(numberConvert)





   const cardDiv = document.createElement('div')
   cardDiv.classList = `card card-compact bg-base-300 shadow-xl p-2`
   cardDiv.innerHTML = `
          
         <figure class="h-40 relative"><img class="w-full"  src="${category?.thumbnail}" alt="Shoes" />
         
         <p class="absolute right-3 bottom-3 text-white bg-black rounded p-1"> ${result ? result : ' '} </p>
         </figure>
         
         <div class="card-body">
          <div class="flex items-center">
        <div class="avatar">
           <div class="w-12 rounded-full  ring-offset-base-100 ring-offset-2">
           <img src="${category?.authors[0]?.profile_picture}" />
          </div>
       </div>

          <div><h2 class="card-title ml-2"> ${category?.title}</h2> </div>
          
          </div>

          <div class="flex justify-center items-center">
          
         <div><p class="font-semibold  text-slate-500"> ${category?.authors[0]?.profile_name} </p></div>
         <div class="ml-3 ">${category?.authors[0]?.verified ? `<p><i class="fa-solid fa-circle-check  text-[#2568EF] text-2xl"></i></p>`:' '}  </div>
         </div>

       <p class="text-center"> ${category?.others?.views} views </p>
   </div>   
   
   `
    cardContainer.appendChild(cardDiv)
   })
}



loadCategoryName()








