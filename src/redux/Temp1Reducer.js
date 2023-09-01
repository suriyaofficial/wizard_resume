export const Temp1Reducer = (state = [], action) => {
  switch (action.type) {
    case "Templete1data":
      return (state = action.payload);
    default:
      return state;
  }
};
