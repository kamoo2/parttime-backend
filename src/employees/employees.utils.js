export const getFormatDate = () => {
  const todayDate = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  const year = todayDate.slice(0, 4);
  const month = todayDate.slice(5, 7).replace(/(\s*)/g, "");
  const day = todayDate.slice(8, 10).replace(/(\s*)/g, "");
  return {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
  };
};
