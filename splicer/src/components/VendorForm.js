import React from "react";
import styled from "styled-components";

export const VendorForm = () => {
  return (
    <div>
      {/* Full Width Advertising Area */}
      <AdvertisingAreaFun></AdvertisingAreaFun>

      {/* Middle Block where actual app reside */}
      <MiddleBlock style={{ flex: 6 }}>
        <NewAdvertiseArea></NewAdvertiseArea>
        <NewCategories></NewCategories>
        <Section></Section>
      </MiddleBlock>

      {/* Full Width Advertising Area */}
      <AdvertisingAreaFun></AdvertisingAreaFun>
    </div>
  );
};
