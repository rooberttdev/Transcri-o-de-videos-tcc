import { startLoading, stopLoading, loadingMessage } from "./loading"
import { renderText } from "./render-text"
import { transcribeAudio } from "./transcribe"
import { getVideoId, loadVideo } from "./youtube.-api"
import axios from "axios"

const form = document.querySelector('#form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {
    loadingMessage('Iniciando aplicação')
    startLoading()

    const formData = new FormData(form)
    const url = formData.get('url')
    await loadVideo(url)

    loadingMessage('Baixando e convertendo o vídeo')
    await axios.get(`http://localhost:3333/audio?v=${getVideoId(url)}`)

    const data = await transcribeAudio()
    renderText(data)
  } catch (error) {
    console.log('[SUBMIT_ERRO]', error)
  } finally {
    stopLoading()
  }
})

document.getElementById("clear-icon").addEventListener("click", function() {
  document.getElementById("url").value = ""
})