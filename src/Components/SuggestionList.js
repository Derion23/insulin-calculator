import React from 'react'

import Suggestion from './Suggestion.js'

export default function SuggestionList({allSuggestions, searchingText, handleSuggestionClick}) {
    return (
        <div>
            {searchingText !== '' && <ul>
                {allSuggestions.filter(suggestionText => {
                    const potentialMatch = suggestionText.slice(0, searchingText.length)
                    return potentialMatch === searchingText.toLowerCase()
                }).map(suggestionText => <Suggestion 
                    key={Math.random()} 
                    suggestionText={suggestionText} 
                    handleSuggestionClick={handleSuggestionClick}
                />)}
            </ul>}
        </div>
    )
}
