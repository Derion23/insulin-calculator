import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Pagination} from 'swiper'
import 'swiper/swiper-bundle.min.css'

import '../css/style.css'
import Input from './Input'
import SuggestionList from './SuggestionList.js'

SwiperCore.use([Pagination])

export default function FoodItem(
    {id, 
    isPer100gSlideActive=true,
    per100gSlide={},
    perPieceSlide={},

    foodNameSuggestions,
    handleIsIntermealChange, 
    handlePer100gSlideValueChange,
    handlePerPieceSlideValueChange,
    deleteFoodItem,
    handleSuggestionClick,
    handleSlideChange
    }) {

    const per100gSlideHtml = 
    <>
        <label className='intermeal-checkbox'>
                <input
                    type = 'checkbox'
                    checked = {per100gSlide.isIntermeal}
                    onChange = {() => handleIsIntermealChange(id, 1)}
                ></input> ZM?
        </label>

        <Input 
            id = {id}
            name = 'name'
            description = 'Name'
            value = {per100gSlide.name}
            onChange = {(event) => handlePer100gSlideValueChange(event)}
        />
        {per100gSlide.shouldDisplaySuggestions && <SuggestionList 
            allSuggestions={foodNameSuggestions}
            searchingText={per100gSlide.name}
            handleSuggestionClick={(suggestionText) => handleSuggestionClick(suggestionText, id)}
        />}

        <Input
            id = {id}
            name = 'grams'
            type='number'
            description = 'Gramm'
            value = {per100gSlide.grams}
            onChange = {(event) => handlePer100gSlideValueChange(event)}
        />
        <Input
            id = {id}
            name = 'carbohydratesPer100Grams'
            type='number'
            description = 'Kohlenhydrate pro 100g'
            value = {per100gSlide.carbohydratesPer100Grams}
            onChange = {(event) => handlePer100gSlideValueChange(event)}
        />
    </>

    const perPieceSlideHtml = 
    <>
         <label className='intermeal-checkbox'>
                <input
                    type = 'checkbox'
                    checked = {perPieceSlide.isIntermeal}
                    onChange = {() => handleIsIntermealChange(id, 2)}
                ></input> ZM?
        </label>

        <Input 
            id = {id}
            name = 'name'
            description = 'Name'
            value = {perPieceSlide.name}
            onChange = {(event) => handlePerPieceSlideValueChange(event)}
        />

        <Input 
            id = {id}
            name = 'numberOfPieces'
            type='number'
            description = 'Anzahl'
            value = {perPieceSlide.numberOfPieces}
            onChange = {(event) => handlePerPieceSlideValueChange(event)}
        />

        <Input 
            id = {id}
            name = 'carbohydratesPerPiece'
            type='number'
            description = 'Kohlenhydrate pro Stück'
            value = {perPieceSlide.carbohydratesPerPiece}
            onChange = {(event) => handlePerPieceSlideValueChange(event)}
        />
    </>

    const slides = [per100gSlideHtml, perPieceSlideHtml]

    return (
        <div>
            <p className='center-elements'>
                <button
                    className={`per-100g-button ${isPer100gSlideActive && 'active-button'}`}
                    onClick={() => handleSlideChange(id, true)}
                >pro 100g</button>
                
                <button
                    className={`per-piece-button ${!isPer100gSlideActive && 'active-button'}`}
                    onClick={() => handleSlideChange(id, false)}
                >pro Stück</button>
            </p>

            <div className='space-around'>
                <button
                    className = 'delete-food-item-button'
                    onClick={() => deleteFoodItem(id)}
                ></button>

                {isPer100gSlideActive ? per100gSlideHtml : perPieceSlideHtml}

                {/*  <Swiper 
                    id='main'
                    tag='section'
                    wrapperTag='ul'
                    pagination={{clickable:true}}
                    onSlideChange={(swiper) => handleSlideChange(id, swiper.activeIndex)}
                    >
                    {slides.map((slide, idx) => (
                        <SwiperSlide 
                            key={idx}
                            tag='li'
                            style= {{ listStyle: 'none' }}
                            >
                            {slide}
                        </SwiperSlide>
                    ))}
                    
                </Swiper> */}

            </div>
            <hr />
        </div>
    )
}
