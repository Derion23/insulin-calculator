import React, {useState, useRef, useEffect} from 'react'

import './css/style.css'
import FixedInformationSection from './Components/FixedInformationSection'
import ListSection from './Components/ListSection'
import Output from './Components/Output.js'
import useLocalStorage from './hooks/useLocalStorage.js'


const PREFIX = "insulin-calculator-"

export default function App( {hideLoadingScreen} ) {
    const [lastSavedData, setLastSavedData] = useLocalStorage('lastSavedData')
    const [foodNameSuggestions, setFoodNameSuggestions] = useLocalStorage('foodNameSuggestions', [])

    const [bloodSugar, setBloodSugar] = useState('')
    const [targetBloodSugar, setTargetBloodSugar] = useLocalStorage(`${getCurrentDayTime()}-targetBloodSugar`)
    const [correctionFactor, setCorrectionFactor] = useLocalStorage(`${getCurrentDayTime()}-correctionFactor`)
    const [carbohydrateFactor, setCarbohydrateFactor] = useLocalStorage(`${getCurrentDayTime()}-carbohydrateFactor`)

    const [foodItems, setFoodItems] = useState([])

    const [totalIE, setTotalIE] = useState('')
    const [totalKE, setTotalKE] = useState('')
    const [totalCorrectionInsulin, setTotalCorrectionInsulin] = useState('')
    const [totalIntermealKE, setTotalIntermealKE] = useState('')
    const [totalMainMealKE, setTotalMainMealKE] = useState('')

    const outputRef = useRef()

    useEffect(() => {
        addAllFoodItemsInLocalStorageToFoodNameSuggestions()
    }, [])

    function addAllFoodItemsInLocalStorageToFoodNameSuggestions(){
        const allFoodItemsInLocalStorage = getAllFoodItemsInLocalStorage()
        
        addNewFoodNameSuggestion(allFoodItemsInLocalStorage)
    }

    function getAllFoodItemsInLocalStorage(){
        const everyKey = Object.keys(localStorage)
        const allFoodItemKeysInLocalStorage = []
        
        for(const key of everyKey){
            const wordsInKey = key.split('-')
            if(wordsInKey.length < 3) continue

            const hasCorrectPrefix = `${PREFIX}foodItem` === `${wordsInKey[0]}-${wordsInKey[1]}-${wordsInKey[2]}`
            if(hasCorrectPrefix){
                const foodItemKey = capitalize(wordsInKey[3])
                allFoodItemKeysInLocalStorage.push(foodItemKey)
            }
        }

        return allFoodItemKeysInLocalStorage
    }

    function capitalize(string){
        if(typeof string !== 'string') return ''
        const capitalizedString = `${string[0].toUpperCase()}${string.slice(1)}`
        return capitalizedString
    }

    function addNewFoodNameSuggestion(toAddFoodNameSuggestions){
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
        handleChange(event)
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
        const newFoodItems = [...foodItems, {
            key:Math.random(),
            id:Math.random(),
            isIntermeal: false,
            shouldDisplaySuggestions: true
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

    function handleChange(event){
        const {name, value, id} = event.target

        if(value[value.length - 1] === '-') return

        const newFoodItems = foodItems.map(foodItem => {
            if(id == foodItem.id){

                // getting carbohydratesPer100Grams from name and setting the carbohydratesPer100Grams input
                if(name === 'name'){
                    const prefixedKey = `${PREFIX}foodItem-${value.toLowerCase()}-carbohydratesPer100Grams`
                    const jsonValue = localStorage.getItem(prefixedKey)
                    if(jsonValue != null){
                        const carbohydratesPer100Grams = JSON.parse(jsonValue)
                        
                        // foodNameSuggestion
                        const newFoodNameSuggestion = capitalize(value.toLowerCase())
                        addNewFoodNameSuggestion(newFoodNameSuggestion)

                        return {...foodItem, [name]:value, shouldDisplaySuggestions: false,
                            carbohydratesPer100Grams: carbohydratesPer100Grams}
                    }
                }
                    
                // saving carbohydratesPer100Grams with name as key
                if(name === 'carbohydratesPer100Grams' && foodItem.name !== '' && foodItem.name != null
                && foodItem.name[0] !== '.'){
                    const prefixedKeyFoodItem = `${PREFIX}foodItem-${foodItem.name.toLowerCase()}-carbohydratesPer100Grams`
                    const newFoodNameSuggestion = capitalize(foodItem.name.toLowerCase())
                    if(value !== '') {
                        // store foodItems carbohydratesPer100Grams
                        localStorage.setItem(prefixedKeyFoodItem, JSON.stringify(value))
                        // foodNameSuggestion
                        addNewFoodNameSuggestion(newFoodNameSuggestion)
                    } else {
                        localStorage.removeItem(prefixedKeyFoodItem)
                        // foodNameSuggestion
                        deleteFoodNameSuggestion(newFoodNameSuggestion)
                    }
                }
                const hasNameChanged = name === 'name'
                return {...foodItem, [name]:value, shouldDisplaySuggestions: hasNameChanged}
            } else
                return foodItem
        })
        setFoodItems(newFoodItems)
    }

    function handleIsIntermealChange(id){
        const newFoodItems = foodItems.map(foodItem => {
            if(id == foodItem.id)
                return {...foodItem, isIntermeal: !foodItem.isIntermeal}
            
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

    function calculateIE(){
        const ERROR_MESSAGE = 'ein oder mehrere Werte sind nicht gültig'

        function areItemsTypeofNumber(...items){
            for(const item of items)
                if(toNumberFormat(item) === -1) return false
            return true
        }

        function calculateKE(foodItem){
            if(!areItemsTypeofNumber(foodItem.grams, foodItem.carbohydratesPer100Grams)) {
                alert(ERROR_MESSAGE)
                return 0
            }

            return (toNumberFormat(foodItem.grams) * (toNumberFormat(foodItem.carbohydratesPer100Grams) / 100)) / 10
        }

        function calculateCorrectionInsuline(bloodSugar, targetBloodSugar, correctionFactor){
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
        const correctionInsulin = calculateCorrectionInsuline(bloodSugar, targetBloodSugar, correctionFactor)
        setTotalCorrectionInsulin(Math.round(correctionInsulin * 10) / 10)

        // total KE | totalIntermealKE
        let KE = 0, intermealKE = 0
        for(const foodItem of foodItems){
            KE += calculateKE(foodItem)
            intermealKE += foodItem.isIntermeal ? calculateKE(foodItem) : 0
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
        outputRef.current.scrollIntoView({smooth:true})
    }
    
    return (
        <div>
            <h1>Insulin Rechner</h1>

            <p>
                <button
                    className='load-data-button'
                    onClick = {loadData}
                >Daten laden</button>
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
                handleChange={handleChange}
                deleteFoodItem={deleteFoodItem}
                handleSuggestionClick={handleSuggestionClick}
            />

            <button
                className='save-data-button'
                onClick = {saveData}
            >Daten speichen</button>

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
