function GenerateProduct(product){
      let img = product.images[0]
      let name = product.title
      let desc = product.description 
      let price = product.price

      console.log(product)

      const card = document.createElement('div')
      card.classList.add('card')

      let imgDOM = document.createElement('img')
      imgDOM.src = img
      imgDOM.style.width = 128 + 'px'
      imgDOM.id = 'displayImg'

      let nameDOM = document.createElement('h2')
      nameDOM.innerText = name
      nameDOM.id = 'title'

      let descDOM = document.createElement('span')
      descDOM.innerText = desc
      descDOM.id = 'desc'

      let priceDOM = document.createElement('span')
      priceDOM.innerText = price 

      let addBtDOM = document.createElement('button')
      addBtDOM.innerText = 'Add'
      addBtDOM.id = 'AddBt'

      const wrap2 = document.createElement('div')
      wrap2.classList.add('wrap2')
      wrap2.appendChild(descDOM)

      const cardBody = document.createElement('div')
      cardBody.classList.add('card_body')

      const cardFooter = document.createElement('div')
      cardFooter.classList.add('card_footer')

      const cardPrice = document.createElement('div')
      cardPrice.classList.add('card_price')

      let currencyDOM = document.createElement('span')
      currencyDOM.innerText = '$'
      currencyDOM.id = 'currency'

      cardPrice.appendChild(currencyDOM)
      cardPrice.appendChild(priceDOM)

      cardFooter.appendChild(cardPrice)
      cardFooter.appendChild(addBtDOM)

      wrap2.appendChild(cardFooter)

      const wrap3 = document.createElement('div')
      wrap3.classList.add('wrap3')
      wrap3.appendChild(imgDOM)

      cardBody.appendChild(nameDOM)
      cardBody.appendChild(wrap2)

      card.appendChild(wrap3)
      card.appendChild(cardBody)

      const cards = document.querySelector('.cards')
      cards.appendChild(card)
}

function DeleteProducts(){
  let cards = document.querySelector('.cards')
  for (let card of Array.from(cards.children)){
    card.remove()
  }
}

async function GetInfo(){
  try{
    const responce = await fetch('https://dummyjson.com/products')
    if(!responce.ok){
      throw new Error('Error:' + responce.status)
    }

    const data = await responce.json()

    console.log(data)

    const searctBt = document.getElementById('searchBt')
    const searchDOM = document.getElementById('inputDOM')
    
    searctBt.addEventListener('click', async () => {
      const currentText = searchDOM.value

      try{
        const search = await fetch('https://dummyjson.com/products/search?q=' + currentText)

        if(!search.ok){
          throw new Error(search.status)
        }

        const searchData = await search.json()
        DeleteProducts()
        for (let product of searchData.products){
          GenerateProduct(product)
        }

        console.log(searchData)
      }catch(error){
        console.log(error)
      }
      
    })

    for (let product of data.products){
      GenerateProduct(product)
    }
  }
  catch(error){
    console.error(error)
  }
}

GetInfo()