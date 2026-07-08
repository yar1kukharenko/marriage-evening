import { PageContainer } from './components/layout/PageContainer'
import { HeroSection } from './components/sections/HeroSection'
import { VenueSection } from './components/sections/VenueSection'
import { ScheduleSection } from './components/sections/ScheduleSection'
import { TransferSection } from './components/sections/TransferSection'
import { DressCodeSection } from './components/sections/DressCodeSection'
import { WishesSection } from './components/sections/WishesSection'
import { RsvpSection } from './components/sections/RsvpSection'
// import { PhotoCollage } from './components/ui/PhotoCollage'
// import { PhotoDivider } from './components/ui/PhotoDivider'
// import { photos } from './data/content'

function App() {
  return (
    <PageContainer>
      <HeroSection />
      {/* <PhotoCollage photos={[...photos.collage]} /> */}
      <VenueSection />
      <ScheduleSection />
      {/* <PhotoDivider {...photos.divider} /> */}
      <TransferSection />
      <DressCodeSection />
      <WishesSection />
      <RsvpSection />
    </PageContainer>
  )
}

export default App
