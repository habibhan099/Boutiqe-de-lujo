import Header from "./components/Header";
import Hero from "./components/Hero";
import ShopByCategory from "./components/ShopByCategory";
import NewCollection from "./components/NewCollection";
import WhyChooseUs from "./components/WhyChooseUs";
import SeasonalBanner from "./components/SeasonalBanner";
import TrendingNow from "./components/TrendingNow";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return <div className="page"><Header /><Hero /><ShopByCategory /><NewCollection /><WhyChooseUs /><SeasonalBanner /><TrendingNow /><Newsletter /><Footer /></div>;
}
