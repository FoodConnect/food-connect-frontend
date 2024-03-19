import { Overlay, Image, Card } from '@mantine/core';
import { theme } from '@/theme';

// const gradientOptions = {
//   produce: `linear-gradient(145deg, ${theme!.colors!.navy![9]} 0%, ${theme!.colors!.chartreuse![2]} 100%)`,
//   canned: `linear-gradient(145deg, ${theme!.colors!.sage![9]} 0%, ${theme!.colors!.sky![0]} 100%)`,
//   dairy: `linear-gradient(145deg, ${theme!.colors!.teal![9]} 0%, ${theme!.colors!.shrek![0]} 100%)`,
//   dry: `linear-gradient(145deg, ${theme!.colors!.navy![9]} 0%, ${theme!.colors!.emerald![0]} 100%)`,
// };

// const GradientHeaderImage = () => (
//   <Card shadow="none" padding="lg" radius="md" withBorder>
//     <Card.Section>
//       <Image
//         src="/market.png"
//         h={{ base: 200, lg: 400, md: 400, sm: 400, xs: 200 }}
//         alt="Produce market grayscale image"
//       />
//       <Overlay
//         style={{ zIndex: 1, radius: '1rem' }}
//         gradient={gradientOptions.produce}
//         opacity={0.85}
//       />
//     </Card.Section>
//   </Card>
// );
// export default GradientHeaderImage;

interface GradientHeaderImageProps {
  category?: keyof typeof gradientOptions;
}

const gradientOptions = {
  produce: `linear-gradient(145deg, ${theme!.colors!.navy![9]} 0%, ${theme!.colors!.chartreuse![2]} 100%)`,
  canned: `linear-gradient(145deg, ${theme!.colors!.sage![9]} 0%, ${theme!.colors!.sky![0]} 100%)`,
  dairy: `linear-gradient(145deg, ${theme!.colors!.teal![9]} 0%, ${theme!.colors!.shrek![0]} 100%)`,
  dry: `linear-gradient(145deg, ${theme!.colors!.navy![9]} 0%, ${theme!.colors!.emerald![0]} 100%)`,
} as const;

const GradientHeaderImage = ({ category = 'produce' }: GradientHeaderImageProps) => (
  <Card shadow="none" padding="lg" radius="md" withBorder>
    <Card.Section>
      <Image src="/market.png" height={400} alt="Produce market grayscale image" />
      <Overlay
        style={{ zIndex: 1, radius: '1rem' }}
        gradient={gradientOptions[category]}
        opacity={0.85}
      />
    </Card.Section>
  </Card>
);
export default GradientHeaderImage;
