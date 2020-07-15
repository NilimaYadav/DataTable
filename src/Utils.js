import React from "react";
import namor from "namor";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newItem = () => {
  const statusChance = Math.random();
  return {
    Item1: namor.generate({ words: 1, numbers: 0 }),
    Item2: namor.generate({ words: 1, numbers: 0 }),
    Invoice_number: Math.floor(statusChance * 30),
    Item3: namor.generate({ words: 1, numbers: 0 }),
    Reg_Id: Math.floor(statusChance * 100),
  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newItem(),
    };
  });
}

