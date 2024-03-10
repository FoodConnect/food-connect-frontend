import { Overlay, Image, Card } from '@mantine/core';
import { theme } from '@/theme';

console.log(theme?.colors?.navy[9]);

const GradientHeaderImage = () => (
  <Card shadow="none" padding="lg" radius="md" withBorder>
    <Card.Section>
      <Image src="/market.png" height={400} alt="Produce market grayscale image" />
      <Overlay
        style={{ zIndex: 1, radius: '1rem' }}
        gradient={`linear-gradient(145deg, ${theme.colors.navy[9]} 0%, ${theme.colors.chartreuse[0]} 100%)`}
        opacity={0.85}
      />
      {/* <Overlay style={{ zIndex: 1, radius: '1rem' }} color={theme.colors.blue[6]} opacity={0.85} /> */}
    </Card.Section>
  </Card>
);
export default GradientHeaderImage;
