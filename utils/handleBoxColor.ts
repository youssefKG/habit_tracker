const handleBoxStyle = (isCompleted: boolean, color: string) => {
  return {
    backgroundColor: color,
    borderRadius: 2,
    margin: 2,
    width: 9,
    height: 9,
    opacity: isCompleted ? 1 : 0.2,
  };
};

export { handleBoxStyle };
