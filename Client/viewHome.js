export default class ViewHome{

    constructor(){
        this.header = document.getElementById("header");
        this.header.innerHTML = this.setHeader();

        this.root = document.getElementById("root");
        this.root.innerHTML = this.createTable();
    
        this.load();
    }


    load=async()=>{

        let data = await fetch("http://localhost:3000/");

        let d=await data.json();

        d.forEach(element => {
            this.createTableEntry(element);   
        });

    }

    createTableEntry = (obj) => {
        let table = document.getElementById("table");
        table.innerHTML += `<tr>
                                <th scope="row">${obj.id}</th>
                                <td>${obj.first_name}</td>
                                <td>${obj.last_name}</td>
                                <td>${obj.email}</td>
                            </tr>`;
    }

    createTable = () => {
        return `<table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody id="table"></tbody>
      </table>`;
    }

    setHeader = () => {
        return `
        <div class="bg-dark text-light text-center py-1">
            <h1>Rest API</h1>
            <h2 class="text-success">Node Express</h2>
        </div>
        <div class="bg-light">
            <form class="p-3">
            <div class="form-group">
                <label for="fNameInput">First Name</label>
                <input type="email" class="form-control" id="fNameInput" aria-describedby="emailHelp" placeholder="Enter Frist Name">
            </div>
            <div class="form-group">
                <label for="lNameInput">Last Name</label>
                <input type="email" class="form-control" id="lNameInput" aria-describedby="emailHelp" placeholder="Enter Last Name">
                </div>
                <div class="form-group">
                <label for="emailInput">Email</label>
                <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter Email">
                </div>
            <button id="btnAdd" class="btn btn-primary my-1">Add</button>
            <button id="btnUpdate" class="btn btn-success">Update</button>
            <button id="btnDelete" class="btn btn-danger">Delete</button>
            </form>
        </div>
        `;
    }

}