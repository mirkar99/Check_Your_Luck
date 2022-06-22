const form = [...document.querySelectorAll('.form')]; 

const siteInputs = [...document.querySelectorAll('.form__input--site')]; //all 'site' input in array
const userInputs= [...document.querySelectorAll('.form__input--user')]; //all 'user' input in array

const checkButton = document.querySelector('.form__button--check'); //'check' button
const cleanButton = document.querySelector('.form__button--clean'); //'clean' button
const randomButton= document.querySelector('.form__button--random'); //'random' button

const formText=document.querySelector('.form__text');

const checkUserInputs=function(){
    let userInputsValues=userInputs.map(el=> el.value);
    for(el of userInputsValues){
        if(el<0||el>48){
            return 'Out Of Rage';
        }
        if(el===""){
            return 'Empty';
        }
    }
    if(new Set(userInputsValues).size !== userInputs.length){
        return 'Duplicats';
    }
}
const searchError=function(htmlElement,callback){
    let callbackStatus=callback();
    if(callbackStatus){
        htmlElement.innerHTML=`Error: ${callbackStatus}`;
    }else{
        return true;
    }
}
const giveRandomsValues=function(arr){
    let status;
    do{
    status = false;
        for(el of arr){
            el.value = Math.floor(Math.random() * (48 - 1 + 1)) + 1;
        }
        let randomValues=arr.map(el=> el.value);
        if(new Set(randomValues).size !== arr.length){
            status = true;
        }
    }while(status);
}
const showInputs=function(arr){
    for(el of arr){
        el.classList.remove('hidden');
    }
}
const hideInputs=function(arr){
    for(el of arr){
        el.classList.add('hidden');
    }
}
const removeInputsClass=function(arr){
    for(el of arr){
        el.classList.remove('good');
        el.classList.remove('wrong');
    }
}
const compareValues=function(arrSite,arrUsers){
    let guessNumber=0;
    for(firstArray of arrSite){
        for(secoundArray of arrUsers){
            if(firstArray.value == secoundArray.value){
                secoundArray.classList.add('good');
                secoundArray.classList.remove('wrong');
                guessNumber++;
            }else if(secoundArray.classList.contains('good')){
                secoundArray.classList.remove('wrong');
            }else{
                secoundArray.classList.add('wrong');
            }
        }
    }
    if(guessNumber===1){
        formText.innerHTML=`you guess ${guessNumber} number`;
    }else if(guessNumber>1){
        formText.innerHTML=`you guess ${guessNumber} numbers`;
    }else{
        formText.innerHTML=`you guess nothing`;
    }
}
const cleanInputs=function(arrSite,arrUsers){
    for(el of arrSite){
        el.value='';
    }
    for(el of arrUsers){
        el.value='';
    }
}
const removeText=function(htmlElement){
    htmlElement.innerHTML='';
}

checkButton.addEventListener('click',function(){
    if(searchError(formText,checkUserInputs)){
        removeInputsClass(userInputs);    
        giveRandomsValues(siteInputs);    
        compareValues(siteInputs,userInputs);    
        showInputs(siteInputs);
    }
},false);
cleanButton.addEventListener('click',function(){
        removeInputsClass(userInputs);    
        removeText(formText);    
        hideInputs(siteInputs);   
        cleanInputs(siteInputs,userInputs);
},false);
randomButton.addEventListener('click',function(){
        removeInputsClass(userInputs);    
        removeText(formText);  
        hideInputs(siteInputs);  
        giveRandomsValues(userInputs);
},false);

form[1].addEventListener('change',function(child){
    child.target.classList.remove('wrong');
    child.target.classList.remove('good');
},false);
form[1].addEventListener('keydown',function(child){
    child.target.classList.remove('wrong');
    child.target.classList.remove('good');
},false);

