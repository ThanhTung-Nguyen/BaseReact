import styled from "styled-components"

export const WrapperHeader = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 0;
  box-shadow: 4px 4px 40px 0 rgb(0 0 0 / 5%);
  z-index: 9;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 256px;
  transition: left 0.2s;

  &.collapsed {
    left: 0;
    @media (max-width: 767px) {
      left: 0;
    }
  }

  @media (max-width: 767px) {
    left: 0;
  }
  .breadcrumb {
    padding-top: 12px;
  }
  .header-left {
    display: flex;
    float: left;
    padding-left: 12px;
  }
  .iconButton {
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
  .right-menu {
    float: right;
    height: 64px;
    display: flex;
    text-align: center;
    justify-content: end;
  }
`
