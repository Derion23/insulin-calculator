import React from 'react'

export default function Suggestion({suggestionText, handleSuggestionClick}) {
    return (
        <li
            onClick={() => handleSuggestionClick(suggestionText)}
        >
            {suggestionText}
        </li>
    )
}
