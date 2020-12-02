/* function addAllFoodItemsInLocalStorageToFoodNameSuggestions(){
    const allFoodItemsInLocalStorage = getAllFoodItemsInLocalStorage()
    
    addNewFoodNameSuggestions(allFoodItemsInLocalStorage)
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
} */



/* function addAllFoodItemsInLocalStorageToFoodNameSuggestionsForPer100gSlide(){
    const allFoodItemsInLocalStorage = getAllFoodItemsInLocalStorage(true)

    addNewFoodNameSuggestionsToPer100gSlide(allFoodItemsInLocalStorage)
}

function addAllFoodItemsInLocalStorageToFoodNameSuggestionsForPerPieceSlide(){
    const allFoodItemsInLocalStorage = getAllFoodItemsInLocalStorage(false)

    addNewFoodNameSuggestionsToPerPieceSlide(allFoodItemsInLocalStorage)
}

function getAllFoodItemsInLocalStorage(isPer100gSlide=true){
    const everyKey = Object.keys(localStorage)
    const allFoodItemKeysInLocalStorage = []
    
    for(const key of everyKey){
        const wordsInKey = key.split('-')
        if(wordsInKey.length < 4) continue

        const hasCorrectPrefix = `${PREFIX}foodItem` === `${wordsInKey[0]}-${wordsInKey[1]}-${wordsInKey[2]}` &&
            (isPer100gSlide ? 
                wordsInKey[4] === 'carbohydratesPer100Grams' : wordsInKey[4] === 'carbohydratesPerPiece')

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

function correctFoodItems(foodItemsArg){
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

