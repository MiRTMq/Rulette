document.addEventListener("DOMContentLoaded", function () {
	let button = document.getElementById('butt');
    let name = document.getElementById('name');
    let countField = document.getElementById("count");
    let imgs = document.querySelectorAll('img');
    let randomKey = 0;
    let step = 3;
    let w = 3;
    let h = 3;

    let fruitsPath = {
        apple: 'img/apple.png',
        pear: 'img/pear.png',
        cherry: 'img/cherry.png',
        watermelon: 'img/watermelon.png',
        lemon: 'img/lemon.png',
        appricot: 'img/appricot.png',
        banana: 'img/banana.png',
    }

    generate();
    let tryCount = 0;
    let winFlag = false;
             
    button.addEventListener("click", function(){
       
         
        if (name.value == '') 
        {
            alert("Введіть ім'я")
            
        }
        else{
            tryCount++;countField.innerText = ("спроба "+ tryCount + " з 3");
            button.style.display="none";
            const timeoutId =setInterval(generate, 50);
            
            setTimeout(function(){
                clearInterval(timeoutId);button.style.display="block";

                checkWin();
                if (winFlag) {
                   alert(name.value+", ви виграли!!!!");
                  winFlag = false;
                    tryCount = 0;
                 }else if(tryCount>=3)
            {
                window.alert("Ви програли, спробуйте ще");
                tryCount = 0;
            }
       
            },1400);

            
        
        } 


    });
   
    function getRandomFruit() 
    {       
            let fruitKeys = Object.keys(fruitsPath);
            let randomKey = fruitKeys[Math.floor(Math.random() * fruitKeys.length)];
            return fruitsPath[randomKey];
    }

   function checkWin(){
        let winCounter = 0;
        let tmp;
        for (let i = 0 ; i < imgs.length; i+=step) 
        {tmp = imgs[i].src;

            for(let j = i; j < i+step; j++)
            {
                if (imgs[j].src === tmp) {winCounter++;} 
                console.log(i + "   " + j + "   " + winCounter+"  "+tmp.split('/').pop());              
            }
            if (winCounter ==3) {winFlag = true; break;}
            winCounter = 0;
        }   
        


   }
    function generate(){
    let uniq = [];


    for (let i = 0; i < h; i++) 
    {
        let set = new Set();
        while(set.size<w)
        {
            set.add(getRandomFruit());
        }
        uniq.push(set);
    }

    let tmp = [];
        for(let i = 0; i<uniq.length; i++)
        {
            let setArray = Array.from(uniq[i]);
            tmp = tmp.concat(setArray);
        }

    for ( let k = 0; k < 3; k++) 
    {
        for (let i = k * step, j = k; i < k * step + step; i++, j+=step) 
        {
            imgs[i].src = tmp[j];
           
        }
    } 

    }

   
  

});

