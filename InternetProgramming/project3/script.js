
function performStatistics() {
    let textArea = document.getElementById('textarea').value;
    let stringArray = textArea.split(' ');
    let numbersArray = stringArray.map(Number);

    document.getElementById('max').value = findMax(numbersArray);
    document.getElementById('mean').value = calcMean(numbersArray);
    document.getElementById('median').value = calcMedian(numbersArray);
    document.getElementById('min').value = findMin(numbersArray);
    document.getElementById('mode').value = calcMode(numbersArray);
    document.getElementById('std').value = calcStdDev(numbersArray);
    document.getElementById('sum').value = calcSum(numbersArray);
    document.getElementById('var').value = calcVariance(numbersArray);

    return false;
}

function findMax(array) {
    return Math.max(...array).toFixed(2);
}

function calcMean(array) {
    let arrayLength = array.length;
    let sum = calcSum(array);
    let mean = (sum/arrayLength);
    return mean.toFixed(2);
}

function calcMedian(array) {
    array.sort(function(a, b){return a - b;});
    let arrayLength = array.length;
    

    if(arrayLength % 2 === 0) {
        let middleOfArray = (arrayLength + 1) / 2;
        let firstNum = array[Math.floor(middleOfArray - 1)];
        let secNum = array[Math.ceil(middleOfArray - 1)];
        let median = (firstNum + secNum) / 2;
        return median.toFixed(2);
    }
    else {
        let middleOfArray = Math.floor((arrayLength) / 2);
        return array[middleOfArray].toFixed(2);
    }
}

function findMin(array) {
    return Math.min(...array).toFixed(2);
}

function calcMode(array) {
    function countObj (element, count){
        this.element = element;
        this.count = count;
    }
    function find(numToCompare) {
      
        return tempArray.some(obj => {
            if(numToCompare === obj.element){
                return true;
            } else {
                return false;
            }
        })
    }
    let arrayLength = array.length;
    let tempArray = [];
    for(let i = 0; i < arrayLength; i++) {
        let numToCompare = array[i];
        if(!find(numToCompare)) {
            tempArray.push(new countObj(numToCompare, 0));
            for(let j = 0; j < arrayLength; j++) {
                if(numToCompare === array[j]) {
                    tempArray[tempArray.length - 1].count += 1;
                }
            }  
        } 
    }
    tempArray.sort(function(a, b){return a.count - b.count;});
    let topcount = tempArray[tempArray.length - 1].count;
    let modeArray = [];
    for(let k = 0; k < tempArray.length; k++) {
        if(tempArray[k].count === topcount) {
            modeArray.push(tempArray[k].element);
        }
    }
    return modeArray.join(' ');
}

function calcStdDev(array) {
    let variance =  calcVariance(array);
    return Math.sqrt(variance).toFixed(2);
}

function calcSum(array) {
    let arrayLength = array.length;
    let sum = 0;
    for(let i = 0; i < arrayLength; i++){
        sum += array[i];
    }
    return sum.toFixed(2);
}

function calcVariance(array) {
    let mean = calcMean(array);
    let arrayLength = array.length;
    let tempArray = [];
    
    for(let i = 0; i < arrayLength; i++){
        let d = array[i] - mean;
        let squared = Math.pow(d, 2);
        tempArray.push(squared);  
    }
    let variance = calcSum(tempArray) / arrayLength;
    return variance.toFixed(2);

}
