import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class App extends Component {
  state = {
    cakes: [],
    newCakeData: {
      name: '',
      imageUrl: '',
      comment: '',
      yumFactor: ''
    },
    editCakeData: {
      id: '',
      name: '',
      imageUrl: '',
      comment: '',
      yumFactor: ''
    },
    newCakeModal: false,
    editCakeModal: false,
    viewCakeModal: false
  }
  componentDidMount() {
    this._refreshCakes();
  }
  toggleNewCakeModal() {
    this.setState({
      newCakeModal: ! this.state.newCakeModal
    });
  }
  toggleEditCakeModal() {
    this.setState({
      editCakeModal: ! this.state.editCakeModal
    });
  }
  toggleViewCakeModal() {
    this.setState({
      viewCakeModal: ! this.state.viewCakeModal
    });
  }

  addCake() {
    axios.post('http://localhost:8080/cakes', this.state.newCakeData, {
      auth: {
        username: 'demo',
        password: 'demo'
      }
    }).then((response) => {
      let { cakes } = this.state;

      cakes.push(response.data);

      this.setState({ cakes, newCakeModal: false, newCakeData: {
        name: '',
        imageUrl: '',
        comment: '',
        yumFactor: ''
      }});
    });
  }

  updateCake() {
    let { name, imageUrl, comment, yumFactor } = this.state.editCakeData;

    axios.put('http://localhost:8080/cakes/' + this.state.editCakeData.id, {
      name, imageUrl, comment, yumFactor
    }, {
      auth: {
        username: 'demo',
        password: 'demo'
      }
    }).then((response) => {
      this._refreshCakes();

      this.setState({
        editCakeModal: false, editCakeData: { id: '', name: '', imageUrl: '', comment: '', yumFactor: '' }
      })
    });
  }

  editCake(id, name, imageUrl, comment, yumFactor) {
    this.setState({
      editCakeData: { id, name, imageUrl, comment, yumFactor }, editCakeModal: ! this.state.editCakeModal
    });
  }

  viewCake(id) {
    axios.get('http://localhost:8080/cakes/' + id, {
      auth: {
          username: 'demo',
          password: 'demo'
        }
    }).then((response) => {
        this.setState({
          editCakeData: response.data, viewCakeModal: ! this.state.viewCakeModal
        });
    })
  }

  deleteCake(id) {
    axios.delete('http://localhost:8080/cakes/' + id, {
      auth: {
        username: 'demo',
        password: 'demo'
      }
    }).then((response) => {
      this._refreshCakes();
    });
  }

  _refreshCakes() {
    axios.get('http://localhost:8080/cakes', {
      auth: {
        username: 'demo',
        password: 'demo'
      }
    }).then((response) => {
      this.setState({
        cakes: response.data
      })
    });
  }

  render() {
    let cakes = this.state.cakes.map((cake) => {
      return (
        <tr key={cake.id}>
          <td>{cake.id}</td>
          <td onClick={this.viewCake.bind(this, cake.id)}>{cake.name}</td>
          <td onClick={this.viewCake.bind(this, cake.id)}>{cake.imageUrl}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editCake.bind(this, cake.id, cake.name, cake.imageUrl, cake.comment, cake.yumFactor)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteCake.bind(this, cake.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Cakes App</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewCakeModal.bind(this)}>Add Cake</Button>

      <Modal isOpen={this.state.newCakeModal} toggle={this.toggleNewCakeModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewCakeModal.bind(this)}>Add a new cake</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.newCakeData.name} onChange={(e) => {
              let { newCakeData } = this.state;

              newCakeData.name = e.target.value;

              this.setState({ newCakeData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="imageUrl">ImageUrl</Label>
            <Input id="imageUrl" value={this.state.newCakeData.imageUrl} onChange={(e) => {
              let { newCakeData } = this.state;

              newCakeData.imageUrl = e.target.value;

              this.setState({ newCakeData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="comment">Comment</Label>
            <Input id="comment" value={this.state.newCakeData.comment} onChange={(e) => {
              let { newCakeData } = this.state;

              newCakeData.comment = e.target.value;

              this.setState({ newCakeData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="yumFactor">Yum Factor</Label>
            <Input id="yumFactor" value={this.state.newCakeData.yumFactor} onChange={(e) => {
              let { newCakeData } = this.state;

              newCakeData.yumFactor = e.target.value;

              this.setState({ newCakeData });
            }} />
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addCake.bind(this)}>Add Cake</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewCakeModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editCakeModal} toggle={this.toggleEditCakeModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditCakeModal.bind(this)}>Edit a cake</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={this.state.editCakeData.name} onChange={(e) => {
              let { editCakeData } = this.state;

              editCakeData.name = e.target.value;

              this.setState({ editCakeData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="imageUrl">ImageUrl</Label>
            <Input id="imageUrl" value={this.state.editCakeData.imageUrl} onChange={(e) => {
              let { editCakeData } = this.state;

              editCakeData.imageUrl = e.target.value;

              this.setState({ editCakeData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="comment">Comment</Label>
            <Input id="comment" value={this.state.editCakeData.comment} onChange={(e) => {
              let { editCakeData } = this.state;

              editCakeData.comment = e.target.value;

              this.setState({ editCakeData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="yumFactor">Yum Factor</Label>
            <Input id="yumFactor" value={this.state.editCakeData.yumFactor} onChange={(e) => {
              let { editCakeData } = this.state;

              editCakeData.yumFactor = e.target.value;

              this.setState({ editCakeData });
            }} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateCake.bind(this)}>Update Cake</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditCakeModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.viewCakeModal} toggle={this.toggleViewCakeModal.bind(this)}>
        <ModalHeader toggle={this.toggleViewCakeModal.bind(this)}>View a cake</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" readOnly value={this.state.editCakeData.name} />
          </FormGroup>
          <FormGroup>
            <Label for="imageUrl">ImageUrl</Label>
            <Input id="imageUrl" readOnly value={this.state.editCakeData.imageUrl} />
          </FormGroup>
          <FormGroup>
            <Label for="comment">Comment</Label>
            <Input id="comment" readOnly value={this.state.editCakeData.comment} />
          </FormGroup>
          <FormGroup>
            <Label for="yumFactor">Yum Factor</Label>
            <Input id="yumFactor" readOnly value={this.state.editCakeData.yumFactor} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleViewCakeModal.bind(this)}>Close</Button>
        </ModalFooter>
      </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>ImageUrl</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cakes}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
