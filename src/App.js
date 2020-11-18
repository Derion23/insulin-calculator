import React, {useState, useRef, useEffect} from 'react'


import './css/style.css'
import FixedInformationSection from './Components/FixedInformationSection'
import ListSection from './Components/ListSection'
import Output from './Components/Output.js'

import useLocalStorage from './hooks/useLocalStorage.js'

const PREFIX = "insulin-calculator-"

let hasRerenderedSince60sec = false

export default function App() {
    const [lastSavedData, setLastSavedData] = useLocalStorage('lastSavedData', {foodItems:[]})
    const [foodNameSuggestions, setFoodNameSuggestions] = useLocalStorage('foodNameSuggestions', [])
    const [foodNameSuggestionsForPer100gSlide, setFoodNameSuggestionsForPer100gSlide] = 
        useLocalStorage('foodNameSuggestions-per100gSlide', [])

    const [foodNameSuggestionsForPerPieceSlide, setFoodNameSuggestionsForPerPieceSlide] = 
        useLocalStorage('foodNameSuggestions-perPieceSlide', [])

    const [bloodSugar, setBloodSugar] = useState('')
    const [targetBloodSugar, setTargetBloodSugar] = useLocalStorage(`${getCurrentDayTime()}-targetBloodSugar`)
    const [correctionFactor, setCorrectionFactor] = useLocalStorage(`${getCurrentDayTime()}-correctionFactor`)
    const [carbohydrateFactor, setCarbohydrateFactor] = useLocalStorage(`${getCurrentDayTime()}-carbohydrateFactor`)

    const [foodItems, setFoodItems] = useLocalStorage('foodItems', [])

    const [totalIE, setTotalIE] = useState('')
    const [totalKE, setTotalKE] = useState('')
    const [totalCorrectionInsulin, setTotalCorrectionInsulin] = useState('')
    const [totalIntermealKE, setTotalIntermealKE] = useState('')
    const [totalMainMealKE, setTotalMainMealKE] = useState('')

    const outputRef = useRef()

    useEffect(() => {
        /* setFoodItems( correctFoodItems(foodItems) )
        setLastSavedData( correctLastSavedData() ) */

        // not working has some old state of foodItems even if the state has changed
        /* setTimeout(() => 
            calculateIE(false, false)
        , 100) */

        localStorage.removeItem(`${PREFIX}foodNameSuggestions`)
        prefillFoodNameSuggestionsForPer100gSlide()
        
        addAllFoodItemsInLocalStorageToFoodNameSuggestionsForPerPieceSlide()

        // update every minute
        setInterval(() => {
            if(!hasRerenderedSince60sec)
                refreshPage()
            else
                hasRerenderedSince60sec = false
            
        }, 60000);
    }, [])

    function addAllFoodItemsInLocalStorageToFoodNameSuggestionsForPerPieceSlide(){
        const allFoodItemsInLocalStorage = getAllPerPieceFoodItemsInLocalStorage()

        addNewFoodNameSuggestionsToPerPieceSlide(allFoodItemsInLocalStorage)
    }
    
    function getAllPerPieceFoodItemsInLocalStorage(){
        const everyKey = Object.keys(localStorage)
        const allFoodItemKeysInLocalStorage = []
        
        for(const key of everyKey){
            const wordsInKey = key.split('-')
            if(wordsInKey.length < 4) continue
    
            const hasCorrectPrefix = `${PREFIX}foodItem` === `${wordsInKey[0]}-${wordsInKey[1]}-${wordsInKey[2]}` &&
                wordsInKey[4] === 'carbohydratesPerPiece'

            if(hasCorrectPrefix){
                const foodItemKey = capitalize(wordsInKey[3])
                allFoodItemKeysInLocalStorage.push(foodItemKey)
            }
        }
    
        return allFoodItemKeysInLocalStorage
    }

    function prefillFoodNameSuggestionsForPer100gSlide(){
        const prefixedKey = `${PREFIX}foodNameSuggestions`
        const jsonValue = localStorage.getItem(prefixedKey)

        if(jsonValue == null) return

        const value = JSON.parse(jsonValue)
        setFoodNameSuggestionsForPer100gSlide(value)
    }

    /* function correctFoodItems(foodItemsArg){
        const newFoodItems = foodItemsArg.map(foodItem => {
            if(foodItem.slide1 == null) return foodItem

            let {
                activeSlideIdx:isPer100gSlideActive,
                slide1:per100gSlide,
                slide2:perPieceSlide 
            } = foodItem
            
            delete foodItem.slide1
            delete foodItem.slide2
            delete foodItem.activeSlideIdx

            isPer100gSlideActive = isPer100gSlideActive === 1
            
            return {
                ...foodItem,
                isPer100gSlideActive: isPer100gSlideActive,
                per100gSlide: per100gSlide,
                perPieceSlide: perPieceSlide
            }
        })
        return newFoodItems
    }

    function correctLastSavedData(){
        const newLastSavedData = {foodItems: correctFoodItems(lastSavedData.foodItems)}
        return newLastSavedData
    } */


    function refreshPage(){
        window.location.reload();
    }

    function handleSlideChange(id, isPer100gSlideActive){
        const newFoodItems = foodItems.map(foodItem => {
            if(id == foodItem.id){
                return {...foodItem, isPer100gSlideActive:  isPer100gSlideActive}
            }
            
            return foodItem
        })
        setFoodItems(newFoodItems)   
    }

    function capitalize(string){
        if(typeof string !== 'string') return ''
        const capitalizedString = `${string[0].toUpperCase()}${string.slice(1)}`
        return capitalizedString
    }

    function addNewFoodNameSuggestionsToPer100gSlide(toAddFoodNameSuggestions){
        let newFoodNameSuggestions = toAddFoodNameSuggestions
        if(!Array.isArray(toAddFoodNameSuggestions)) newFoodNameSuggestions = [toAddFoodNameSuggestions]

        newFoodNameSuggestions = newFoodNameSuggestions.filter(NewFoodNameSuggestion => {
            const isAlreadyExisting = foodNameSuggestionsForPer100gSlide.some(foodNameSuggestion => 
                NewFoodNameSuggestion === foodNameSuggestion)
            return !isAlreadyExisting
        })
        if(newFoodNameSuggestions.length === 0) return

        newFoodNameSuggestions = [...foodNameSuggestionsForPer100gSlide, ...newFoodNameSuggestions]
        setFoodNameSuggestionsForPer100gSlide(newFoodNameSuggestions)
    }

    function deleteFoodNameSuggestionFromPer100gSlide(toDeleteFoodNameSuggestion){
        let removeIdx
        for(let idx = 0; idx < foodNameSuggestionsForPer100gSlide.length; idx++){
            if(toDeleteFoodNameSuggestion === foodNameSuggestionsForPer100gSlide[idx]){
                removeIdx = idx
                break
            }
        }
        if(removeIdx == null) return

        const newFoodNameSuggestions = [...foodNameSuggestionsForPer100gSlide]
        newFoodNameSuggestions.splice(removeIdx, 1)
        setFoodNameSuggestionsForPer100gSlide(newFoodNameSuggestions)
    }

    function addNewFoodNameSuggestionsToPerPieceSlide(toAddFoodNameSuggestions){
        let newFoodNameSuggestions = toAddFoodNameSuggestions
        if(!Array.isArray(toAddFoodNameSuggestions)) newFoodNameSuggestions = [toAddFoodNameSuggestions]

        newFoodNameSuggestions = newFoodNameSuggestions.filter(NewFoodNameSuggestion => {
            const isAlreadyExisting = foodNameSuggestionsForPerPieceSlide.some(foodNameSuggestion => 
                NewFoodNameSuggestion === foodNameSuggestion)
            return !isAlreadyExisting
        })
        if(newFoodNameSuggestions.length === 0) return

        newFoodNameSuggestions = [...foodNameSuggestionsForPerPieceSlide, ...newFoodNameSuggestions]
        setFoodNameSuggestionsForPerPieceSlide(newFoodNameSuggestions)
    }

    function deleteFoodNameSuggestionFromPerPieceSlide(toDeleteFoodNameSuggestion){
        let removeIdx
        for(let idx = 0; idx < foodNameSuggestionsForPerPieceSlide.length; idx++){
            if(toDeleteFoodNameSuggestion === foodNameSuggestionsForPerPieceSlide[idx]){
                removeIdx = idx
                break
            }
        }
        if(removeIdx == null) return

        const newFoodNameSuggestions = [...foodNameSuggestionsForPerPieceSlide]
        newFoodNameSuggestions.splice(removeIdx, 1)
        setFoodNameSuggestionsForPerPieceSlide(newFoodNameSuggestions)
    }

    function clearData(){
        setFoodItems([])
        setTotalIE(0)
    }
   
    function saveData(){
        const newData = {
            foodItems: foodItems
        }
        setLastSavedData(newData)
    }

    function loadData(){
        if(lastSavedData == null) return
        const {foodItems} = lastSavedData

        setFoodItems(foodItems)

        setTimeout(() => {
            calculateIE(false, false)
        }, 100)
    }

    function handleSuggestionClick(suggestionText, id, isPer100gSlideActive){
        const event = {target:{name:'name', value:suggestionText, id:id}}
        isPer100gSlideActive ? handlePer100gSlideValueChange(event) : handlePerPieceSlideValueChange(event)
    }

    function getCurrentDayTime(){
         const [hours, minutes] = new Date().toLocaleTimeString().split(':')
        const time =  toNumberFormat(hours) + (toNumberFormat(minutes) / 60)
        let dayTime = ''
        
        if(time <= 11.5){
            dayTime = 'morning'
        } else if(time <= 16){
            dayTime = 'midday'
        } else {
            dayTime = 'evening'
        }

        return dayTime
    }

    function addNewFoodItem(){
        const id = Math.random()
        const newFoodItems = [...foodItems, {
            key: Math.random(),
            id: id,
            isPer100gSlideActive: true,
            per100gSlide: {
                name: '',
                grams: '',
                carbohydratesPer100Grams: '',
                isIntermeal: false,
                shouldDisplaySuggestions: true
            },
            perPieceSlide: {
                name: '',
                numberOfPieces: '',
                carbohydratesPerPiece: '',
                isIntermeal: false,
                shouldDisplaySuggestions: true
            }
        }]
        setFoodItems(newFoodItems)
    }

    function deleteFoodItem(id){
        let removeIdx
        for(let idx = 0; idx < foodItems.length; idx++){
            if(id == foodItems[idx].id){
                removeIdx = idx
                break
            }
        }

        const newFoodItems = [...foodItems]
        newFoodItems.splice(removeIdx, 1)
        setFoodItems(newFoodItems)
    }

    function handlePer100gSlideValueChange(event){
        const {name, value, id} = event.target

        if(value[value.length - 1] === '-') return
        const newFoodItems = foodItems.map(foodItem => {
            // would not work with !==
            if(id != foodItem.id) return foodItem
        
            // getting the carbohydratesPer100Grams with the name from localStorage
            // if they exist set the carbohydratesPer100Grams input value
            if(name === 'name'){
                const prefixedKey = `${PREFIX}foodItem-${value.toLowerCase()}-carbohydratesPer100Grams`
                const jsonValue = localStorage.getItem(prefixedKey)
                if(jsonValue != null){
                    const carbohydratesPer100Grams = JSON.parse(jsonValue)

                    const per100gSlide = {...foodItem.per100gSlide, [name]:value, shouldDisplaySuggestions: false,
                        carbohydratesPer100Grams: carbohydratesPer100Grams}

                    return {...foodItem, per100gSlide:per100gSlide}
                }
            }
            
            // storing the carbohydratesPer100Grams with name as a key in localStorage
            // storing a new foodNameSuggestion in localStorage
            const isNameValid = foodItem.per100gSlide.name !== '' && foodItem.per100gSlide.name != null 
                                && foodItem.per100gSlide.name[0] !== '.'
            if(name === 'carbohydratesPer100Grams' && isNameValid){
                const prefixedKey = `${PREFIX}foodItem-${foodItem.per100gSlide.name.toLowerCase()}-carbohydratesPer100Grams`
                const newFoodNameSuggestion = capitalize(foodItem.per100gSlide.name.toLowerCase())
                if(value !== '') {
                    // store foodItems carbohydratesPer100Grams
                    localStorage.setItem(prefixedKey, JSON.stringify(value))
                    // foodNameSuggestion
                    addNewFoodNameSuggestionsToPer100gSlide(newFoodNameSuggestion)
                } else {
                    localStorage.removeItem(prefixedKey)
                    // foodNameSuggestion
                    deleteFoodNameSuggestionFromPer100gSlide(newFoodNameSuggestion)
                }
            }
            const hasNameChanged = name === 'name'
            const per100gSlide = {...foodItem.per100gSlide, [name]:value, shouldDisplaySuggestions: hasNameChanged}
            return {...foodItem, per100gSlide:per100gSlide}
        })
        setFoodItems(newFoodItems)
    }

    function handlePerPieceSlideValueChange(event){
        const {name, value, id} = event.target

        if(value[value.length - 1] === '-') return

        const newFoodItems = foodItems.map(foodItem => {
            // would not work with !==
            if(id != foodItem.id) return foodItem
        
            // getting the carbohydratesPerPiece with the name from localStorage
            // if they exist set the carbohydratesPerPiece input value
            if(name === 'name'){
                const prefixedKey = `${PREFIX}foodItem-${value.toLowerCase()}-carbohydratesPerPiece`
                const jsonValue = localStorage.getItem(prefixedKey)
                if(jsonValue != null){
                    const carbohydratesPerPiece = JSON.parse(jsonValue)

                    const perPieceSlide = {...foodItem.perPieceSlide, [name]:value, shouldDisplaySuggestions: false,
                        carbohydratesPerPiece: carbohydratesPerPiece}

                    return {...foodItem, perPieceSlide:perPieceSlide}
                }
            }
            
            // storing the carbohydratesPerPiece with name as a key in localStorage
            // storing a new foodNameSuggestion in localStorage
            const isNameValid = foodItem.perPieceSlide.name !== '' && foodItem.perPieceSlide.name != null 
                                && foodItem.perPieceSlide.name[0] !== '.'
            if(name === 'carbohydratesPerPiece' && isNameValid){
                const prefixedKey = `${PREFIX}foodItem-${foodItem.perPieceSlide.name.toLowerCase()}-carbohydratesPerPiece`
                const newFoodNameSuggestion = capitalize(foodItem.perPieceSlide.name.toLowerCase())
                if(value !== '') {
                    // store foodItems carbohydratesPerPiece
                    localStorage.setItem(prefixedKey, JSON.stringify(value))
                    // foodNameSuggestion
                    addNewFoodNameSuggestionsToPerPieceSlide(newFoodNameSuggestion)
                } else {
                    localStorage.removeItem(prefixedKey)
                    // foodNameSuggestion
                    deleteFoodNameSuggestionFromPerPieceSlide(newFoodNameSuggestion)
                }
            }
            const hasNameChanged = name === 'name'
            const perPieceSlide = {...foodItem.perPieceSlide, [name]:value, shouldDisplaySuggestions: hasNameChanged}
            return {...foodItem, perPieceSlide:perPieceSlide}
        })
        setFoodItems(newFoodItems)
    }

    function handleIsIntermealChange(id, activeSlideIdx){
        const newFoodItems = foodItems.map(foodItem => {
            if(id == foodItem.id){
                if(activeSlideIdx === 1){
                    const per100gSlide = {...foodItem.per100gSlide, isIntermeal: !foodItem.per100gSlide.isIntermeal}
                    return {...foodItem, per100gSlide:per100gSlide}
                } else {
                    const perPieceSlide = {...foodItem.perPieceSlide, isIntermeal: !foodItem.perPieceSlide.isIntermeal}
                    return {...foodItem, perPieceSlide:perPieceSlide}
                }
            }
                
            return foodItem
        })
        setFoodItems(newFoodItems)
    }

    function toNumberFormat(string){
        if(typeof string !== 'string') return -1

        let stringCopy = string.slice()
        stringCopy = stringCopy.replace(',', '.')
        const number = parseFloat(stringCopy)
        return Number.isNaN(number) ? -1 : number
    }

    function calculateIE(shouldScroll = true, shouldDisplayError = true){
        const ERROR_MESSAGE = 'ein oder mehrere Werte sind nicht gültig'

        function areItemsTypeofNumber(...items){
            /* for(const item of items)
                if(toNumberFormat(item) === -1) return false
            return true */
            return items.every(item => toNumberFormat(item) !== -1)
        }

        function calculateKE(foodItem){
            if(foodItem.isPer100gSlideActive){
                const grams = foodItem.per100gSlide.grams
                const carbohydratesPer100Grams = foodItem.per100gSlide.carbohydratesPer100Grams

                if(!areItemsTypeofNumber(grams, carbohydratesPer100Grams)) {
                    if(shouldDisplayError)
                        alert(ERROR_MESSAGE)
                    return 0
                }

                return (toNumberFormat(grams) * (toNumberFormat(carbohydratesPer100Grams) / 100)) / 10
            } else {
                const numberOfPieces = foodItem.perPieceSlide.numberOfPieces
                const carbohydratesPerPiece = foodItem.perPieceSlide.carbohydratesPerPiece
                
                if(!areItemsTypeofNumber(numberOfPieces, carbohydratesPerPiece)) {
                    if(shouldDisplayError)
                        alert(ERROR_MESSAGE)
                    return 0
                }

                return toNumberFormat(numberOfPieces) * toNumberFormat(carbohydratesPerPiece) / 10
            }
        }

        function calculateCorrectionInsulin(bloodSugar, targetBloodSugar, correctionFactor){
            if(!areItemsTypeofNumber(bloodSugar, targetBloodSugar, correctionFactor)){
                if(bloodSugar !== '' && shouldDisplayError)
                    alert(ERROR_MESSAGE)
                return 0
            }
            const correctionInsulin = (toNumberFormat(bloodSugar) - toNumberFormat(targetBloodSugar)) /
                toNumberFormat(correctionFactor)
            return correctionInsulin
        }

        // correction insulin
        const correctionInsulin = calculateCorrectionInsulin(bloodSugar, targetBloodSugar, correctionFactor)
        setTotalCorrectionInsulin(Math.round(correctionInsulin * 10) / 10)

        // total KE | totalIntermealKE
        let KE = 0, intermealKE = 0
        for(const foodItem of foodItems){
            const foodItemKE = calculateKE(foodItem)
            KE += foodItemKE
            if(foodItem.isPer100gSlideActive)
                intermealKE += foodItem.per100gSlide.isIntermeal ? foodItemKE : 0
            else
                intermealKE += foodItem.perPieceSlide.isIntermeal ? foodItemKE : 0
        }
        setTotalKE(Math.round(KE * 10) / 10)
        setTotalIntermealKE(Math.round(intermealKE * 10) / 10)
        setTotalMainMealKE(Math.round((KE - intermealKE) * 10) / 10)
        
        // total IE
        if(!areItemsTypeofNumber(carbohydrateFactor)) {
            if(shouldDisplayError)
                alert(ERROR_MESSAGE)
            return -1
        }

        let IE = KE * toNumberFormat(carbohydrateFactor)
        IE += correctionInsulin
        IE = Math.round(IE * 10) / 10

        setTotalIE(IE)

        // needed because of async state setting
        if(shouldScroll)
            setTimeout(() => {
                outputRef.current.scrollIntoView({smooth:true})
            }, 5)
    }
    
    return (
        <div>
            {hasRerenderedSince60sec = true}
            
            <h1>Insulin Rechner</h1>
            <p>
                <button
                    className='clear-data-button space-around'
                    onClick = {clearData}
                    >Daten löschen</button>

                <button
                    className='load-data-button'
                    onClick = {loadData}
                >Daten laden</button>
            </p>

            <hr className='destop-hr new-section-hr'/>

            <FixedInformationSection 
                setBloodSugar={setBloodSugar}
                setTargetBloodSugar={setTargetBloodSugar}
                setCorrectionFactor={setCorrectionFactor}
                setCarbohydrateFactor={setCarbohydrateFactor}
                bloodSugar={bloodSugar}
                targetBloodSugar={targetBloodSugar}
                correctionFactor={correctionFactor}
                carbohydrateFactor={carbohydrateFactor}
            />

            <hr className='destop-hr new-section-hr'/>

            <ListSection 
                foodItems={foodItems}
                foodNameSuggestionsForPer100gSlide={foodNameSuggestionsForPer100gSlide}
                foodNameSuggestionsForPerPieceSlide={foodNameSuggestionsForPerPieceSlide}
                addNewFoodItem={addNewFoodItem}
                handleIsIntermealChange={handleIsIntermealChange}
                handlePer100gSlideValueChange={handlePer100gSlideValueChange}
                handlePerPieceSlideValueChange={handlePerPieceSlideValueChange}
                deleteFoodItem={deleteFoodItem}
                handleSuggestionClick={handleSuggestionClick}
                handleSlideChange={handleSlideChange}
            />

            <p style={{marginBottom:'20px'}}>
                <button
                    className='save-data-button space-around'
                    onClick = {saveData}
                >Daten speichen</button>

                <button 
                    className='calculateIE-button'
                    onClick={calculateIE}
                >Berechne IE</button>
            </p>

            <Output 
                totalIE={totalIE}
                totalMainMealKE={totalMainMealKE}
                totalIntermealKE={totalIntermealKE}
                totalKE={totalKE}
                totalCorrectionInsulin={totalCorrectionInsulin}
                outputRef={outputRef}
            />
        </div>  
    )
}
