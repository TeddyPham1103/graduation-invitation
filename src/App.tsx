import React, { useState } from 'react';
import { graduationConfig } from './config/graduationData';
import { SpaceDustCanvas } from './components/3d/SpaceDustCanvas';
import { OpeningScreen } from './components/OpeningScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JourneySection } from './components/JourneySection';
import { InvitationSection } from './components/InvitationSection';
import { CountdownSection } from './components/CountdownSection';
import { MemoriesSection } from './components/MemoriesSection';
import { ThankYouSection } from './components/ThankYouSection';
import { AudioPlayer } from './components/AudioPlayer';
import { RsvpModal } from './components/RsvpModal';
import { ShareModal } from './components/ShareModal';

export const App: React.FC = () => {
  const [inOpeningExperience, setInOpeningExperience] = useState(true);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleOpenInvitation = () => {
    const elem = document.querySelector('#invitation');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#03050d] text-champagne-100 overflow-x-hidden selection:bg-champagne-500/30 selection:text-champagne-200">
      {/* 3D Stardust Ambient Particles across the site */}
      <SpaceDustCanvas />

      {/* Screen 1: The 3D Opening Experience */}
      {inOpeningExperience ? (
        <OpeningScreen
          config={graduationConfig}
          onEnter={() => setInOpeningExperience(false)}
        />
      ) : (
        <>
          {/* Top Glass Navigation Bar */}
          <Navbar
            config={graduationConfig}
            onOpenRsvp={() => setIsRsvpOpen(true)}
            onOpenShare={() => setIsShareOpen(true)}
          />

          <main className="relative z-10">
            {/* Screen 2: Hero Section - The Graduate */}
            <HeroSection
              config={graduationConfig}
              onOpenInvitation={handleOpenInvitation}
            />

            {/* Screen 3: My Journey - 5 Milestone Phases */}
            <JourneySection journey={graduationConfig.journey} />

            {/* Screen 4: Graduation Invitation - 3D Card & Details */}
            <InvitationSection
              config={graduationConfig}
              onOpenRsvp={() => setIsRsvpOpen(true)}
            />

            {/* Screen 5: Realtime Countdown Clock */}
            <CountdownSection
              ceremony={graduationConfig.ceremony}
              graduateName={graduationConfig.profile.name}
            />

            {/* Screen 6: Memories - Art Gallery & Lightbox */}
            <MemoriesSection memories={graduationConfig.memories} />

            {/* Screen 7: Thank You - Emotional Conclusion */}
            <ThankYouSection
              config={graduationConfig}
              onOpenShare={() => setIsShareOpen(true)}
            />
          </main>

          {/* Background Ambient Audio Player (Opt-in) */}
          <AudioPlayer audioConfig={graduationConfig.audio} />

          {/* Interactive RSVP Modal */}
          <RsvpModal
            isOpen={isRsvpOpen}
            onClose={() => setIsRsvpOpen(false)}
            config={graduationConfig}
          />

          {/* Share Modal with Link Copy, QR Code & Social Buttons */}
          <ShareModal
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            profile={graduationConfig.profile}
          />
        </>
      )}
    </div>
  );
};

export default App;
