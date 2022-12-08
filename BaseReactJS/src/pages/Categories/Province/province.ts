import styled from "styled-components"

export const WrapperProvince = styled.div`
  padding: 12px;
  background-color: #fff;
`
export const WrapperTableProvince = styled.div`
  .editable-cell {
    position: relative;
  }

  .editable-cell-value-wrap {
    padding: 5px 12px;
    cursor: pointer;
  }

  .editable-row:hover .editable-cell-value-wrap {
    padding: 4px 11px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }

  [data-theme="dark"] .editable-row:hover .editable-cell-value-wrap {
    border: 1px solid #434343;
  }
`
