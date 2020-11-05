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