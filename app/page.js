
import Image from "next/image";
import Hero from "./components/hero";
import Card from "./components/card";

export default function Home() {
  return (
    <div className='bg-[#F8D4C8]'>
      <Hero title="Hero Title" description="Hero Description" imageUrl="/path/to/image.jpg" />
      <Card />
    </div>
  );
}
