export default class ViewHome {
  constructor() {
    this.person = {};

    this.header = document.getElementById("header");
    this.header.innerHTML = this.setHeader();

    this.root = document.getElementById("root");
    this.root.innerHTML = this.createTable();
    this.load();

    this.form = document.getElementById("personForm");

    this.form.addEventListener("change", this.handleChange);
    this.form.addEventListener("submit", this.handleSubmit);

    this.table = document.getElementById("dataTable");
    this.table.addEventListener("click", this.handleUpdateDelete);

  }

  load = async () => {
    let data = await fetch("http://localhost:3000/");

    let d = await data.json();

    d.forEach((element) => {
      this.createTableEntry(element);
    });
  };

  getNextId = async () => {
    let data = await fetch("http://localhost:3000/");

    let d = await data.json();

    let idList = [];

    d.forEach(element => {
      idList.push(element.id);
    })

    let nextId = idList.pop() + 1;
    return nextId;
  };

  createTableEntry = (obj) => {
    let table = document.getElementById("table");
    table.innerHTML += `<tr>
                                <th scope="row">${obj.id}</th>
                                <td>${obj.first_name}</td>
                                <td>${obj.last_name}</td>
                                <td>${obj.email}</td>
                                <td>
                                <button id="btnUpdate" class="btn btn-success">Update</button>
                                <button id="btnDelete" class="btn btn-danger">Delete</button>
                                </td>
                            </tr>`;
  };

  createTable = () => {
    return `<table id="dataTable" class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody id="table"></tbody>
      </table>`;
  };

  setHeader = () => {
    return `
        <div class="bg-dark text-light text-center py-1">
            <h1>Rest API</h1>
            <h2 class="text-success">Node Express</h2>
        </div>
        <div class="bg-light">
            <form id="personForm" class="p-3">
            <div class="form-group">
                <label for="fNameInput">First Name</label>
                <input type="text" class="form-control firstName" id="fNameInput" aria-describedby="emailHelp" placeholder="Enter Frist Name">
            </div>
            <div class="form-group">
                <label for="lNameInput">Last Name</label>
                <input type="text" class="form-control lastName" id="lNameInput" aria-describedby="emailHelp" placeholder="Enter Last Name">
                </div>
                <div class="form-group">
                <label for="emailInput">Email</label>
                <input type="email" class="form-control email" id="emailInput" aria-describedby="emailHelp" placeholder="Enter Email">
                </div>
            <button type="submit" id="btnAdd" class="btn btn-primary my-1">Add</button>
            </form>
        </div>
        `;
  };

  handleChange = (e) => {
    let obj = e.target;

    if (obj.classList.contains("firstName")) {
      this.person.first_name = obj.value;
    } else if (obj.classList.contains("lastName")) {
      this.person.last_name = obj.value;
    } else if (obj.classList.contains("email")) {
      this.person.email = obj.value;
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {

      let fName = document.getElementById('fNameInput');
      let lName = document.getElementById('lNameInput');
      let email = document.getElementById('emailInput');

      this.person.id = await this.getNextId();
      this.person.first_name = fName.value;
      this.person.last_name = lName.value;
      this.person.email = email.value;

      fName.value = "";
      lName.value = "";
      email.value = "";

      let options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(this.person),
      };

      let data = await fetch("http://localhost:3000", options);

      let d = await data.json();

      let table = document.getElementById("table");

      table.innerHTML = "";

      this.load();

      if (d !== "Am reusit") {
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleUpdateDelete = async (e) => {
    e.preventDefault();

    let obj = e.target;
    if (obj.id == "btnDelete") {
      let objId = obj.parentElement.parentElement.children[0].textContent;

      try {
        let options = {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        };

        let response = await fetch(`http://localhost:3000/${objId}`, options);

        let r = await response.json();

        let table = document.getElementById("table");

        table.innerHTML = "";

        this.load();


      } catch (error) {
          console.warn(error);
      }
    }else if(obj.id == "btnUpdate"){
        let fName = obj.parentElement.parentElement.children[1].textContent;
        let lName = obj.parentElement.parentElement.children[2].textContent;
        let email = obj.parentElement.parentElement.children[3].textContent;

        let fNameBox = document.createElement("input");
        fNameBox.classList.add("firstNameInput");
        fNameBox.value = fName;
        
        let firstName = obj.parentElement.parentElement.children[1];
        firstName.innerHTML = "";
        firstName.appendChild(fNameBox);

        let lNameBox = document.createElement("input");
        lNameBox.classList.add("lastNameInput");
        lNameBox.value = lName;
        
        let lastName = obj.parentElement.parentElement.children[2];
        lastName.innerHTML = "";
        lastName.appendChild(lNameBox);

        let emailInput = document.createElement("input");
        emailInput.classList.add("emailInput");
        emailInput.value = email;
        
        let emailBox = obj.parentElement.parentElement.children[3];
        emailBox.innerHTML = "";
        emailBox.appendChild(emailInput);

        obj.textContent = "Save";
        obj.id = "btnSave";
    } else if (obj.id == "btnSave"){
        let fNameInput = document.querySelector(".firstNameInput");
        let lNameInput = document.querySelector(".lastNameInput");
        let emailInput = document.querySelector(".emailInput");

        this.person.id = obj.parentElement.parentElement.children[0].textContent;
        this.person.first_name = fNameInput.value.trim();
        this.person.last_name = lNameInput.value.trim();
        this.person.email = emailInput.value.trim();

        let firstName = obj.parentElement.parentElement.children[1];
        let lastName = obj.parentElement.parentElement.children[2];
        let email = obj.parentElement.parentElement.children[3];

        firstName.innerHTML = this.person.first_name;
        lastName.innerHTML = this.person.last_name;
        email.innerHTML = this.person.email;

        this.handleUpdate();

        obj.textContent = "Update";
        obj.id = "btnUpdate";
    }
  };

  handleUpdate = async(e)=>{

    //e.preventDefault();
    try {
        let options = {
            method:"PUT",
            mode: "cors",
            headers:{
                "Content-Type": "application/json",
            },

            body: JSON.stringify(this.person)
        };

        let data = await fetch("http://localhost:3000",options);


    } catch (error) {
        console.warn(error);
    }

  }


}
