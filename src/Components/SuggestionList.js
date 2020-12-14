import React from 'react'

import Suggestion from './Suggestion.js'

export default function SuggestionList(
    {allSuggestions, searchingText, handleSuggestionClick, hideSuggestionList}) {
    
    const matchingSuggestions = searchingText === '' ? [] : allSuggestions.filter(suggestionText => {
        const potentialMatch = suggestionText.slice(0, searchingText.length)
        return potentialMatch.toLowerCase() === searchingText.toLowerCase()
    })
    
    return (
        <div>
            {matchingSuggestions.length !== 0 && <ul className='suggestion-list'>
            
                <button
                    className='hide-suggestion-list-button'
                    onClick={() => hideSuggestionList()}
                ></button>

                {matchingSuggestions.map(suggestionText => <Suggestion 
                    key={Math.random()} 
                    suggestionText={suggestionText} 
                    handleSuggestionClick={handleSuggestionClick}
                />)}
            </ul>}
        </div>
    )
}
