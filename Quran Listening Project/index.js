const suracontainer = document.querySelector('.surah-container');
const recitorContainer = document.querySelector('.recitor-container');
const player = document.querySelector('.player')
const currentSurahMeta = document.querySelector('.current-surah-number');
const currentRecitorMeta = document.querySelector('.current-recitor-name')

let surahs = {}

const recitors = [
    {id: 1, name: 'Abdul Baset'},
    {id: 3, name: 'Abdurrahmaan As Sudais'},
    {id: 4, name: 'Abu Bakar Shatri'},
    {id: 5, name: 'Hani Ar Rifai'},
    {id: 6, name: 'Khalil Al Husari'},
    {id: 7, name: 'Mishary Al Afasy'},
]

const getsurah = async (recitorId = 1) =>{
  const data = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${recitorId}`)
  return data.json()
}

const findsurah = (id) => surahs.audio_files.find((s) => s.chapter_id.toString() === id.toString());

const rendersurah = (data) =>{
  suracontainer.innerHTML = '';
  data.audio_files.forEach(surah => {
  suracontainer.innerHTML += `<li><span>Chapter No: </span><button class="surah-btn" type="button" id=${surah.chapter_id}>${surah.chapter_id}</button></li>`
 });
}

const renderRecitor = () => {
    recitors.forEach(recitor => {
        recitorContainer.innerHTML += `<li><button class="recitor-btn" type="button" id=${recitor.id}>${recitor.name}</button></li>`
    })
}

const handleSurah = (id) => {
  const audio = findsurah(id)
  player.src = audio.audio_url
  player.load()
  player.play()
}

window.onload= async function(){
  const data = await getsurah()
  rendersurah(data)
  renderRecitor();
  surahs={...data}
}

suracontainer.addEventListener('click', (event) => {
  const id = event.target.id
  if(event.target.classList.contains('surah-btn')) {
    handleSurah(id)
    currentSurahMeta.innerHTML = id;
  }
})

recitorContainer.addEventListener('click', async (event) => {
    const id = event.target.id
    if(event.target.classList.contains('recitor-btn')) {
      const data = await getsurah(id);
      rendersurah(data);
      surahs={...data}
      currentRecitorMeta.innerHTML = event.target.innerHTML;
    }
  })