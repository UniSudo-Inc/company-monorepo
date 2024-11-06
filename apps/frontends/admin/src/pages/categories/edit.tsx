import { Edit, useForm } from '@refinedev/antd';
import { Form, Input } from 'antd';
import { type Category } from '@/types/category';

export function CategoryEdit(): React.ReactElement {
  const { formProps, saveButtonProps } = useForm<Category>({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
    </Edit>
  );
}
