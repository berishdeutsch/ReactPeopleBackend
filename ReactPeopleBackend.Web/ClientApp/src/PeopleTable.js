import React from 'react';
import axios from 'axios';
import { Button, Table } from 'reactstrap';
import AddPersonForm from './AddPersonForm';
import PersonRow from './PersonRow';


class PeopleTable extends React.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        people: [],
        deletePeople: []
    }
    componentDidMount() {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data });
        });
    }


    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onAddClick = () => {
        axios.post('/api/people/addperson', this.state.person).then(() => {
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    },
                    isEditing: false
                });
            });
        });
    }

    onDeleteClick = p => {
        axios.post('/api/people/deleteperson', p).then(() => {
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    }
                })
            })
        })
    }

    onEditClick = p => {
        this.setState({ person: p, isEditing: true })
    }

    onCancelClick = () => {
        this.setState({
            isEditing: false,
            person: {
                firstName: '',
                lastName: '',
                age: ''
            }
        })
    }

    checkAll = () => {
        this.setState({ deletePeople: this.state.people.map(p => p.id) });
    }
    uncheckAll = () => {
        this.setState({ deletePeople: [] });
    }

    onSetToDeleteChange = id => {
        const { deletePeople } = this.state;
        let newDeletePeople;
        if (deletePeople.includes(id)) {
            newDeletePeople = deletePeople.filter(i => i !== id);
        } else {
            newDeletePeople = [...deletePeople, id];
        }
        this.setState({ deletePeople: newDeletePeople });
    }

    onUpdateClick = p => {
        axios.post('/api/people/updateperson', p).then(() => {
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    },
                    isEditing: false
                })
            })
        })
    }

    deleteSelected = () => {
        axios.post('/api/people/deletemany', this.state.deletePeople).then(() => {
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    },
                    isEditing: false
                })
            })
        })
    }

    render() {
        const { people, person, isEditing, deletePeople } = this.state;
        const { firstName, lastName, age } = this.state.person;
        return (
            <div className='container mt-5'>
                <AddPersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isEditing={isEditing}
                    onUpdateClick={() => this.onUpdateClick(person)}
                    onCancelClick={this.onCancelClick}
                />

                <Table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <th>
                                <Button className='btn btn-danger btn-block' onClick={this.deleteSelected}>Delete Selected</Button>
                                <Button className='btn btn-info btn-block' onClick={this.checkAll}>Check All</Button>
                                <Button className='btn btn-info btn-block' onClick={this.uncheckAll}>Uncheck All</Button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => <PersonRow
                            person={p}
                            key={p.id}
                            onDeleteClick={() => this.onDeleteClick(p)}
                            onEditClick={() => this.onEditClick(p)}
                            isSetToDelete={deletePeople.includes(p.id)}
                            onSetToDeleteChange={() => this.onSetToDeleteChange(p.id)}
                        />)}
                    </tbody>
                </Table>

            </div>
        )
    }
}

export default PeopleTable;