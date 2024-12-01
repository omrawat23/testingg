'use client'

import React from 'react';
import styles from './prosemirror.module.css';

interface BlogContentProps {
  htmlContent: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ htmlContent }) => {
  return (
    <div
      className={`prose max-w-none ${styles.ProseMirror}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default BlogContent;

