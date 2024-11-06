import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Card from './Card.astro';

test('card with slots', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Card, {
    props: {
      title: 'This is a card',
      body: 'Card content',
      href: 'https://example.com',
    },
  });

  expect(result).toContain('This is a card');
  expect(result).toContain('Card content');
});
