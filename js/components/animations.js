import { examplesScroll } from './animations/examplesScroll';
import { featuresScroll } from './animations/featuresScroll'
import { carousel } from './animations/carousel'
import { heroMarquee } from './animations/hero-marquee'
import { heroAnimations } from './animations/hero-animations';

export function animations() {
  featuresScroll()
  examplesScroll()
  carousel()
  heroMarquee()
  heroAnimations()
}
