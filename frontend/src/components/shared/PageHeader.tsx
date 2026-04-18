import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

/**
 * Componente reutilizable para encabezados de página
 */
const PageHeader:React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600">
          {description}
        </p>
      )}
    </div>
  )
}

export default PageHeader
