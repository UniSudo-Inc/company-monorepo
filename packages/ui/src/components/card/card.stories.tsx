import { Card } from './card';

export default {
  title: 'Components/Card',
  component: Card,
};

export function Default(): React.ReactElement {
  return (
    <Card title='Hello World' href='/'>
      Hello World
    </Card>
  );
}
