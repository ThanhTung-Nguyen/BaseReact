import styled from "styled-components"

export const WrapperGeneral = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`
export const FieldError = styled.div<{ error?: boolean }>`
  color: ${props => (props.error ? "red" : "initial")};
  font-style: ${props => (props.error ? "italic" : "initial")};
  display: ${props => (props.error ? "block" : "none")};
`
