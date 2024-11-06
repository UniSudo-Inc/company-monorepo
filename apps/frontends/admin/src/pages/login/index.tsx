import { AuthPage } from '@refinedev/antd';

export function Login(): React.ReactElement {
  return (
    <AuthPage
      type='login'
      formProps={{
        initialValues: { email: 'demo@refine.dev', password: 'demodemo' },
      }}
    />
  );
}
