import styled from "styled-components"

export const WrapperBanner = styled.div`
  padding: 12px;
  background-color: #fff;
`

export const FieldError = styled.div<{ error?: boolean }>`
  color: ${props => (props.error ? "red" : "initial")};
  font-style: ${props => (props.error ? "italic" : "initial")};
  display: ${props => (props.error ? "block" : "none")};
`

export const WrapperTableBanner = styled.div`
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
