"use client";
import { useEffect, useRef, useState } from "react";

const LINKS = {
  google: "https://search.google.com/local/writereview?placeid=ChIJfyiFVL65yhQRdIX0YaZNeQI",
  instagram: "https://www.instagram.com/alemdarrestaurant/",
  tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g293974-d1216024-Reviews-Alemdar_Restaurant_Cafe-Istanbul.html"
};

const PRIZES = [
  { title: "You won a free dessert 🍰", img: "/images/wheel.png", note: "Show this screen to claim your dessert." },
  { title: "You won a Turkish coffee ☕", img: "/images/wheel.png", note: "Enjoy a complimentary Turkish coffee." },
  { title: "You won a Turkish tea 🍵", img: "/images/wheel.png", note: "Show this to your waiter to get your tea." },
  { title: "Not this time 😢", img: "/images/wheel.png", note: "Come again or try another platform!" }
];

export default function SpinGame() {
  const wheelRef = useRef(null);
  const [spinsLeft, setSpinsLeft] = useState(1);
  const [completed, setCompleted] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const toastRef = useRef(null);

  useEffect(() => {
    // preload audio
    new Audio('/sounds/spin.mp3');
    new Audio('/sounds/win.mp3');
    new Audio('/sounds/lose.mp3');
  }, []);

  function showToast(text) {
    if (!toastRef.current) return;
    const el = toastRef.current;
    el.textContent = text;
    el.classList.add('show');
    setTimeout(()=>el.classList.remove('show'), 3500);
  }

  function openPlatform(name) {
    window.open(LINKS[name], "_blank");
    if (!completed.includes(name)) {
      setCompleted((s)=>[...s, name]);
      setSpinsLeft((s)=>Math.min(3, s + 1));
    }
    showToast(`${Math.min(3, completed.length + 1)} spin${(completed.length+1)>1 ? 's' : ''} available`);
  }

  function startSpin() {
    if (spinning || spinsLeft <= 0) return;
    setSpinning(true);
    setSpinsLeft(s => s - 1);
    setResult(null);
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const seg = 360 / PRIZES.length;
    const finalDeg = (6 * 360) + (360 - (prizeIndex * seg + seg / 2));
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s cubic-bezier(.17,.67,.83,.67)';
      wheelRef.current.style.transform = `rotate(${finalDeg}deg)`;
    }
    const spinAudio = new Audio('/sounds/spin.mp3');
    spinAudio.play().catch(()=>{});
    setTimeout(()=>{
      setSpinning(false);
      setResult(PRIZES[prizeIndex]);
      if (PRIZES[prizeIndex].title.includes('won')) {
        new Audio('/sounds/win.mp3').play().catch(()=>{});
        showToast('Congratulations! 🎉');
      } else {
        new Audio('/sounds/lose.mp3').play().catch(()=>{});
        showToast('Try again!');
      }
    }, 4200);
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3">
          <button className="flex-1 bg-[#ea4335] text-white font-semibold py-3 rounded-md" onClick={()=>openPlatform('google')}> 
            <img src="/images/google_logo.png" alt="" className="inline w-6 h-6 mr-2 align-middle" /> Google Review 
          </button>
          <button className="flex-1 bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white font-semibold py-3 rounded-md" onClick={()=>openPlatform('instagram')}> 
            <img src="/images/instagram_logo.png" alt="" className="inline w-6 h-6 mr-2 align-middle" /> Instagram 
          </button>
          <button className="flex-1 bg-[#00a680] text-white font-semibold py-3 rounded-md" onClick={()=>openPlatform('tripadvisor')}> 
            <img src="/images/tripadvisor_logo.png" alt="" className="inline w-6 h-6 mr-2 align-middle" /> TripAdvisor 
          </button>
        </div>

        <div className="text-sm text-[#5b3822]">Each review or follow gives you one extra spin.</div>

        <div className="mt-4 flex flex-col items-center">
          <div className="w-72 h-72 relative flex items-center justify-center">
            <img ref={wheelRef} src="/images/wheel.png" alt="wheel" className="w-full h-full rounded-full" />
          </div>
          <button disabled={spinning || spinsLeft<=0} className="mt-3 bg-accent text-white font-bold px-6 py-3 rounded-lg disabled:opacity-50" onClick={startSpin}> 
            Spin Now ({spinsLeft})
          </button>

          {result && (
            <div className="mt-4 text-center">
              <img src={result.img} alt="" className="mx-auto w-28 rounded-lg" />
              <h3 className="mt-2 font-semibold text-lg">{result.title}</h3>
              <p className="text-sm text-gray-600">{result.note}</p>
            </div>
          )}
        </div>
      </div>

      <div ref={toastRef} className="toast" aria-hidden="true"></div>
    </div>
  );
}