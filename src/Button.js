/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function Button(props) {
  const button = css`
    padding: 10px;
    border: solid 1px;
    border-radius: 10px;
    margin: auto;
    width: 200px;
    background-color: blanchedalmond;
    font-weight: 400;
  `;
  return (
    <button css={button} onClick={props.click}>
      {props.children}
    </button>
  );
}

export default Button;
