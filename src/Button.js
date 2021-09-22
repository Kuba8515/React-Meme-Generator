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
  `;
  return (
    <button css={button} onClick={props.onClick}>
      {props.name}
    </button>
  );
}

export default Button;
