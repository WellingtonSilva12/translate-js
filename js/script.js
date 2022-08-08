const fromText = document.querySelector('.from-text')
const toText = document.querySelector('.to-text')
const selectTag = document.querySelectorAll('select')
const btnExchange = document.querySelector('.btn-exchange')
const btnTranslate = document.querySelector('.btn-translate')
const iconCopy = document.querySelector('.btn-icons')
const iconSound = document.querySelector('.icon-sound')
const alertText = document.querySelector('.alert')
const btnClose = document.querySelector('.close-btn')

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected
    if (id == 0 && country_code == 'en-GB') {
      selected = 'selected'
    } else if (id == 1 && country_code == 'pt-BR') {
      selected = 'selected'
    }
    let option = `<option value=${country_code} ${selected} >${countries[country_code]}</option>    `
    tag.insertAdjacentHTML('beforeend', option)
  }
})

btnExchange.addEventListener('click', exchangeButton)
btnTranslate.addEventListener('click', translateText)
document.addEventListener('keypress', e => {
  if (e.key == 'Enter') {
    translateText()
  }
})

async function translateText() {
  let text = fromText.value
  let translateFrom = selectTag[0].value
  let translateTo = selectTag[1].value

  let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      toText.value = data.responseData.translatedText
    })
}

function exchangeButton() {
  let tempText = fromText.value
  tempLang = selectTag[0].value
  fromText.value = toText.value
  selectTag[0].value = selectTag[1].value
  toText.value = tempText
  selectTag[1].value = tempLang
}

iconCopy.addEventListener('click', () => {
  navigator.clipboard.writeText(toText.value)
  alertText.classList.toggle('hide')
  alertText.classList.toggle('show')
  alertText.classList.toggle('showAlert')
  setTimeout(function () {
    alertText.classList.toggle('hide')
    alertText.classList.toggle('show')
    alertText.classList.toggle('showAlert')
  }, 1000)
})

btnClose.addEventListener('click', () => {
  alertText.classList.toggle('hide')
  alertText.classList.toggle('show')
})

iconSound.addEventListener('click', () => {
  let utterance

  utterance = new SpeechSynthesisUtterance(toText.value)
  utterance.lang = selectTag[1].value
  speechSynthesis.speak(utterance)
})
