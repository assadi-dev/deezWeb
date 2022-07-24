import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin-top: 12px;
  height: 35px;
  border-radius: 13px 0 13px 0;
  border: 2px solid var(--color-text);
  padding: 8px 25px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (min-width: 738px) {
    width: 150px;
  }
  @media screen and (min-width: 990px) {
    height: 40px;
    padding: 8px 25px;
    width: 165px;
  }

  ul {
    position: absolute;
    text-align: center;
    width: 100%;
    left: 0;
    transform: translateY(50px);
    border: 1px solid var(--color-text);
    background: var(--color-text);
    z-index: 50;
    height: fit-content;
    font-size: 14px;
    opacity: 0;
  }
  li {
    color: var(--color-default);
    border-bottom: 1px solid var(--color-text);
    cursor: default;
    background: var(--gradient-bg);
    padding: 8px 0;
    :hover {
      background: var(--color-text);
      color: var(--color-bg);
      font-weight: 600;
    }
  }
  .open {
    animation: 0.15s ease-in open forwards;
    @keyframes open {
      0% {
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
        transform: translateY(65px);
      }
    }
  }
`;

export const SelectedValue = styled.p`
  white-space: nowrap;
  font-size: 12px;
  color: var(--color-text);
  margin: 0;
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`;

const SelectInput = ({ options, onSelectValue, ...props }) => {
  const [selectOption, setSelectedOption] = useState({ label: "", value: "" });
  const [isOpen, setIsOpen] = useState(false);

  const toogleSelect = () => {
    setIsOpen(!isOpen);
  };

  const optionSelected = (element) => () => {
    setSelectedOption({
      ...selectOption,
      label: element.label,
      value: element.value,
    });
    onSelectValue(element.value);
  };

  useEffect(() => {
    setSelectedOption({ label: options[0].label, value: options[0].value });
  }, []);

  return (
    <>
      <Container onClick={toogleSelect} {...props}>
        <SelectedValue> {selectOption.label} </SelectedValue>

        {isOpen ? (
          <ul className="open">
            {options.map((option) => (
              <li
                role="button"
                onClick={optionSelected({
                  label: option.label,
                  value: option.value,
                })}
                key={option.label}
              >
                {option.label}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </>
  );
};

export default SelectInput;
