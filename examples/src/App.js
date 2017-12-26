import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import "./App.css"

const AUTHOR_QUERY = gql`
    query AuthorInfo($firstName: String = "Jet") {
        leftPeople: author(firstName: $firstName, lastName: "Li") {
            id
            firstName
            lastName
            posts {
                id,
                title
            }
        }
    }
`
const withAuthor = graphql(AUTHOR_QUERY, {
    options: ({ firstName }) => ({
        variables: { firstName }
    }),
    props: ({ data }) => ({ ...data })
})

const authorData = ({ loading, leftPeople, error }) => {
    
    if(loading) return <div>Loading</div>;
    if(error) return <h1>Error</h1>;
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>Posts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan="2">{ leftPeople['id'] }</td>
                        <td rowSpan="2">{ leftPeople['firstName'] }</td>
                        <td rowSpan="2">{ leftPeople['lastName'] }</td>
                        <td>{ leftPeople['posts'][0]['title'] }</td>
                    </tr>
                    <tr>
                        <td>{ leftPeople['posts'][0]['title'] }</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const Author = withAuthor(authorData);
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "hahha"
        }
    }
    render() {
        return( 
            <div>
                <input type="number" onInput={(e)=>{
                    this.setState({
                        name: e.target.value
                    })
                }}/>
                <Author firstName={ this.state.name }/>
            </div>
        )
    }
}

export default App;