import React from 'react'
import Person from './Person'

const Content = ({ allPersons, personsToShow, deletePerson }) => {
    if(personsToShow.length === 0) {
        return (
            <div>
                {allPersons.map((person, i) => <Person key={i} person={person} deletePerson={deletePerson}/>)}
            </div>
        )
    }
    else {
        return (
            <div>
                {personsToShow.map((person, i) => <Person key={i} person={person} deletePerson={deletePerson}/>)}
            </div>
        )
    }
}

export default Content