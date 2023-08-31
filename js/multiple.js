
const loadCategoryName = async()=>{
 const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
 const data = await res.json()
 const categories = data.data
 displayShowName(categories)
}


const displayShowName = (categories) =>{
  const tabContainer = document.getElementById('tab-container')
  
  categories.forEach(category =>{
  const tabDiv = document.createElement('div')
   tabDiv.classList = ` ml-4`
  tabDiv.innerHTML = `
   <a class="tab btn-ghost normal-case bg-slate-200 rounded"> ${category.category} </a> 
  `
  tabContainer.appendChild(tabDiv)

  })

}


loadCategoryName()