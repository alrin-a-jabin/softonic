import React, { Component } from "react";
import SortableTbl from "react-sort-search-table";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from "react-select";
import UserHelper from "./partials/userHelper";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1,
      tabs: [],
      tableRowData: [],
      cartCount: 0,
      modal: false,
      firstName: "",
      lastName: "",
      tittle: "",
      gender: null,
      genderOptions: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
      ],
      email: "",
      userName: "",
      password: "",
      dob: "",
      phoneNumber: "",
      errorMessage: ""
    };
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/0.8/?results=20")
      .then(res => res.json())
      .then(
        (response) => {
          let tableData = response.results?.map((element) => ({
            gender: element.user.gender,
            name: `${element.user.name.title}. ${element.user.name.first} ${element.user.name.last} `,
            email: element.user.email,
            username: element.user.username,
            password: element.user.password,
            dob: element.user.dob,
            phone: element.user.phone
          }))
          this.setState({ tableRowData: tableData }, () => {
            // this.reload()
            localStorage.setItem("user", JSON.stringify(tableData));
          })

          // const userDetails = UserHelper.getUserDetails();
        },
        (error) => {
          console.log(error)
        }
      )
  }
  reload = () => {
    this.setState({ key: this.state.key + 1 })
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      errorMessage: ""
    })
  };
  handleOnChange = (event) => {
    const { name, value } = event.currentTarget;
    const state = { ...this.state };
    state[name] = value;
    this.setState(state);
  };

  handleChange = selectedCity => {
    this.setState({ selectedCity, series: [] }, () => {
      this.getPolutiondata()
    });
  };
  handleChange = gender => {
    this.setState({ gender });
  };
  onSubmit = () => {
    if (this.state.tittle == "" &&
      this.state.firstName == "" &&
      this.state.lastName == "" &&
      this.state.userName == "" &&
      this.state.password == "" &&
      this.state.dob == "" &&
      this.state.phoneNumber == "" &&
      this.state.gender == null
    ) {
      this.setState({ errorMessage: "Please enter all the fields" })
    } else {
      const data = {
        gender: this.state.gender?.value,
        name: `${this.state.tittle}. ${this.state.firstName} ${this.state.lastName} `,
        email: this.state.email,
        username: this.state.userName,
        password: this.state.password,
        dob: this.state.dob,
        phone: this.state.phoneNumber
      }
      console.log(data)
      let table = [...this.state.tableRowData];
      table.push(data);
      this.setState({ tableRowData: table }, () => {
        console.log(this.state.tableRowData, "tableRowData")
        localStorage.setItem("user", JSON.stringify(table));
      });
      this.toggle()
    }


  }
  render() {
    const {
      state: { modal,
        firstName,
        lastName,
        tittle,
        gender,
        email,
        userName,
        password,
        dob,
        phoneNumber,
        genderOptions,
        cartCount },
      onSubmit,
      handleOnChange,
      toggle
    } = this;
    let tHead = [
      "Name",
      "Gender",
      "Email",
      "User Name",
      "Password",
      "DOB",
      "Phone No",
    ];
    let col = [
      "name",
      "gender",
      "email",
      "username",
      "password",
      "dob",
      "phone",

    ];
    return (<>
      <header id="header" className="d-flex align-items-center">
        <div className="container d-flex align-items-center">
          <div className="logo me-auto">
            <h1>
              Welcome to dashboard
            </h1>
          </div>
          <div className="navbar">

          </div>
        </div>
      </header>
      <main >
        <div className="container" data-aos="fade-up">
          <div className="row no-gutters">
            <div className="col-lg-12 d-flex flex-column justify-content-center">
              <div className="d-flex mt-5 align-items-center justify-content-start mb-4 ">
                <h3 className="secondary-heading-normal m-0 table-header-label">
                  View List
                </h3>

                <button onClick={toggle} class="btn btn_User">Add User</button>


              </div>
              <div className="col-lg-12 ">
                <SortableTbl
                  key={this.state.key}
                  tblData={this.state.tableRowData}
                  tHead={tHead}
                  // customTd={[
                  //     { custd: BaseProductEditComponent, keyItem: "edit" },
                  //     { custd: BaseProductDeleteComponent, keyItem: "delete" },
                  // ]}
                  dKey={col}
                />
              </div>

            </div>
          </div>
        </div>
      </main>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader className="modaltop">Add User</ModalHeader>
        <ModalBody>
          <div className="row  mb-5">
            <div className="col-lg-12 col-sm-12">
              <label className="form-label">Tittle</label>
              <input
                onChange={handleOnChange}
                name="tittle"
                value={tittle}
                placeholder="Tittle"
                type="text"
                className="form-control mb-3"
              />
            </div>
            <div className="col-lg-12 col-sm-12">
              <label className="form-label">First Name</label>
              <input
                onChange={handleOnChange}
                name="firstName"
                value={firstName}
                label="First Name"
                placeholder="First Name"
                type="text"
                className="form-control mb-3"
              />
            </div>

            <div className="col-lg-12 col-sm-12">
              <label className="form-label">Last Name</label>
              <input
                onChange={handleOnChange}
                name="lastName"
                value={lastName}
                placeholder="Last Name"
                type="text"
                className="form-control mb-3"
              />
            </div>
            <div className="col-lg-12 col-sm-12 mb-3">
              <label className="form-label">Gender</label>
              <Select
                placeholder="Select City"
                value={gender}
                onChange={this.handleChange}
                options={genderOptions}
                classNamePrefix="Select"
                isClearable={true}

              />
            </div>
            <div className="col-lg-12 col-sm-12">
              <label className="form-label">Email</label>
              <input
                onChange={handleOnChange}
                name="email"
                value={email}
                placeholder="Enter Email"
                type="email"
                className="form-control mb-3"
              />
            </div>
            <div className="col-lg-12 col-sm-12">
              <label className="form-label">User Name</label>
              <input
                onChange={handleOnChange}
                name="userName"
                value={userName}
                placeholder="User Name"
                type="text"
                className="form-control mb-3"
              />
            </div>
            <div className="col-lg-12 col-sm-12">
              <label className="form-label">Password</label>
              <input
                onChange={handleOnChange}
                name="password"
                value={password}
                placeholder="Enter Password"
                type="password"
                className="form-control mb-3"
              />
            </div>
            <div className="col-lg-12 col-sm-12">
              <label className="form-label">DOB</label>
              <input
                onChange={handleOnChange}
                name="dob"
                value={dob}
                placeholder="Enter DOB"
                type="date"
                className="form-control mb-3"
              />
            </div>
            <div className="col-lg-12 col-sm-12">
              <label className="form-label">Phone</label>
              <input
                onChange={handleOnChange}
                name="phoneNumber"
                value={phoneNumber}
                placeholder="Phone Number"
                type="number"
                className="form-control mb-3"
              />
            </div>
            <div className="error">{this.state.errorMessage}</div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          <Button color="primary" className="btn_User" onClick={onSubmit}>Add User</Button>{' '}
        </ModalFooter>
      </Modal>
    </>
    );
  }
}

export default Dashboard;
