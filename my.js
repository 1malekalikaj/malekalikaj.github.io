document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('text-input');
  const voiceSelect = document.getElementById('voice-select');
  const speakButton = document.getElementById('speak-button');

  const synth = window.speechSynthesis;
  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, i) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} - ${voice.lang}`;
      option.value = i;
      voiceSelect.appendChild(option);
    });
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  speakButton.addEventListener('click', () => {
    const utterThis = new SpeechSynthesisUtterance(textInput.value);
    const selectedVoice = voices[voiceSelect.value];
    utterThis.voice = selectedVoice;
    synth.speak(utterThis);
  });
});