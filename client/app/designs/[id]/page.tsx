import React from 'react';

export default function DesignPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Design ID: {params.id}</h1>
    </div>
  );
}
