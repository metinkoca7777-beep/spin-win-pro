import SpinGame from '../components/SpinGame';
import SocialStats from '../components/SocialStats';

export default async function Page() {
  return (
    <>
      <div className="flex flex-col items-center">
        <img src="/images/logo.png" alt="logo" className="w-28 mb-2 drop-shadow-md" />
        <h1 className="text-2xl font-bold text-[#a33b00]">Step 1: Choose your platform</h1>
        <p className="text-sm text-[#6b3a2a] mb-4">Leave a review or follow us to unlock your spin!</p>
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow my-4">
        <SpinGame />
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 shadow my-4">
        <h2 className="text-lg font-semibold mb-3">Social Stats</h2>
        <SocialStats />
      </div>
    </>
  );
}