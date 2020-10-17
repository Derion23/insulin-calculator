import React, {useState} from 'react'

import './css/style.css'
import FixedInformationSection from './Components/FixedInformationSection'
import ListSection from './Components/ListSection'
import Output from './Components/Output.js'
import useLocalStorage from './hooks/useLocalStorage.js'
import FoodItem from './Components/FoodItem'

export default function App() {
    const [bloodSugar, setBloodSugar] = useState('')
    const [targetBloodSugar, setTargetBloodSugar] = useLocalStorage('targetBloodSugar')
    const [correctionFactor, setCorrectionFactor] = useLocalStorage('correctionFactor')
    const [carbohydrateFactor, setCarbohydrateFactor] = useLocalStorage('carbohydrateFactor')

    const [foodItems, setFoodItems] = useState([])
    const [totalIE, setTotalIE] = useState('')

    function addNewFoodItem(){
        const newFoodItems = [...foodItems, {
            key:Math.random(),
            id:Math.random(),
            name:'',
            grams:'',
            carbohydratesPer100Grams:''
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
        const newFoodItems = foodItems.map(foodItem => {
            if(id == foodItem.id){
                return {...foodItem, [name]:value}
            }
            return foodItem
        })
        setFoodItems(newFoodItems)
    }

    function calculateIE(){
        const ERROR_MESSAGE = 'ein oder mehrere Werte sind nicht gültig'

        function toNumberFormat(string){
            let stringCopy = string.slice()
            stringCopy = stringCopy.replace(',', '.')
            const number = parseFloat(stringCopy)
            return Number.isNaN(number) ? -1 : number
        }

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

        const correctionInsulin = calculateCorrectionInsuline(bloodSugar, targetBloodSugar, correctionFactor)
        let totalKE = 0
        for(const foodItem of foodItems)
            totalKE += calculateKE(foodItem)
        
        if(!areItemsTypeofNumber(carbohydrateFactor)) {
            alert(ERROR_MESSAGE)
            return -1
        }

        let IE = totalKE * toNumberFormat(carbohydrateFactor)
        IE += correctionInsulin
        IE = Math.round(IE * 10) / 10

        setTotalIE(IE)
        window.scrollTo(0, 0)   
    }
    
    return (
        <div>
            <h1>Insulin Rechner</h1>

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
                addNewFoodItem={addNewFoodItem}
                handleChange={handleChange}
                deleteFoodItem={deleteFoodItem}
            />
            {/* <button>berechne KE</button> */}
            <button 
                className='calculateIE-button'
                onClick={calculateIE}
            >berechne IE</button>
            
            <Output totalIE={totalIE}/>
        </div>  
    )
}
