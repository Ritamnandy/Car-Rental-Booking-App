import Banner from "../components/Banner";
import FeaturesSection from "../components/FeaturesSection";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Testimonial from "../components/Testimonial";


export default function Home ()
{
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <Banner />
      <Testimonial />
      <Newsletter/>
    </div>
  )
}
