window.onload = initAll;
document.getElementById('notify').style.visibility="hidden";

let saveBookBtn;
function initAll() {
  saveBookBtn = document.getElementById('save_book');
  saveBookBtn.onclick = saveBook;
}

function saveBook() {
  name = document.getElementById('name').value;
  page = document.getElementById('page').value;
  price = document.getElementById('price').value;

  let url = '/save_book?name=' + name + '&pages=' + page + '&price=' + price;
  req = new XMLHttpRequest()
  req.open('GET', url, true)
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText == 'true') {
        document.getElementById('name').value = "";
        document.getElementById('page').value = "";
        document.getElementById('price').value = "";
        let notifyDiv  =document.getElementById('notify')
        notifyDiv.style.visibility="visible";
        notifyDiv.innerHTML= name+" is added to Library"
        setTimeout(function(){ notifyDiv.style.visibility="hidden"; }, 2000);
        
      }
    }
  }
  req.send()
}

function showAllBooks() {
  document.getElementById('nav-profile').innerHTML = ""
  url = 'showBooks/'
  req = new XMLHttpRequest()
  req.open('GET', url, true)
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(req.responseText);
      let div_data = document.getElementById('nav-profile')
      let table = document.createElement('table');
      
      let row = table.insertRow(0)

      let name = row.insertCell(0)
      let page = row.insertCell(1)
      let price = row.insertCell(2)
      let deletebook = row.insertCell(3)
      name.innerHTML = "Book Name";
      page.innerHTML = "Book Pages";
      price.innerHTML = "Book Price";
      deletebook.innerHTML = "Delete Book"

      for (let i = 0; i < data.length; i++) {
        let row = table.insertRow(i + 1)
        let name = row.insertCell(0)
        let page = row.insertCell(1)
        let price = row.insertCell(2)
        let deletebook = row.insertCell(3)
        name.innerHTML = data[i].name
        page.innerHTML = data[i].page
        price.innerHTML = data[i].price
        deletebook.innerHTML = "&times"
        deletebook.className = "text-center text-danger deleteButton"
        deletebook.id = data[i].id
        deletebook.style.fontSize = "25px"
        deletebook.style.cursor = "pointer"
        // deletebook.className='deleteButton'
        deletebook.onclick = function () {
          let id =this.id
          let obj =this
          url = 'deletebook/?id='+id
          req = new XMLHttpRequest()
          req.open('GET', url, true)
          req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              if(this.responseText=="true"){
                // document.getElementById('nav-profile-tab').click()
                table.deleteRow(obj.parentNode.rowIndex)

              }
            }
          }
          req.send()
        }

      }
      table.className = "table text-center table-striped";
      div_data.appendChild(table)

    }
  }
  req.send()
}

