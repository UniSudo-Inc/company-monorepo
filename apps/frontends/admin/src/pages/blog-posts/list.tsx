import { DateField, DeleteButton, EditButton, List, MarkdownField, ShowButton, useTable } from '@refinedev/antd';
import { type BaseRecord, useMany } from '@refinedev/core';
import { Space, Table } from 'antd';
import { type BlogPost } from '../../types/blog-post';
import { type Category } from '@/types/category';

export function BlogPostList(): React.ReactElement {
  const { tableProps } = useTable<BlogPost>({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany<BlogPost>({
    resource: 'categories',
    ids: tableProps.dataSource?.map((item) => item.category.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: Boolean(tableProps.dataSource),
      queryKey: ['category', tableProps.dataSource?.map((item) => item.category.id).filter(Boolean) ?? []],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey='id'>
        <Table.Column dataIndex='id' title='ID' />
        <Table.Column dataIndex='title' title='Title' />
        <Table.Column
          dataIndex='content'
          title='Content'
          render={(value: string) => {
            if (!value) return <>-</>;
            return <MarkdownField value={`${value.slice(0, 80)}...`} />;
          }}
        />
        <Table.Column
          dataIndex='category'
          title='Category'
          render={(value: Category) =>
            categoryIsLoading ? <>Loading...</> : categoryData?.data.find((item) => item.id === value.id)?.title
          }
        />
        <Table.Column dataIndex='status' title='Status' />
        <Table.Column
          dataIndex={['createdAt']}
          title='Created at'
          render={(value: string) => <DateField value={value} />}
        />
        <Table.Column
          title='Actions'
          dataIndex='actions'
          render={(_, record: BaseRecord) => (
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
