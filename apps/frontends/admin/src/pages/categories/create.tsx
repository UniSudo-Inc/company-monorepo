import { Create, useForm } from '@refinedev/antd';
import { Form, Input } from 'antd';
import { type Category } from '@/types/category';

export function CategoryCreate(): React.ReactElement {
  const { formProps, saveButtonProps } = useForm<Category>({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <Form.Item
          label='Title'
          name={['title']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
}
