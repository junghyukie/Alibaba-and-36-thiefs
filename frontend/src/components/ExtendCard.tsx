import React from 'react';
import Header from './Header';

const ExtendCard: React.FC = () => {
  const handleSearch = () => {
    // Not used in this component, but required by Header
  };
  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Gia hạn thẻ</h1>
        <p className="text-muted-foreground mt-2">Trang gia hạn thẻ (chưa triển khai).</p>
      </div>
    </>
  );
};

export default ExtendCard;
