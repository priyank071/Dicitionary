const form =document.querySelector('form');
const resultDiv=document.querySelector('.resultDiv')
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getMeaning(form.elements[0].value);
})
const getMeaning= async(word)=>{
    try {
        const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data= await response.json();
    resultDiv.innerHTML=`
    <div class="result">
    <h3><strong>Word</strong> : ${word}</h3>
    <p class="pos"> ${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning</strong> : ${data[0].meanings[0].definitions[0].definition}</p>
    <p><strong>Example</strong> : ${data[0].meanings[0].definitions[0].example===undefined? 'Not Found' : data[0].meanings[0].definitions[0].example}</p>
    <a id="wiki" href="${data[0].sourceUrls[0]}" target="_blank">Read More</a>
    </div>
    `;
    } catch (error) {
       resultDiv.innerHTML=`<p>Sorry we can't able to find the word</p>` 
    }
    
} 