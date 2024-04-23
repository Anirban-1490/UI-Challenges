interface IArraySwapProps {
  items: any[];
  from: number;
  to: number;
}

export function arraySwap({ items, from, to }: IArraySwapProps) {
  const tempArr = [...items];
  const tempFirstSkill = tempArr[from];
  tempArr[from] = tempArr[to];
  tempArr[to] = tempFirstSkill;
  return tempArr;
}
