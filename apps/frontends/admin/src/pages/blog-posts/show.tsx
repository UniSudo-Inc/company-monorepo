import { DateField, MarkdownField, Show, TextField } from '@refinedev/antd';
import { useOne, useShow } from '@refinedev/core';
import { Typography } from 'antd';
import React from 'react';
import { type BlogPost } from '@/types/blog-post';

const { Title } = Typography;

export function BlogPostShow(): React.ReactElement {
  const { query } = useShow<BlogPost>({});
  const { data, isLoading } = query;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne<BlogPost>({
    resource: 'categories',
    id: record?.category.id ?? '',
    queryOptions: {
      enabled: Boolean(record),
      queryKey: ['category', record?.category.id],
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>Category</Title>
      <TextField value={categoryIsLoading ? <>Loading...</> : categoryData?.data.title} />
      <Title level={5}>Status</Title>
      <TextField value={record?.status} />
      <Title level={5}>CreatedAt</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
}
