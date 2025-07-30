let title= document.getElementById("title");
let price= document.getElementById("price");
let taxes= document.getElementById("taxes");
let ads= document.getElementById("ads");
let discount= document.getElementById("discount");
let total= document.getElementById("total");
let count= document.getElementById("count");
let category= document.getElementById("category");
let submit= document.getElementById("submit");
let mood='creat'
let searchMood='Title'
let search = document.getElementById('search')
let searchTitle= document.getElementById('searchTitle')
let searchCategory= document.getElementById('searchCategory')
function getTotal() {
        if (price.value != '') {
            let result = (+price.value + +taxes.value + +ads.value)- +discount.value
            total.innerHTML =result
            total.style.backgroundColor="#040"
        } else {
            total.innerHTML ='0'
            total.style.backgroundColor="#a00d02"
        }
}
let dataPro = [];
if (localStorage.products) {
    dataPro = JSON.parse(localStorage.products);
} else {
    dataPro = [];
}

submit.onclick = function() {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    if (mood==='creat') {
            if (newPro.count>1) {
        for (let i = 0; i <newPro.count; i++) {
            dataPro.push(newPro);
            
        }
    }else{
      dataPro.push(newPro);
    }
    } else {
        dataPro[tmp]=newPro
        mood='creat'
        submit.innerHTML='create'
        count.style.display='block'
    }

    localStorage.setItem("products", (JSON.stringify(dataPro)));
       cleardata()
       showData()
    
    }

function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
function showData() {
    let table = '';
 for (let i=0; i < dataPro.length; i++) {
    table +=`<tr class="product-row">
                        <td data-label="منتج رقم">${1+i}</td>
                        <td data-label="العنوان">${dataPro[i].title}</td>
                        <td data-label="السعر">${dataPro[i].price}</td>
                        <td data-label="الضرائب">${dataPro[i].taxes}</td>
                        <td data-label="الإعلانات">${dataPro[i].ads}</td>
                        <td data-label="الخصم">${dataPro[i].discount}</td>
                        <td data-label="الإجمالي">${dataPro[i].total}</td>
                        <td data-label="الفئة">${dataPro[i].category}</td>
                        <td><button onclick="upDate(${i})" class="update">update</button></td>
                        <td><button onclick="Delete(${i})" class="delete">delete</button></td>
                    </tr>`
 }
 let tbody = document.getElementById('tbody');
 tbody.innerHTML = table
 let BtnDelete = document.getElementById('DeleteAll')
if (dataPro.length > 0) {
    BtnDelete.innerHTML= `<button onclick='DeleteAll()' >Delete All ${dataPro.length}</button>`
} else {
    BtnDelete.innerHTML=''
}
}

showData()

function Delete(i){
    dataPro.splice(i,1)
    localStorage.products=JSON.stringify(dataPro)
    showData()
}
function DeleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()

}


function upDate(i){
    title.value= dataPro[i].title;
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display='none'
    category.value = dataPro[i].category
    submit.innerHTML='Update'
mood='update'
tmp=i
scroll({top:0,behavior:'smooth'})

}
function getSearchmood(id) {
    if (id === 'searchTitle') {
        searchMood='Title'
        search.placeholder = 'search by Title'
    } else {
        searchMood='category'
        search.placeholder = 'search by Category'

        }
    search.focus()
}

function searchData(value) {
    let table = '';
    let tbody = document.getElementById('tbody');
    if (searchMood === 'Title') {
        for (let i = 0; i <dataPro.length; i++) {
           if (dataPro[i].title.includes(search.value)) {

    table +=`<tr>
                        <td>${1+i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="upDate(${i})" class="update">update</button></td>
                        <td><button onclick="Delete(${i})" class="delete">delete</button></td>
                    </tr>`
 tbody.innerHTML = table} else {
           tbody.innerHTML = ''
           }
            
        }
    }
   else
    {
        for (let i = 0; i <dataPro.length; i++) {
           if (dataPro[i].category.includes(search.value)) {

    table +=`<tr>
                        <td>${1+i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="upDate(${i})" class="update">update</button></td>
                        <td><button onclick="Delete(${i})" class="delete">delete</button></td>
                    </tr>`
 tbody.innerHTML = table} else {
           tbody.innerHTML = ''
           }

        }
    }
}
