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
    activeSlideIdx,
    slide1,
    slide2,

    foodNameSuggestions,
    handleIsIntermealChange, 
    handleSlide1ValueChange,
    handleSlide2ValueChange,
    deleteFoodItem,
    handleSuggestionClick,
    handleSlideChange
    }) {

    const slide1Html = 
    <>
        <label className='intermeal-checkbox'>
                <input
                    type = 'checkbox'
                    checked = {slide1.isIntermeal}
                    onChange = {() => handleIsIntermealChange(id, 1)}
                ></input> ZM?
        </label>

        <Input 
            id = {id}
            name = 'name'
            description = 'Name'
            value = {slide1.name}
            onChange = {(event) => handleSlide1ValueChange(event)}
        />
        {slide1.shouldDisplaySuggestions && <SuggestionList 
            allSuggestions={foodNameSuggestions}
            searchingText={slide1.name}
            handleSuggestionClick={(suggestionText) => handleSuggestionClick(suggestionText, id)}
        />}

        <Input
            id = {id}
            name = 'grams'
            description = 'Gramm'
            value = {slide1.grams}
            onChange = {(event) => handleSlide1ValueChange(event)}
        />
        <Input
            id = {id}
            name = 'carbohydratesPer100Grams'
            description = 'Kohlenhydrate pro 100g'
            value = {slide1.carbohydratesPer100Grams}
            onChange = {(event) => handleSlide1ValueChange(event)}
        />
    </>

    const slide2Html = 
    <>
         <label className='intermeal-checkbox'>
                <input
                    type = 'checkbox'
                    checked = {slide2.isIntermeal}
                    onChange = {() => handleIsIntermealChange(id, 2)}
                ></input> ZM?
        </label>

        <Input 
            id = {id}
            name = 'name'
            description = 'Name'
            value = {slide2.name}
            onChange = {(event) => handleSlide2ValueChange(event)}
        />

        <Input 
            id = {id}
            name = 'numberOfPieces'
            description = 'Anzahl'
            value = {slide2.numberOfPieces}
            onChange = {(event) => handleSlide2ValueChange(event)}
        />

        <Input 
            id = {id}
            name = 'carbohydratesPerPiece'
            description = 'Kohlenhydrate pro Stück'
            value = {slide2.carbohydratesPerPiece}
            onChange = {(event) => handleSlide2ValueChange(event)}
        />
    </>

    const slides = [slide1Html, slide2Html]

    return (
        <div>
            <button
                className = 'delete-food-item-button'
                onClick={() => deleteFoodItem(id)}
            ></button>

            {slide1Html}
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

            <hr />
        </div>
    )
}
