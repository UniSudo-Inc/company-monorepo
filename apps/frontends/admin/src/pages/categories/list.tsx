import { DeleteButton, EditButton, List, ShowButton, useTable } from '@refinedev/antd';
import { Space, Table } from 'antd';
import { type Category } from '@/types/category';

export function CategoryList(): React.ReactElement {
  const { tableProps } = useTable<Category>({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey='id'>
        <Table.Column dataIndex='id' title='ID' />
        <Table.Column dataIndex='title' title='title' />
        <Table.Column
          title='Actions'
          dataIndex='actions'
          render={(_, record: Category) => (
            <Space>
              <EditButton hideText size='small' recordItemId={record.id} />
              <ShowButton hideText size='small' recordItemId={record.id} />
              <DeleteButton hideText size='small' recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
