import React from "react";
import namor from "namor";
import "./index.css";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    Item1: namor.generate({ words: 1, numbers: 0 }),
    Item2: namor.generate({ words: 1, numbers: 0 }),
    Invoice_number: Math.floor(Math.random() * 30),
    Item3: namor.generate({ words: 1, numbers: 0 }),
    Reg_Id: Math.floor(Math.random() * 100),
  };
};

export function makeData(len = 5553) {
  let count = 1;
  return range(len).map(d => {
    return {
      ...newPerson(),
    };
  });
}

