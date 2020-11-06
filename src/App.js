import React, {useState, useRef, useEffect} from 'react'


import './css/style.css'
import FixedInformationSection from './Components/FixedInformationSection'
import ListSection from './Components/ListSection'
import Output from './Components/Output.js'
import useLocalStorage from './hooks/useLocalStorage.js'


const PREFIX = "insulin-calculator-"

export default function App() {
    const [lastSavedData, setLastSavedData] = useLocalStorage('lastSavedData')
    const [foodNameSuggestions, setFoodNameSuggestions] = useLocalStorage('foodNameSuggestions', [])

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
        // temporary
        localStorage.removeItem('insulin-calculator-lastSavedData')

        calculateIE(false)
    }, [])
    

    function handleSlideChange(id, activeSlideIdx){
        const newFoodItems = foodItems.map(foodItem => {
            if(id == foodItem.id){
                const slide1 = {...foodItem.slide1}
                const slide2 = {...foodItem.slide2}
                return {...foodItem, slide1:slide1, slide2:slide2, activeSlideIdx: activeSlideIdx + 1}
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

    function addNewFoodNameSuggestions(toAddFoodNameSuggestions){
        let newFoodNameSuggestions = toAddFoodNameSuggestions

        if(!Array.isArray(toAddFoodNameSuggestions)) newFoodNameSuggestions = [toAddFoodNameSuggestions]

        newFoodNameSuggestions = newFoodNameSuggestions.filter(NewFoodNameSuggestion => {
            const isAlreadyExisting = foodNameSuggestions.some(foodNameSuggestion => 
                NewFoodNameSuggestion === foodNameSuggestion)
            return !isAlreadyExisting
        })
        if(newFoodNameSuggestions.length === 0) return

        newFoodNameSuggestions = [...foodNameSuggestions, ...newFoodNameSuggestions]
        setFoodNameSuggestions(newFoodNameSuggestions)
    }

    function deleteFoodNameSuggestion(toDeleteFoodNameSuggestion){
        let removeIdx
        for(let idx = 0; idx < foodNameSuggestions.length; idx++){
            if(toDeleteFoodNameSuggestion === foodNameSuggestions[idx]){
                removeIdx = idx
                break
            }
        }
        if(removeIdx == null) return

        const newFoodNameSuggestions = [...foodNameSuggestions]
        newFoodNameSuggestions.splice(removeIdx, 1)
        setFoodNameSuggestions(newFoodNameSuggestions)
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

        // not working because of async state setting
        calculateIE()
    }

    function handleSuggestionClick(suggestionText, id){
        const event = {target:{name:'name', value:suggestionText, id:id}}
        handleSlide1ValueChange(event)
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
            activeSlideIdx: 1,
            slide1: {
                name: '',
                grams: '',
                carbohydratesPer100Grams: '',
                isIntermeal: false,
                shouldDisplaySuggestions: true
            },
            slide2: {
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

    function handleSlide1ValueChange(event){
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

                    const slide1 = {...foodItem.slide1, [name]:value, shouldDisplaySuggestions: false,
                        carbohydratesPer100Grams: carbohydratesPer100Grams}

                    return {...foodItem, slide1:slide1}
                }
            }
            
            // storing the carbohydratesPer100Grams with name as a key in localStorage
            // storing a new foodNameSuggestion in localStorage
            const isNameValid = foodItem.slide1.name !== '' && foodItem.slide1.name != null 
                                && foodItem.slide1.name[0] !== '.'
            if(name === 'carbohydratesPer100Grams' && isNameValid){
                const prefixedKey = `${PREFIX}foodItem-${foodItem.slide1.name.toLowerCase()}-carbohydratesPer100Grams`
                const newFoodNameSuggestion = capitalize(foodItem.slide1.name.toLowerCase())
                if(value !== '') {
                    // store foodItems carbohydratesPer100Grams
                    localStorage.setItem(prefixedKey, JSON.stringify(value))
                    // foodNameSuggestion
                    addNewFoodNameSuggestions(newFoodNameSuggestion)
                } else {
                    localStorage.removeItem(prefixedKey)
                    // foodNameSuggestion
                    deleteFoodNameSuggestion(newFoodNameSuggestion)
                }
            }
            const hasNameChanged = name === 'name'
            const slide1 = {...foodItem.slide1, [name]:value, shouldDisplaySuggestions: hasNameChanged}
            return {...foodItem, slide1:slide1}
        })
        setFoodItems(newFoodItems)
    }

    function handleSlide2ValueChange(event){
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

                    const slide2 = {...foodItem.slide2, [name]:value, shouldDisplaySuggestions: false,
                        carbohydratesPerPiece: carbohydratesPerPiece}

                    return {...foodItem, slide2:slide2}
                }
            }
            
            // storing the carbohydratesPerPiece with name as a key in localStorage
            // storing a new foodNameSuggestion in localStorage
            const isNameValid = foodItem.slide2.name !== '' && foodItem.slide2.name != null 
                                && foodItem.slide2.name[0] !== '.'
            if(name === 'carbohydratesPerPiece' && isNameValid){
                const prefixedKey = `${PREFIX}foodItem-${foodItem.slide2.name.toLowerCase()}-carbohydratesPerPiece`
                const newFoodNameSuggestion = capitalize(foodItem.slide2.name.toLowerCase())
                if(value !== '') {
                    // store foodItems carbohydratesPerPiece
                    localStorage.setItem(prefixedKey, JSON.stringify(value))
                    // foodNameSuggestion
                        //addNewFoodNameSuggestions(newFoodNameSuggestion)
                } else {
                    localStorage.removeItem(prefixedKey)
                    // foodNameSuggestion
                        //deleteFoodNameSuggestion(newFoodNameSuggestion)
                }
            }
            const hasNameChanged = name === 'name'
            const slide2 = {...foodItem.slide2, [name]:value, shouldDisplaySuggestions: hasNameChanged}
            return {...foodItem, slide2:slide2}
        })
        setFoodItems(newFoodItems)
    }

    function handleIsIntermealChange(id, activeSlideIdx){
        const newFoodItems = foodItems.map(foodItem => {
            if(id == foodItem.id){
                if(activeSlideIdx === 1){
                    const slide1 = {...foodItem.slide1, isIntermeal: !foodItem.slide1.isIntermeal}
                    return {...foodItem, slide1:slide1}
                } else {
                    const slide2 = {...foodItem.slide2, isIntermeal: !foodItem.slide2.isIntermeal}
                    return {...foodItem, slide2:slide2}
                }
            }
                
            return foodItem
        })
        setFoodItems(newFoodItems)
    }

    function toNumberFormat(string){
        let stringCopy = string.slice()
        stringCopy = stringCopy.replace(',', '.')
        const number = parseFloat(stringCopy)
        return Number.isNaN(number) ? -1 : number
    }

    function calculateIE(shouldScroll = true){
        const ERROR_MESSAGE = 'ein oder mehrere Werte sind nicht gültig'

        function areItemsTypeofNumber(...items){
            /* for(const item of items)
                if(toNumberFormat(item) === -1) return false
            return true */
            return items.every(item => toNumberFormat(item) !== -1)
        }

        function calculateKE(foodItem){
            const grams = foodItem.slide1.grams
            const carbohydratesPer100Grams = foodItem.slide1.carbohydratesPer100Grams

            if(!areItemsTypeofNumber(grams, carbohydratesPer100Grams)) {
                alert(ERROR_MESSAGE)
                return 0
            }

            return (toNumberFormat(grams) * (toNumberFormat(carbohydratesPer100Grams) / 100)) / 10
        }

        function calculateCorrectionInsulin(bloodSugar, targetBloodSugar, correctionFactor){
            if(!areItemsTypeofNumber(bloodSugar, targetBloodSugar, correctionFactor)){
                if(bloodSugar !== '')
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
            intermealKE += foodItem.slide1.isIntermeal ? foodItemKE : 0
        }
        setTotalKE(Math.round(KE * 10) / 10)
        setTotalIntermealKE(Math.round(intermealKE * 10) / 10)
        setTotalMainMealKE(Math.round((KE - intermealKE) * 10) / 10)
        
        // total IE
        if(!areItemsTypeofNumber(carbohydrateFactor)) {
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
            <h1>Insulin Rechner</h1>
            <p>
                {/* <button
                    className='load-data-button'
                    onClick = {loadData}
                >Daten laden</button> */}
                <button
                    className='clear-data-button'
                    onClick = {clearData}
                >Daten löschen</button>
            </p>

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

            <ListSection 
                foodItems={foodItems}
                foodNameSuggestions={foodNameSuggestions}
                addNewFoodItem={addNewFoodItem}
                handleIsIntermealChange={handleIsIntermealChange}
                handleSlide1ValueChange={handleSlide1ValueChange}
                handleSlide2ValueChange={handleSlide2ValueChange}
                deleteFoodItem={deleteFoodItem}
                handleSuggestionClick={handleSuggestionClick}
                handleSlideChange={handleSlideChange}
            />

            {/* <button
                className='save-data-button'
                onClick = {saveData}
            >Daten speichen</button> */}

            <button 
                className='calculateIE-button'
                onClick={calculateIE}
            >Berechne IE</button>
            
            
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
