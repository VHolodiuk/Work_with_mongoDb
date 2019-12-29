import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import {personsFetchData, personsPushData, personsUpdateData, personsDeleteData} from "../actions/persons";
import PopUp from "../components/PopUp";

class App extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPopUp = this.showPopUp.bind(this);
        this.closePopUp = this.closePopUp.bind(this);
        this.handlePopUpChange = this.handlePopUpChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.deletePerson = this.deletePerson.bind(this);
        this.state = {
            data: {
                name: "",
                password: ""
            },
            updatedData: {},
            displayStyle: "",
            currentId: ""
        };
    }

    componentDidMount() {
        this.props.fetchData("/api/users");
    }

    componentDidUpdate(prevProps) {
        if(this.props.wasUpdated !== prevProps.wasUpdated) {
            this.props.fetchData("/api/users")
        }
    }

    handleChange(e){
        let {...data} = this.state.data;
        data[e.target.id] = e.target.value;
        this.setState({
            data
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.pushData("/api/users", this.state.data);
        this.setState({
            data: {
                name: "",
                password: ""
            }
        })
    }

    showPopUp(e) {
        this.setState({
            displayStyle: "d-block",
            currentId: e.target.value
        })
    }

    closePopUp() {
        this.setState({
            displayStyle: ""
        })
    }

    handlePopUpChange(e){
        let {...updatedData} = this.state.updatedData;
        updatedData[e.target.id] = e.target.value;
        this.setState({
            updatedData
        });
    }

    handleUpdate(e){
        e.preventDefault();
        this.props.updateData(`/api/users/${this.state.currentId}`, this.state.updatedData);
        this.setState({
            updatedData: {},
            displayStyle: ""
        })
    }

    async deletePerson(e) {
        this.setState({
            currentId: e.target.value
        }, ()=>{
            this.props.deleteData(`/api/users/${this.state.currentId}`)
        });

    }

    render() {

        if (this.props.hasErrored) {
            return <p> Извините, произошла ошибка </p>
        }
        if (this.props.isLoading) {
            return <p> Загрузка... </p>
        }
        return (
            <div className="wrapper">
                <PopUp
                    visibility={this.state.displayStyle}
                    closePopUp={this.closePopUp}
                    handlePopUpChange={this.handlePopUpChange}
                    updatedData={this.state.updatedData}
                    update={this.handleUpdate}
                />
                <ul>
                    {this.props.persons.map((person, index) => {
                        return <li key={index}>
                            <div>Name is: {person.name}</div>
                            <div>Password is: {person.password}</div>
                            <div>ID is: {person._id}</div>
                            <button className="edit-btn" value={person._id} onClick={this.showPopUp}>Edit</button>
                            <button className="edit-btn" value={person._id} onClick={this.deletePerson}>Delete</button>
                        </li>
                    })}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Введите имя</label>
                    <input
                        id="name"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.data.name}/>
                    <label htmlFor="password">Введите пароль</label>
                    <input
                        id="password"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.data.password}/>
                    <button type="submit">Добавить</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons,
        hasErrored: state.personsHasErrored,
        isLoading: state.personsIsLoading,
        wasUpdated: state.personsUpdated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: url => dispatch(personsFetchData(url)),
        pushData: (url, data) => dispatch(personsPushData(url, data)),
        updateData: (url, data) => dispatch(personsUpdateData(url, data)),
        deleteData: url => dispatch(personsDeleteData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
