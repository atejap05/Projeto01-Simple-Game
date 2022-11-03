export const disableClickedCell = allCells => {
  allCells.forEach(cell => {
    if (!cell.disabled) cell.disabled = true;
  });
};

export const getCellPosition = cellElement => {
  const cellPosition = cellElement.classList[1]
    .slice(4, 7)
    .split("x")
    .map(idx => +idx);

  return cellPosition;
};
