import React from 'react'

const Filter = ({ showAll, setShowAll }) => {
    return (
        <div>
            filter shown with <input value={showAll} onChange={setShowAll}/>
        </div>
    )
}

export default Filter