export default class AudioService {
            constructor() {
              this.audioContext = null;
              this.unlocked = false;
            }

            init() {
              if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                document.addEventListener('click', this.unlockAudio.bind(this), { once: true });
              }
            }

            unlockAudio() {
              if (this.audioContext && !this.unlocked) {
                const buffer = this.audioContext.createBuffer(1, 1, 22050);
                const source = this.audioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(this.audioContext.destination);
                source.start(0);
                this.unlocked = true;
              }
            }

            playCompletionSound() {
              if (!this.unlocked) return;
              
              const osc = this.audioContext.createOscillator();
              const gain = this.audioContext.createGain();
              
              osc.type = 'sine';
              osc.frequency.value = 880;
              gain.gain.value = 0.1;
              
              osc.connect(gain);
              gain.connect(this.audioContext.destination);
              
              osc.start();
              osc.stop(this.audioContext.currentTime + 0.5);
            }
          }

          export const audioService = new AudioService();